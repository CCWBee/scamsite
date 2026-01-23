# ADR-003: Hosting Infrastructure

## Status

**Proposed**

## Date

2026-01-23

## Context

ScamAware Jersey requires hosting infrastructure capable of running AI-powered scam analysis. The core requirement is GPU support for running Qwen 2.5 7B via Ollama, which powers the scam message classification and analysis features.

### Hardware Requirements for Qwen 2.5 7B Q4_K_M

| Resource | Requirement |
|----------|-------------|
| VRAM | ~6GB minimum |
| RAM | 16GB recommended |
| Storage | 50GB for model + containers |

The service will serve the Jersey community (approximately 100,000 residents), with expected usage patterns of moderate traffic with potential spikes during active scam campaigns.

## Options Considered

### Option A: Self-Hosted (On-Premises with RTX 4060/4070)

**Description:** Deploy all services on a local server with a consumer-grade GPU (NVIDIA RTX 4060 or 4070) running within Jersey.

**Pros:**
- Full control over data and infrastructure
- Complete Jersey data residency compliance
- No recurring cloud GPU costs
- Low latency for local users
- One-time hardware investment
- No vendor lock-in

**Cons:**
- Requires physical space and cooling
- Power consumption and electricity costs
- Manual maintenance and updates
- Limited redundancy without additional hardware
- Requires networking expertise for public exposure
- Hardware depreciation over time

**Estimated Monthly Cost:**
| Item | Cost |
|------|------|
| Electricity (~200W average) | £25-35 |
| Internet (business grade) | £50-100 |
| Hardware amortisation (3 years) | £30-50 |
| **Total** | **£105-185/month** |

**Initial Hardware Investment:** ~£800-1,200 (RTX 4060/4070 + server components)

---

### Option B: Digital Jersey Infrastructure

**Description:** Utilise Digital Jersey's local data centre or innovation hub infrastructure for hosting.

**Pros:**
- Local data residency guaranteed
- Potential government/public sector support
- Community alignment with Jersey's digital strategy
- Professional data centre environment

**Cons:**
- Unknown GPU availability
- May require negotiation and approval processes
- Potentially limited flexibility
- Unclear pricing structure
- Dependency on Digital Jersey's roadmap

**Estimated Monthly Cost:**
| Item | Cost |
|------|------|
| Hosting (estimated) | £100-300 |
| GPU access (if available) | Unknown |
| **Total** | **£100-300+/month** |

*Note: Requires direct engagement with Digital Jersey to confirm availability and pricing.*

---

### Option C: AWS (EC2 with GPU Instances)

**Description:** Deploy on Amazon Web Services using GPU-enabled EC2 instances (g4dn or g5 series).

**Pros:**
- Professional-grade infrastructure
- High availability and redundancy
- Easy scaling for demand spikes
- Managed services ecosystem
- Global CDN integration

**Cons:**
- Expensive GPU instances (g4dn.xlarge ~$0.526/hour)
- Data stored outside Jersey (EU regions available)
- Vendor lock-in concerns
- Complex cost management
- Requires AWS expertise

**Estimated Monthly Cost:**
| Item | Cost |
|------|------|
| g4dn.xlarge (24/7) | ~£320/month |
| EBS storage (100GB) | ~£10/month |
| Data transfer | ~£20/month |
| Load balancer | ~£20/month |
| **Total** | **£370-450/month** |

*Note: Reserved instances could reduce costs by ~30-40%.*

---

### Option D: Hybrid - Vercel (Frontend) + RunPod/Lambda Labs (GPU Inference)

**Description:** Host the Next.js frontend on Vercel's edge network while using specialised GPU cloud providers for inference workloads.

**Pros:**
- Excellent frontend performance and DX
- Pay-per-use GPU pricing
- Serverless scaling for frontend
- Specialised GPU infrastructure
- Cost-effective for variable workloads

**Cons:**
- Increased architectural complexity
- Cross-provider latency
- Multiple vendor relationships
- Data traverses multiple providers
- Requires API gateway management

**Estimated Monthly Cost:**
| Item | Cost |
|------|------|
| Vercel Pro | £16/month |
| RunPod (RTX 4090, ~100hrs) | £75-150/month |
| Supabase Pro | £20/month |
| **Total** | **£110-185/month** |

---

### Option E: Hybrid - Vercel (Frontend) + Replicate (Hosted Inference)

**Description:** Use Vercel for frontend with Replicate's managed model hosting for AI inference.

**Pros:**
- Fully managed AI infrastructure
- Simple API integration
- No GPU management required
- Automatic scaling
- Quick deployment

**Cons:**
- Per-prediction pricing can escalate
- Less control over model configuration
- Potential latency for cold starts
- Data processed by third party
- Model version management complexity

**Estimated Monthly Cost:**
| Item | Cost |
|------|------|
| Vercel Pro | £16/month |
| Replicate (estimated 10K predictions) | £50-200/month |
| Supabase Pro | £20/month |
| **Total** | **£85-235/month** |

*Note: Replicate costs scale linearly with usage; prices vary by model and compute time.*

---

## Decision Criteria

