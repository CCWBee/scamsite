#!/usr/bin/env python3
"""
Ollama/Qwen 2.5 7B Response Quality Test Script
ScamAware Jersey - Sprint 0, Task 0.1

This script evaluates the response quality and latency of Qwen 2.5 7B
running via Ollama for scam assessment use cases.

Usage:
    python test-ollama-quality.py              # Run all tests
    python test-ollama-quality.py --prompt 1   # Run single prompt by number
    python test-ollama-quality.py --verbose    # Detailed output
    python test-ollama-quality.py --output results.json  # Save results to file

Requirements:
    pip install requests psutil

Ensure Ollama is running: ollama serve
"""

import argparse
import json
import time
import sys
from datetime import datetime
from dataclasses import dataclass, asdict
from typing import Optional

try:
    import requests
except ImportError:
    print("Error: requests library required. Install with: pip install requests")
    sys.exit(1)

try:
    import psutil
except ImportError:
    psutil = None
    print("Warning: psutil not installed. Memory monitoring disabled.")
    print("Install with: pip install psutil")

# Configuration
OLLAMA_BASE_URL = "http://localhost:11434"
MODEL_NAME = "qwen2.5:7b-instruct-q4_K_M"

# Latency targets (in seconds)
TARGET_TTFT = 0.5  # Time to first token
TARGET_TOTAL = 3.0  # Total response time
ACCEPTABLE_TOTAL = 5.0  # Acceptable (but not ideal) response time

# System prompt for scam assessment
SYSTEM_PROMPT = """You are a scam assessment assistant for ScamAware Jersey, a public service helping Jersey residents identify potential scams. Your role is to help users evaluate suspicious communications they have received.

CRITICAL RULES:
1. NEVER definitively state something IS or IS NOT a scam. Use phrases like:
   - "This shows several warning signs of a scam"
   - "This has characteristics commonly associated with fraud"
   - "This appears suspicious because..."

2. ALWAYS recommend verification through official channels:
   - Bank: Contact using the number on your card or official statement
   - JFSC: +44 (0)1534 822000 or jerseyfsc.org
   - Police: 01534 612612 for non-emergency fraud concerns
   - Emergency: 999

3. NEVER ask for or encourage sharing:
   - Passwords or PINs
   - Full card numbers
   - Bank account details
   - Personal identification documents

4. Stay STRICTLY on topic. You only discuss scam identification and guidance. Politely decline any other requests.

5. If someone has already lost money or shared sensitive information, express empathy and urgently direct them to:
   - Their bank immediately
   - States of Jersey Police: 01534 612612
   - Action Fraud: 0300 123 2040

Be helpful, clear, and empathetic. Jersey residents trust this service for guidance."""

