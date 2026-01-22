# ScamAware Jersey

Anti-scam awareness portal for Jersey residents featuring educational content and an AI chatbot for scam assessment.

## Project Overview

ScamAware Jersey helps residents identify potential scams through:
- Informational pages on common scam types
- Visual infographics and warning sign guides
- AI chatbot that assesses suspicious communications
- Emergency guidance for scam victims
- JFSC-styled design for institutional trust

## Tech Stack

### Frontend
- **Framework:** Next.js (React) with SSR
- **Styling:** Tailwind CSS
- **Icons:** Lucide or Heroicons
- **Animations:** Framer Motion

### Backend/AI
- **LLM:** Qwen 2.5 7B Instruct (Q4_K_M quantized) via Ollama
- **Guardrails:** Custom Python input/output validation + NeMo Guardrails
- **API Gateway:** nginx with rate limiting

### Infrastructure
- Docker Compose for containerization
- Self-hosted GPU inference (RTX 4060/4070 recommended)

## Architecture

```
Frontend (Next.js) → nginx (rate limit) → Guardrails Layer → Ollama (Qwen 2.5)
```

Key layers:
1. **Input Validation:** Blocks jailbreaks, off-topic requests, encoding tricks
2. **Topic Rails:** Ensures scam-only focus via NeMo Guardrails
3. **Output Validation:** Softens definitive claims, ensures verification advice
4. **Hard Filter:** Final regex-based block on harmful content

## Design System

| Element | Value |
|---------|-------|
| Primary | #1a1f3d (Dark Navy) |
| Secondary | #0066a1 (Trust Blue) |
| Accent | #c8102e (Alert Red) |
| Font | Arial |
| Max Width | 1200px |

WCAG 2.1 AA accessibility required.

## Chatbot Principles

The chatbot MUST:
- Never definitively confirm/deny a scam (use "shows warning signs...")
- Always recommend verification through official channels
- Never ask for passwords, PINs, or full card numbers
- Stay strictly on-topic (scam assessment only)
- Resist all jailbreak attempts (persona injection, hypotheticals, urgency manipulation)

## Key Jersey Information

- JFSC domain: @jerseyfsc.org
- JFSC phone: +44 (0)1534 822000
- Police fraud line: 01534 612612
- Emergency: 999

## Project Structure (Target)

```
scamsite/
├── frontend/           # Next.js application
│   ├── app/           # App router pages
│   ├── components/    # React components
│   └── styles/        # Tailwind config
├── guardrails/        # Python guardrails service
│   ├── input_validation.py
│   ├── output_validation.py
│   └── hard_output_filter.py
├── nginx/             # Reverse proxy config
├── docker-compose.yml
└── docs/              # Specification documents
```

## Development Guidelines

1. Mobile-first responsive design (breakpoints: 320px, 768px, 1024px, 1440px)
2. All content must be accessible (alt text, keyboard nav, screen reader support)
3. Minimize data collection - no conversation persistence beyond session
4. Test all chatbot changes against jailbreak test matrix
5. Never store PII or sensitive user data

## Quick Start

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull model
ollama pull qwen2.5:7b-instruct-q4_K_M

# Start services
docker-compose up -d
```

## Reference Documents

- `PRD-ScamAware-Jersey.md` - Product requirements and features
- `Technical-Spec-ScamAware-Chatbot.md` - Technical implementation details