| Criterion | Weight | A: Self-Hosted | B: Digital Jersey | C: AWS | D: Vercel+RunPod | E: Vercel+Replicate |
|-----------|--------|----------------|-------------------|--------|------------------|---------------------|
| **GPU Availability & Cost** | High | Excellent | Unknown | Good | Good | Good |
| **Jersey Data Residency** | High | Excellent | Excellent | Moderate | Poor | Poor |
| **Scalability** | Medium | Limited | Unknown | Excellent | Good | Excellent |
| **Maintenance Burden** | Medium | High | Low-Medium | Low | Low | Very Low |
| **Latency** | Medium | Excellent | Excellent | Good | Moderate | Moderate |
| **Monthly Cost** | High | Low | Unknown | High | Moderate | Variable |
| **Initial Investment** | Medium | High | Low | Low | Low | Low |

### Scoring Summary

| Option | Score (1-5) | Notes |
|--------|-------------|-------|
| A: Self-Hosted | 4.2 | Best for MVP with budget constraints |
| B: Digital Jersey | 3.5 | Promising but requires investigation |
| C: AWS | 3.0 | Over-engineered for MVP scale |
| D: Vercel+RunPod | 3.5 | Good balance but complex |
| E: Vercel+Replicate | 3.3 | Simplest but least control |

## Decision

**Recommended: Option A - Self-Hosted (On-Premises with RTX 4060/4070) for MVP**

For the Minimum Viable Product phase, self-hosting provides the optimal balance of:

1. **Cost-effectiveness:** Lowest ongoing costs after initial hardware investment
2. **Full control:** Complete authority over data handling, model updates, and configuration
3. **Data residency:** Guaranteed Jersey-local data processing, critical for community trust
4. **Simplicity:** Single deployment target reduces complexity
5. **Learning opportunity:** Direct infrastructure experience valuable for future decisions

### Migration Path

The architecture should be designed to allow future migration to cloud providers if:
- Usage exceeds self-hosted capacity
- High availability becomes critical
- Maintenance burden becomes unsustainable

This is achieved by:
- Containerising all services with Docker
- Using standard APIs (REST/GraphQL) for service communication
- Avoiding vendor-specific integrations in core logic

## Consequences

### Positive

- Predictable, low monthly operating costs
- Complete data sovereignty within Jersey
- No external dependencies for core functionality
- Full flexibility for model updates and experimentation
- Direct hardware access for optimisation

### Negative

- Requires initial hardware investment (~£800-1,200)
- Single point of failure without redundancy
- Maintenance responsibility falls on team
- Limited scalability without hardware upgrades
- Requires reliable internet connectivity and static IP

### Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Hardware failure | Low | High | Regular backups, documented rebuild procedure |
| Power outage | Medium | Medium | UPS battery backup, graceful shutdown scripts |
| Network issues | Low | High | Business-grade ISP, monitoring alerts |
| Capacity exceeded | Low | Medium | Design for cloud migration path |

## Infrastructure Requirements

### Minimum Hardware Specification

```
CPU: Intel i5/AMD Ryzen 5 or better (6+ cores)
RAM: 16GB DDR4 minimum (32GB recommended)
GPU: NVIDIA RTX 4060 (8GB VRAM) or RTX 4070 (12GB VRAM)
Storage: 256GB NVMe SSD (OS + containers + model)
Network: Gigabit Ethernet
PSU: 550W+ 80+ Bronze certified
```

### Software Stack

```
OS: Ubuntu Server 22.04 LTS / Windows Server 2022
Container Runtime: Docker with NVIDIA Container Toolkit
GPU Drivers: NVIDIA Driver 535+ with CUDA 12.x
Reverse Proxy: Caddy or nginx with automatic HTTPS
Monitoring: Prometheus + Grafana (optional for MVP)
```

### Network Requirements

- Static IP address or Dynamic DNS service
- Port forwarding: 80 (HTTP), 443 (HTTPS)
- Firewall configuration for service access
- SSL/TLS certificate (Let's Encrypt recommended)

## Cost Estimate

### Initial Investment (One-Time)

| Item | Cost |
|------|------|
| NVIDIA RTX 4060 8GB | £280-320 |
| CPU (Ryzen 5 5600) | £120-150 |
| Motherboard | £80-120 |
| RAM 32GB DDR4 | £70-90 |
| NVMe SSD 500GB | £40-60 |
| PSU 650W | £60-80 |
| Case | £40-60 |
| UPS Battery Backup | £80-120 |
| **Total Hardware** | **£770-1,000** |

### Monthly Operating Costs

| Item | Cost |
|------|------|
| Electricity (est. 150-200W avg) | £25-40 |
| Business Internet | £50-80 |
| Domain & DNS | £2-5 |
| Backup storage (cloud) | £5-10 |
| **Total Monthly** | **£80-135** |

### Year 1 Total Cost of Ownership

| Period | Cost |
|--------|------|
| Initial hardware | £770-1,000 |
| 12 months operation | £960-1,620 |
| **Year 1 Total** | **£1,730-2,620** |

*Compared to AWS: £4,440-5,400/year (g4dn.xlarge)*

## Review

This decision should be reviewed:
- After 6 months of MVP operation
- If user traffic exceeds 1,000 daily active users
- If uptime requirements exceed 99% SLA
- When considering public launch beyond MVP

## References

- [Ollama Hardware Requirements](https://ollama.ai/docs)
- [Qwen 2.5 Model Specifications](https://huggingface.co/Qwen)
- [NVIDIA GPU Cloud Pricing](https://www.nvidia.com/en-gb/data-center/gpu-cloud-computing/)
- [AWS EC2 GPU Instances](https://aws.amazon.com/ec2/instance-types/g4/)
- [RunPod Pricing](https://www.runpod.io/pricing)
- [Replicate Pricing](https://replicate.com/pricing)