# Test prompts organized by category
TEST_PROMPTS = [
    # Category 1: Bank/Financial Institution Impersonation
    {
        "id": 1,
        "category": "Bank Impersonation",
        "name": "Classic Bank SMS Phishing",
        "prompt": """I got this text message: "LLOYDS BANK: We have detected suspicious activity on your account. Your card has been temporarily blocked. To unblock, verify your details immediately at: bit.ly/lloyds-secure-verify. Failure to verify within 24 hours will result in permanent account suspension."

Is this a scam?"""
    },
    {
        "id": 2,
        "category": "Bank Impersonation",
        "name": "Phone Call from Bank Security",
        "prompt": """Someone called me saying they were from Barclays fraud department. They said there had been suspicious transactions on my account and they needed to verify my identity. They asked for my date of birth and the first and last digits of my PIN. I gave them my date of birth but hung up when they asked for the PIN. Did I do the right thing? Was this a scam?"""
    },
    {
        "id": 3,
        "category": "Bank Impersonation",
        "name": "Email Account Update Request",
        "prompt": """I received an email that looks like it's from NatWest saying I need to update my online banking details or my account will be restricted. The email has their logo and looks professional. There's a button that says "Update Now". The sender email is security@natwest-online.com. Should I click it?"""
    },
    {
        "id": 4,
        "category": "Bank Impersonation",
        "name": "JFSC Impersonation Letter",
        "prompt": """Got a letter in the post with JFSC letterhead saying my investment account needs urgent verification due to new regulations. It asks me to call a number and provide my account details for compliance purposes. The letter has official looking stamps and a reference number. Is this legitimate?"""
    },

    # Category 2: Investment/Cryptocurrency Fraud
    {
        "id": 5,
        "category": "Investment Fraud",
        "name": "Social Media Investment Opportunity",
        "prompt": """Someone on Instagram messaged me about an investment opportunity. They say they can guarantee 300% returns in 30 days through cryptocurrency trading. They showed me screenshots of their profits and testimonials from other investors. They want me to start with just 500 pounds. What do you think?"""
    },
    {
        "id": 6,
        "category": "Investment Fraud",
        "name": "Clone Firm Investment",
        "prompt": """I found an investment company online offering fixed returns of 8% per year. They say they're FCA registered and gave me a registration number. They want me to transfer money to their account in Jersey. The website looks professional with a London address. How can I check if they're legitimate?"""
    },
    {
        "id": 7,
        "category": "Investment Fraud",
        "name": "Pension Liberation Scheme",
        "prompt": """A company called me about unlocking my pension early. They said I can access my pension pot before 55 without penalties through a legal loophole. They'd charge a 10% fee but I'd get the rest immediately. They're pressuring me to decide quickly as this offer ends soon. Is this real?"""
    },
    {
        "id": 8,
        "category": "Investment Fraud",
        "name": "Trading Platform Withdrawal Block",
        "prompt": """My friend told me about a trading platform called "ProfitMax" that he's been using. He says he's made thousands of pounds. I signed up and made a small deposit of 250 pounds. It showed I made 1200 pounds profit but when I tried to withdraw they said I need to pay a 15% tax fee first before I can get my money. Is this normal?"""
    },

    # Category 3: Romance/Relationship Scams
    {
        "id": 9,
        "category": "Romance Scam",
        "name": "Online Dating Financial Request",
        "prompt": """I've been talking to someone on a dating app for 3 months. We've never met in person but we video call sometimes. They say they're a engineer working on an oil rig. Now they're saying they need 2000 pounds urgently to get home because their company won't release their wages until the contract ends. They promise to pay me back. I really like them. What should I do?"""
    },
    {
        "id": 10,
        "category": "Romance Scam",
        "name": "Social Media Relationship - Medical Emergency",
        "prompt": """A woman added me on Facebook 2 months ago. She's been very friendly and sends me messages every day. She says she's from the US and wants to visit me in Jersey. Yesterday she said her mother is sick and needs surgery but her insurance won't cover it. She's asking if I can help with some of the medical bills. She sent me her passport and photos. Could this be a scam?"""
    },
    {
        "id": 11,
        "category": "Romance Scam",
        "name": "Cryptocurrency Romance Investment",
        "prompt": """I met someone on Tinder who seems really nice. After a few weeks of chatting they started talking about how they make money trading Bitcoin. They showed me their portfolio and offered to teach me. They want me to download an app and invest together. They say we can build our future together with the profits. Is this suspicious?"""
    },

    # Category 4: Authority Figure Impersonation
    {
        "id": 12,
        "category": "Authority Impersonation",
        "name": "Police Impersonation - Arrest Threat",
        "prompt": """I got a phone call from someone claiming to be from the States of Jersey Police. They said my national insurance number has been used fraudulently and there's a warrant for my arrest. They said I need to pay a fine of 500 pounds immediately using gift cards to avoid being arrested today. I'm really scared. Is this real?"""
    },
    {
        "id": 13,
        "category": "Authority Impersonation",
        "name": "HMRC Tax Scam Voicemail",
        "prompt": """I received an automated voicemail saying it's from HMRC and that I owe unpaid taxes. It said if I don't call back the number provided immediately, a warrant will be issued for my arrest. The message sounded very official with the HMRC name mentioned several times. Should I call them back?"""
    },
    {
        "id": 14,
        "category": "Authority Impersonation",
        "name": "Government Grant Scam",
        "prompt": """I got an email saying I'm eligible for a 3500 pound government grant because of COVID support programs. It says I need to provide my bank details so they can deposit the money. The email mentions official government programs and has what looks like an official reference number. It seems too good to be true but I could really use the money. Is this legitimate?"""
    },

    # Category 5: Purchase/Delivery Scams
    {
        "id": 15,
        "category": "Delivery Scam",
        "name": "Fake Royal Mail Fee",
        "prompt": """Got a text saying: "Royal Mail: Your package is being held at our depot due to unpaid shipping fees of 2.99 pounds. Pay now to receive your delivery: royalmail-delivery-fee.com". I am expecting a package so this might be real. Should I pay?"""
    },
    {
        "id": 16,
        "category": "Purchase Scam",
        "name": "Facebook Marketplace - Too Good to be True",
        "prompt": """I found a PS5 on Facebook Marketplace for 200 pounds. The seller says it's so cheap because they need money urgently for a family emergency. They want me to pay via bank transfer and say they'll post it to me. They won't do collection because they say they're self-isolating. Is this safe?"""
    },
    {
        "id": 17,
        "category": "Rental Scam",
        "name": "Advance Fee Rental Scam",
        "prompt": """I'm trying to rent a flat in Jersey and found a great listing online. The landlord says he's currently abroad for work but can send me the keys if I transfer the deposit and first month's rent. He sent photos of the property and a copy of his passport. The rent is below market rate which he says is because he wants a reliable tenant quickly. Should I proceed?"""
    },

    # Category 6: Tech Support and Other Scams
    {
        "id": 18,
        "category": "Tech Support Scam",
        "name": "Microsoft Virus Popup",
        "prompt": """A popup appeared on my computer saying "VIRUS DETECTED - Your computer is infected. Call Microsoft Support immediately at this number to prevent data loss." When I called, they asked me to download a program so they could remote access my computer to fix it. They want 299 pounds for the repair service. Is Microsoft actually contacting me?"""
    },
    {
        "id": 19,
        "category": "Lottery Scam",
        "name": "International Lottery Win",
        "prompt": """I received an email saying I've won 50,000 euros in an international lottery. I don't remember entering any lottery. They say I need to pay a processing fee of 150 pounds and provide my ID to claim the prize. The email has a lot of official looking logos and stamps. Could this be real?"""
    },
    {
        "id": 20,
        "category": "Job Scam",
        "name": "Money Mule Recruitment",
        "prompt": """I applied for jobs online and got an email offering me a position as a "payment processing agent" working from home. They say I'll receive payments into my bank account and forward them to their international partners, keeping 10% commission. It sounds easy but something feels off. Is this a legitimate job?"""
    }
]


@dataclass
class TestResult:
    """Stores results for a single test."""
    prompt_id: int
    category: str
    name: str
    prompt: str
    response: str
    time_to_first_token: float  # seconds
    total_time: float  # seconds
    tokens_generated: int
    tokens_per_second: float
    meets_latency_target: bool
    error: Optional[str] = None
    timestamp: str = ""

    def __post_init__(self):
        if not self.timestamp:
            self.timestamp = datetime.now().isoformat()


def check_ollama_running() -> bool:
    """Check if Ollama server is running."""
    try:
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False


def check_model_available() -> bool:
    """Check if the required model is available."""
    try:
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        if response.status_code == 200:
            models = response.json().get("models", [])
            model_names = [m.get("name", "") for m in models]
            # Check for exact match or partial match
            return any(MODEL_NAME in name or name in MODEL_NAME for name in model_names)
        return False
    except requests.exceptions.RequestException:
        return False


def get_memory_usage() -> dict:
    """Get current memory usage statistics."""
    if psutil is None:
        return {"available": False}

    memory = psutil.virtual_memory()
    gpu_memory = "Not available (requires nvidia-smi or pynvml)"

    return {
        "available": True,
        "system_ram_used_gb": round(memory.used / (1024**3), 2),
        "system_ram_total_gb": round(memory.total / (1024**3), 2),
        "system_ram_percent": memory.percent,
        "gpu_memory": gpu_memory
    }


def run_single_test(prompt_data: dict, verbose: bool = False) -> TestResult:
    """Run a single test prompt and measure response quality and latency."""
    prompt_id = prompt_data["id"]
    category = prompt_data["category"]
    name = prompt_data["name"]
    prompt = prompt_data["prompt"]

    if verbose:
        print(f"\n{'='*60}")
        print(f"Test {prompt_id}: {name}")
        print(f"Category: {category}")
        print(f"{'='*60}")
        print(f"Prompt:\n{prompt[:200]}..." if len(prompt) > 200 else f"Prompt:\n{prompt}")
        print("-" * 60)

    # Prepare the request
    request_data = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        "stream": True,
        "options": {
            "temperature": 0.3,
            "num_predict": 500  # Max tokens to generate
        }
    }

    # Track timing
    start_time = time.time()
    time_to_first_token = None
    response_text = ""
    tokens_generated = 0
    error = None

    try:
        # Make streaming request
        response = requests.post(
            f"{OLLAMA_BASE_URL}/api/chat",
            json=request_data,
            stream=True,
            timeout=60
        )

        if response.status_code != 200:
            error = f"HTTP {response.status_code}: {response.text}"
        else:
            for line in response.iter_lines():
                if line:
                    try:
                        chunk = json.loads(line)

                        # Record time to first token
                        if time_to_first_token is None and chunk.get("message", {}).get("content"):
                            time_to_first_token = time.time() - start_time

                        # Accumulate response
                        content = chunk.get("message", {}).get("content", "")
                        response_text += content

                        # Count tokens (approximate - Ollama doesn't always provide exact count)
                        if content:
                            tokens_generated += 1  # Simplified: count chunks

                        # Check if done
                        if chunk.get("done", False):
                            # Get actual token count if available
                            if "eval_count" in chunk:
                                tokens_generated = chunk["eval_count"]
                            break

                    except json.JSONDecodeError:
                        continue

    except requests.exceptions.Timeout:
        error = "Request timed out after 60 seconds"
    except requests.exceptions.RequestException as e:
        error = f"Request failed: {str(e)}"

    # Calculate final metrics
    total_time = time.time() - start_time

    if time_to_first_token is None:
        time_to_first_token = total_time

    tokens_per_second = tokens_generated / total_time if total_time > 0 else 0
    meets_target = total_time <= TARGET_TOTAL

    result = TestResult(
        prompt_id=prompt_id,
        category=category,
        name=name,
        prompt=prompt,
        response=response_text,
        time_to_first_token=round(time_to_first_token, 3),
        total_time=round(total_time, 3),
        tokens_generated=tokens_generated,
        tokens_per_second=round(tokens_per_second, 2),
        meets_latency_target=meets_target,
        error=error
    )

    if verbose:
        print(f"\nResponse:\n{response_text[:500]}..." if len(response_text) > 500 else f"\nResponse:\n{response_text}")
        print("-" * 60)
        print(f"TTFT: {result.time_to_first_token}s | Total: {result.total_time}s | "
              f"Tokens: {result.tokens_generated} | Rate: {result.tokens_per_second} t/s")
        print(f"Latency Target (<{TARGET_TOTAL}s): {'PASS' if meets_target else 'FAIL'}")
        if error:
            print(f"ERROR: {error}")

    return result


def run_all_tests(verbose: bool = False) -> list[TestResult]:
    """Run all test prompts."""
    results = []

    print(f"\nRunning {len(TEST_PROMPTS)} test prompts...")
    print(f"Model: {MODEL_NAME}")
    print(f"Latency Target: <{TARGET_TOTAL}s")
    print("-" * 60)

    for i, prompt_data in enumerate(TEST_PROMPTS):
        if not verbose:
            print(f"  [{i+1}/{len(TEST_PROMPTS)}] Testing: {prompt_data['name']}...", end=" ", flush=True)

        result = run_single_test(prompt_data, verbose)
        results.append(result)

        if not verbose:
            status = "PASS" if result.meets_latency_target and not result.error else "FAIL"
            print(f"{result.total_time}s [{status}]")

        # Small delay between tests to avoid overwhelming the server
        time.sleep(0.5)

    return results


def print_summary(results: list[TestResult]):
    """Print summary statistics."""
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)

    # Filter successful tests
    successful = [r for r in results if not r.error]
    failed = [r for r in results if r.error]

    if not successful:
        print("No successful tests to summarize.")
        return

    # Calculate statistics
    total_times = [r.total_time for r in successful]
    ttft_times = [r.time_to_first_token for r in successful]
    tokens_per_sec = [r.tokens_per_second for r in successful]

    avg_total = sum(total_times) / len(total_times)
    avg_ttft = sum(ttft_times) / len(ttft_times)
    avg_tps = sum(tokens_per_sec) / len(tokens_per_sec)

    sorted_times = sorted(total_times)
    p95_index = int(len(sorted_times) * 0.95)
    p95_total = sorted_times[min(p95_index, len(sorted_times) - 1)]

    passed = sum(1 for r in successful if r.meets_latency_target)

    print(f"\nTotal Tests: {len(results)}")
    print(f"Successful: {len(successful)}")
    print(f"Failed: {len(failed)}")
    print(f"\nLatency Results:")
    print(f"  Average TTFT: {avg_ttft:.3f}s (target: <{TARGET_TTFT}s)")
    print(f"  Average Total: {avg_total:.3f}s (target: <{TARGET_TOTAL}s)")
    print(f"  95th Percentile: {p95_total:.3f}s")
    print(f"  Min: {min(total_times):.3f}s")
    print(f"  Max: {max(total_times):.3f}s")
    print(f"\nThroughput:")
    print(f"  Average: {avg_tps:.2f} tokens/s")
    print(f"  Min: {min(tokens_per_sec):.2f} tokens/s")
    print(f"  Max: {max(tokens_per_sec):.2f} tokens/s")
    print(f"\nLatency Target (<{TARGET_TOTAL}s):")
    print(f"  Passed: {passed}/{len(successful)} ({100*passed/len(successful):.1f}%)")

    # Memory usage
    memory = get_memory_usage()
    if memory.get("available"):
        print(f"\nMemory Usage:")
        print(f"  System RAM: {memory['system_ram_used_gb']}GB / {memory['system_ram_total_gb']}GB ({memory['system_ram_percent']}%)")

    # Results by category
    print(f"\nResults by Category:")
    categories = {}
    for r in successful:
        if r.category not in categories:
            categories[r.category] = []
        categories[r.category].append(r)

    for cat, cat_results in categories.items():
        avg_time = sum(r.total_time for r in cat_results) / len(cat_results)
        passed_cat = sum(1 for r in cat_results if r.meets_latency_target)
        print(f"  {cat}: {avg_time:.2f}s avg, {passed_cat}/{len(cat_results)} passed")

    if failed:
        print(f"\nFailed Tests:")
        for r in failed:
            print(f"  - Test {r.prompt_id} ({r.name}): {r.error}")


def save_results(results: list[TestResult], filename: str):
    """Save results to JSON file."""
    output = {
        "test_date": datetime.now().isoformat(),
        "model": MODEL_NAME,
        "latency_target_seconds": TARGET_TOTAL,
        "total_tests": len(results),
        "successful_tests": len([r for r in results if not r.error]),
        "results": [asdict(r) for r in results]
    }

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nResults saved to: {filename}")


def main():
    parser = argparse.ArgumentParser(
        description="Test Ollama/Qwen 2.5 7B response quality for scam assessment"
    )
    parser.add_argument(
        "--prompt", "-p",
        type=int,
        help="Run a single prompt by number (1-20)"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Show detailed output including full responses"
    )
    parser.add_argument(
        "--output", "-o",
        type=str,
        help="Save results to JSON file"
    )
    parser.add_argument(
        "--list", "-l",
        action="store_true",
        help="List all available test prompts"
    )

    args = parser.parse_args()

    # List prompts if requested
    if args.list:
        print("\nAvailable Test Prompts:")
        print("-" * 60)
        for p in TEST_PROMPTS:
            print(f"  {p['id']:2d}. [{p['category']}] {p['name']}")
        return

    # Check prerequisites
    print("\nScamAware Jersey - Ollama/Qwen Quality Test")
    print("=" * 60)

    print("\nChecking prerequisites...")

    if not check_ollama_running():
        print("ERROR: Ollama server is not running.")
        print("Start Ollama with: ollama serve")
        sys.exit(1)
    print("  [OK] Ollama server is running")

    if not check_model_available():
        print(f"ERROR: Model '{MODEL_NAME}' not found.")
        print(f"Pull the model with: ollama pull {MODEL_NAME}")
        sys.exit(1)
    print(f"  [OK] Model '{MODEL_NAME}' is available")

    # Get initial memory
    memory = get_memory_usage()
    if memory.get("available"):
        print(f"  [OK] Memory monitoring enabled")
        print(f"       System RAM: {memory['system_ram_used_gb']}GB / {memory['system_ram_total_gb']}GB")

    # Run tests
    if args.prompt:
        if args.prompt < 1 or args.prompt > len(TEST_PROMPTS):
            print(f"ERROR: Prompt number must be between 1 and {len(TEST_PROMPTS)}")
            sys.exit(1)

        prompt_data = TEST_PROMPTS[args.prompt - 1]
        result = run_single_test(prompt_data, verbose=True)
        results = [result]
    else:
        results = run_all_tests(verbose=args.verbose)

    # Print summary
    print_summary(results)

    # Save results if requested
    if args.output:
        save_results(results, args.output)

    # Final status
    successful = [r for r in results if not r.error]
    passed = sum(1 for r in successful if r.meets_latency_target)

    print("\n" + "=" * 60)
    if len(successful) == len(results) and passed == len(successful):
        print("OVERALL: ALL TESTS PASSED")
    elif passed >= len(successful) * 0.8:
        print("OVERALL: MOST TESTS PASSED (acceptable)")
    else:
        print("OVERALL: TESTS FAILED - Review results")
    print("=" * 60)


if __name__ == "__main__":
    main()
