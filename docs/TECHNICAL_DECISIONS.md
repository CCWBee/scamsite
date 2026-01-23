# ScamAware Jersey - Technical Decisions Reference

**Version:** 1.0
**Date:** 2026-01-23
**Status:** Consolidated from Sprint 0 ADRs and Spikes

---

## 1. Executive Summary

ScamAware Jersey is a privacy-focused scam awareness portal for Jersey residents, built on a self-hosted infrastructure to ensure complete data sovereignty. The platform utilises Next.js for the frontend with MDX-based content management, Qwen 2.5 7B running locally via Ollama for AI-powered scam assessment, Resend for GDPR-compliant email alerts with EU data residency, and Plausible Analytics for cookie-free usage tracking. This architecture prioritises Jersey data protection compliance, cost efficiency (estimated Year 1 total: GBP 2,100-3,200), and operational simplicity while providing a robust, multi-layered guardrail system to prevent chatbot misuse. The technical stack is designed for a community-scale deployment serving approximately 100,000 Jersey residents with moderate traffic patterns.

---

## 2. Architecture Overview

### 2.1 System Architecture Diagram

```
                                    SCAMAWARE JERSEY - SYSTEM ARCHITECTURE
                                    ======================================

    +-----------------+         +------------------+         +-------------------+
    |                 |         |                  |         |                   |
    |  Jersey         |  HTTPS  |    nginx         |         |   Next.js         |
    |  Residents      +-------->+    Reverse       +-------->+   Frontend        |
    |  (Browsers)     |         |    Proxy         |         |   (SSR/SSG)       |
    |                 |         |                  |         |                   |
    +-----------------+         +--------+---------+         +--------+----------+
                                         |                            |
                                         | Rate Limiting              | API Routes
                                         | SSL Termination            |
                                         | Load Balancing             v
                                         |                   +--------+----------+
                                         |                   |                   |
                                         |                   |   MDX Content     |
                                         |                   |   (Static Build)  |
                                         |                   |                   |
                                         |                   +-------------------+
                                         |
                                         v
                               +---------+----------+
                               |                    |
                               |   Guardrails       |
                               |   Layer (FastAPI)  |
                               |                    |
                               | +----------------+ |
                               | | Input          | |
                               | | Validation     | |
                               | +----------------+ |
                               | +----------------+ |
                               | | Topic Rails    | |
                               | | (NeMo)         | |
                               | +----------------+ |
                               | +----------------+ |
                               | | Output         | |
                               | | Validation     | |
                               | +----------------+ |
                               | +----------------+ |
                               | | Hard Filter    | |
                               | | (Regex)        | |
                               | +----------------+ |
                               +--------+----------+
                                        |
                                        v
                               +--------+----------+
                               |                   |
                               |   Ollama          |
                               |   (Qwen 2.5 7B)   |
                               |                   |
                               |   GPU: RTX 4060   |
                               |   VRAM: ~6GB      |
                               |                   |
                               +---------+---------+
                                         |
    +------------------------------------+------------------------------------+
    |                                    |                                    |
    v                                    v                                    v
+---+----------------+     +-------------+------------+     +-----------------+---+
|                    |     |                          |     |                     |
|   Resend           |     |   Plausible Analytics    |     |   JFSC RSS Feeds    |
|   (Email Alerts)   |     |   (Privacy-Focused)      |     |   (Alert Ingestion) |
|                    |     |                          |     |                     |
|   EU Region        |     |   EU Servers             |     |   Primary Source    |
|   (eu-west-1)      |     |   Cookie-Free            |     |                     |
|                    |     |                          |     |                     |
+--------------------+     +--------------------------+     +---------------------+


                              DEPLOYMENT ENVIRONMENT
                              ======================

                    +----------------------------------------+
                    |           Self-Hosted Server           |
                    |                                        |
                    |  +----------------------------------+  |
                    |  |        Docker Compose            |  |
                    |  |                                  |  |
                    |  |  +------------+  +------------+  |  |
                    |  |  | Next.js    |  | Guardrails |  |  |
                    |  |  | Container  |  | Container  |  |  |
                    |  |  +------------+  +------------+  |  |
                    |  |                                  |  |
                    |  |  +------------+  +------------+  |  |
                    |  |  | nginx      |  | Ollama     |  |  |
                    |  |  | Container  |  | (GPU)      |  |  |
                    |  |  +------------+  +------------+  |  |
                    |  |                                  |  |
                    |  +----------------------------------+  |
                    |                                        |
                    |  Hardware: RTX 4060/4070, 32GB RAM     |
                    |  OS: Ubuntu Server 22.04 LTS           |
                    |  Location: Jersey (Data Sovereignty)   |
                    |                                        |
                    +----------------------------------------+
```

### 2.2 Data Flow

1. **User Request:** Jersey resident accesses the portal via HTTPS
2. **nginx:** Handles SSL termination, rate limiting, and routing
3. **Next.js:** Serves static pages (MDX content) and handles API routes
4. **Chatbot Request:** User message sent to Guardrails Layer
5. **Input Validation:** Blocks jailbreaks, off-topic requests, encoding tricks
6. **Topic Rails:** NeMo Guardrails ensures scam-only focus
7. **Ollama:** Qwen 2.5 7B generates response
8. **Output Validation:** Softens definitive claims, adds verification advice
9. **Hard Filter:** Final regex-based safety check
10. **Response:** Validated response returned to user

---

## 3. Decision Summary Table

| Area | Decision | Rationale | ADR/Spike |
|------|----------|-----------|-----------|
| **Content Management** | MDX files in repository | Zero infrastructure overhead, git versioning, excellent performance | ADR-001 |
| **Email Service** | Resend (EU region) | GDPR-compliant, EU data residency, modern API, cost-effective | ADR-002 |
| **Hosting** | Self-hosted (RTX 4060/4070) | Jersey data sovereignty, lowest TCO, full control | ADR-003 |
| **Analytics** | Plausible Analytics (SaaS) | Cookie-free, GDPR-compliant, no consent banner needed | ADR-004 |
| **LLM Model** | Qwen 2.5 7B Instruct (Q4_K_M) | Fits 8GB VRAM, good response quality, local inference | Spike 0.1 |
| **Security** | Multi-layer guardrails | Persona injection, prompt injection, encoding tricks protection | Spike 0.2 |
| **Alert Sources** | JFSC RSS (primary) | Authoritative Jersey source, reliable RSS 2.0 format | Spike 0.5 |

---

## 4. Technology Stack

### 4.1 Complete Stack Reference

| Layer | Technology | Version/Spec | Purpose |
|-------|------------|--------------|---------|
| **Frontend** | Next.js | Latest (App Router) | SSR/SSG React framework |
| | Tailwind CSS | v3.x | Utility-first styling |
| | Lucide/Heroicons | Latest | Icon library |
| | Framer Motion | Latest | Animations |
| | @next/mdx | Latest | MDX processing |
| | gray-matter | Latest | Frontmatter parsing |
| **Backend** | FastAPI | Latest | Guardrails API service |
| | NeMo Guardrails | Latest | Topic rails enforcement |
| | Python | 3.11+ | Guardrails runtime |
| **AI/ML** | Ollama | Latest | LLM inference server |
| | Qwen 2.5 7B Instruct | Q4_K_M quantized | Scam assessment LLM |
| **Infrastructure** | Docker | Latest | Containerisation |
| | Docker Compose | Latest | Multi-container orchestration |
| | nginx | Latest | Reverse proxy, rate limiting |
| | Caddy (alternative) | Latest | Auto-HTTPS option |
| **External Services** | Resend | SaaS (EU region) | Transactional email |
| | Plausible Analytics | SaaS (EU servers) | Privacy-focused analytics |
| **Data Sources** | JFSC RSS | RSS 2.0 | Fraud alerts |
| | Report Fraud (UK) | RSS 2.0 | Supplementary alerts |
| | NCSC | RSS 2.0 | Cybersecurity alerts |
| **Operating System** | Ubuntu Server | 22.04 LTS | Recommended OS |
| **GPU Driver** | NVIDIA Driver | 535+ | GPU support |
| | CUDA | 12.x | GPU compute |

### 4.2 Containerised Services

```yaml
# Target docker-compose.yml structure
services:
  frontend:
    image: node:20-alpine
    # Next.js application

  guardrails:
    image: python:3.11-slim
    # FastAPI guardrails service

  ollama:
    image: ollama/ollama
    # GPU-enabled LLM inference
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  nginx:
    image: nginx:alpine
    # Reverse proxy with rate limiting
```

---

## 5. ADR Index

| ADR | Title | Status | Decision | Link |
|-----|-------|--------|----------|------|
| ADR-001 | Content Management Architecture | Proposed | MDX files in repository | [ADR-001](adr/ADR-001-content-management.md) |
| ADR-002 | Email Service Provider | Proposed | Resend (EU region) | [ADR-002](adr/ADR-002-email-service.md) |
| ADR-003 | Hosting Infrastructure | Proposed | Self-hosted (RTX 4060/4070) | [ADR-003](adr/ADR-003-hosting-infrastructure.md) |
| ADR-004 | Analytics Solution | Proposed | Plausible Analytics (SaaS) | [ADR-004](adr/ADR-004-analytics.md) |

### ADR Status Definitions

- **Proposed:** Under review, pending approval
- **Accepted:** Approved and in implementation
- **Deprecated:** Superseded by newer decision
- **Rejected:** Not approved for implementation

---

## 6. Spike Findings Summary

### 6.1 Spike 0.1: Ollama/Qwen 2.5 7B Evaluation

**Status:** In Progress

**Objective:** Evaluate Qwen 2.5 7B Instruct (Q4_K_M) suitability for scam assessment.

**Key Findings:**

| Aspect | Target | Status |
|--------|--------|--------|
| VRAM Usage | <8GB | Expected: ~5-6GB (Q4_K_M) |
| Time to First Token | <500ms | Pending testing |
| Total Response Time | <3s | Pending testing |
| Tokens per Second | >40 t/s | Pending testing |

**Test Coverage:**
- 20 scam assessment scenarios across 6 categories
- Bank/financial impersonation (4 prompts)
- Investment/cryptocurrency fraud (4 prompts)
- Romance/relationship scams (3 prompts)
- Authority impersonation (3 prompts)
- Purchase/delivery scams (3 prompts)
- Tech support and other scams (3 prompts)

**System Prompt Defined:** Yes - includes critical rules for non-definitive language, verification guidance, and topic restriction.

**Reference:** [Spike 0.1](spikes/0.1-ollama-qwen-evaluation.md)

---

### 6.2 Spike 0.2: Jailbreak Resistance Testing

**Status:** Complete

**Objective:** Document attack vectors and prioritise guardrail implementation.

**Risk Assessment:**

| Category | Risk Level | Priority |
|----------|------------|----------|
| Persona Injection | Critical | P0 |
| Prompt Injection | Critical | P0 |
| Jailbreak Chaining | High | P1 |
| Hypothetical Framing | High | P1 |
| Multi-turn Attacks | High | P1 |
| Urgency Manipulation | Medium | P2 |
| Authority Escalation | Medium | P2 |
| Encoding Tricks | Low | P3 |
| Language Switching | Low | P3 |

**Guardrail Priorities:**

**P0 - Critical (Before Launch):**
1. System prompt hardening with canary phrases
2. Token injection prevention (filter `<|im_start|>`, `[INST]`, etc.)
3. Identity anchoring throughout conversations

**P1 - High (Sprint 1):**
4. Hypothetical framing detection
5. Multi-turn monitoring with circuit breaker
6. Chained attack detection

**P2 - Medium (Sprint 2):**
7. Urgency de-escalation responses
8. Authority claim handling

**P3 - Low (Sprint 3):**
9. Encoding detection (base64, leetspeak)
10. Multilingual safety (French, Portuguese focus)

**Test Categories Documented:** 9 categories with 25+ specific test prompts

**Reference:** [Spike 0.2](spikes/0.2-jailbreak-resistance.md)

---

### 6.3 Spike 0.5: Jersey RSS Sources

**Status:** Complete

**Objective:** Identify reliable RSS feeds for scam alert ingestion.

**Primary Sources (Recommended):**

| Source | Feed URL | Priority |
|--------|----------|----------|
| JFSC Public Statements | `https://www.jerseyfsc.org/subscribe-to-our-rss/jfsc-public-statements-and-warnings/` | Critical |
| JFSC News | `https://www.jerseyfsc.org/subscribe-to-our-rss/jfsc-news/` | High |
| Report Fraud (UK) | `https://v4-api.neighbourhoodalert.co.uk/RSS?SiteId=149` | High |
| NCSC News | `https://www.ncsc.gov.uk/api/1/services/v1/news-rss-feed.xml` | Medium |

**Sources Without RSS (Require Scraping):**
- Jersey Fraud Prevention Forum (https://www.fraudprevention.je/)
- Jersey Trading Standards
- States of Jersey Police

**Recommendations:**
- Implement JFSC RSS feed integration immediately
- Add graceful degradation with cached data
- Consider web scraping for Forum (with permission)
- Rate limit scraping to max 1 request per hour

**Reference:** [Spike 0.5](spikes/0.5-jersey-rss-sources.md)

---

## 7. Infrastructure Requirements

### 7.1 Hardware Specification

#### Minimum Configuration

| Component | Specification | Notes |
|-----------|---------------|-------|
| CPU | Intel i5 / AMD Ryzen 5 (6+ cores) | For general processing |
| RAM | 16GB DDR4 minimum (32GB recommended) | Model + containers |
| GPU | NVIDIA RTX 4060 (8GB VRAM) | Qwen 2.5 7B Q4_K_M |
| Storage | 256GB NVMe SSD | OS + Docker + model (~50GB) |
| Network | Gigabit Ethernet | For public access |
| PSU | 550W+ 80+ Bronze | Adequate for GPU workload |

#### Recommended Configuration

| Component | Specification | Notes |
|-----------|---------------|-------|
| CPU | Intel i7 / AMD Ryzen 7 (8+ cores) | Better container handling |
| RAM | 32GB DDR4 | Headroom for growth |
| GPU | NVIDIA RTX 4070 (12GB VRAM) | Allows larger context/batching |
| Storage | 500GB NVMe SSD | Room for logs/backups |
| UPS | 80-120 rated | Graceful shutdown protection |

### 7.2 Software Requirements

| Component | Requirement |
|-----------|-------------|
| Operating System | Ubuntu Server 22.04 LTS (recommended) |
| Container Runtime | Docker with NVIDIA Container Toolkit |
| GPU Driver | NVIDIA Driver 535+ |
| CUDA | 12.x |
| Reverse Proxy | nginx or Caddy (auto-HTTPS) |
| SSL Certificate | Let's Encrypt (free, automated) |

### 7.3 Network Requirements

| Requirement | Specification |
|-------------|---------------|
| Static IP | Required (or Dynamic DNS) |
| Ports | 80 (HTTP), 443 (HTTPS) |
| Bandwidth | Business-grade recommended |
| Firewall | UFW/iptables configured |
| DNS | A record pointing to server IP |

### 7.4 Model Requirements (Qwen 2.5 7B)

| Configuration | VRAM | System RAM |
|---------------|------|------------|
| Q4_K_M (recommended) | ~5-6 GB | ~8 GB |
| Q5_K_M | ~6-7 GB | ~10 GB |
| Q8_0 | ~8-9 GB | ~12 GB |
| FP16 (full precision) | ~14 GB | ~16 GB |

---

## 8. Cost Summary

### 8.1 Consolidated Cost Estimate

#### Initial Investment (One-Time)

| Item | Estimated Cost |
|------|----------------|
| NVIDIA RTX 4060 8GB | GBP 280-320 |
| CPU (Ryzen 5 5600) | GBP 120-150 |
| Motherboard | GBP 80-120 |
| RAM 32GB DDR4 | GBP 70-90 |
| NVMe SSD 500GB | GBP 40-60 |
| PSU 650W | GBP 60-80 |
| Case | GBP 40-60 |
| UPS Battery Backup | GBP 80-120 |
| **Total Hardware** | **GBP 770-1,000** |

#### Monthly Operating Costs

| Item | Monthly Cost | Annual Cost |
|------|--------------|-------------|
| Electricity (150-200W avg) | GBP 25-40 | GBP 300-480 |
| Business Internet | GBP 50-80 | GBP 600-960 |
| Domain & DNS | GBP 2-5 | GBP 24-60 |
| Backup Storage (cloud) | GBP 5-10 | GBP 60-120 |
| Resend Email (Pro tier) | GBP 16 (~$20) | GBP 192 |
| Plausible Analytics | GBP 7 (~$9) | GBP 84 |
| **Total Monthly** | **GBP 105-158** | **GBP 1,260-1,896** |

#### Year 1 Total Cost of Ownership

| Component | Cost |
|-----------|------|
| Initial Hardware | GBP 770-1,000 |
| 12 Months Operation | GBP 1,260-1,896 |
| Contingency (10%) | GBP 200-290 |
| **Year 1 Total** | **GBP 2,230-3,186** |

### 8.2 Cost Comparison vs Cloud Alternatives

| Option | Year 1 Cost | Notes |
|--------|-------------|-------|
| **Self-hosted (Recommended)** | GBP 2,230-3,186 | Full data sovereignty |
| AWS (g4dn.xlarge 24/7) | GBP 4,440-5,400 | Plus data transfer |
| Vercel + RunPod | GBP 1,320-2,220 | Complex architecture |
| Vercel + Replicate | GBP 1,020-2,820 | Variable per-prediction cost |

### 8.3 Email Cost Projection (Resend)

| Phase | Duration | Monthly Cost | Cumulative |
|-------|----------|--------------|------------|
| Launch (Free tier) | 0-6 months | USD 0 | USD 0 |
| Growth (Pro tier) | 6-12 months | USD 20 | USD 120 |
| **Year 1 Total** | | | **USD 120** |

### 8.4 Analytics Cost (Plausible)

| Tier | Monthly Pageviews | Monthly Cost |
|------|-------------------|--------------|
| Starter (recommended) | 10,000 | USD 9 |
| Growth | 100,000 | USD 19 |
| Business | 1,000,000 | USD 69 |

---

## 9. Open Questions / Next Steps

### 9.1 Open Questions

| ID | Question | Owner | Status |
|----|----------|-------|--------|
| Q1 | Should we pursue Digital Jersey partnership for hosting? | Project Lead | Open |
| Q2 | What is the approval process for JFSC logo usage? | Legal/Comms | Open |
| Q3 | Can we obtain permission to scrape Jersey Fraud Prevention Forum? | Tech Lead | Open |
| Q4 | What backup/DR strategy is appropriate for MVP? | Tech Lead | Open |
| Q5 | Should we implement conversation logging for quality improvement? | Privacy Lead | Open |

### 9.2 Technical Debt / Future Considerations

| Item | Priority | Notes |
|------|----------|-------|
| Git-based CMS UI (TinaCMS/Forestry) | Low | If content editing UX needs improvement |
| Redundant hardware | Medium | If uptime SLA exceeds 99% |
| Cloud migration path | Low | Architecture designed for portability |
| A/B testing capability | Low | Not available in Plausible |
| Advanced analytics | Low | Consider Matomo if needed |

### 9.3 Sprint 0 Completion Checklist

| Task | Status | Notes |
|------|--------|-------|
| ADR-001: Content Management | Complete | MDX recommended |
| ADR-002: Email Service | Complete | Resend recommended |
| ADR-003: Hosting Infrastructure | Complete | Self-hosted recommended |
| ADR-004: Analytics | Complete | Plausible recommended |
| Spike 0.1: Qwen Evaluation | In Progress | Test execution pending |
| Spike 0.2: Jailbreak Resistance | Complete | Guardrail priorities defined |
| Spike 0.5: Jersey RSS Sources | Complete | JFSC feeds identified |
| Technical Decisions Document | Complete | This document |

### 9.4 Immediate Next Steps

1. **Complete Spike 0.1:** Execute Qwen 2.5 quality tests with actual hardware
2. **Procure Hardware:** Order components per specification
3. **Setup Development Environment:** Docker Compose with all services
4. **Implement P0 Guardrails:** Before any user testing
5. **Begin Frontend Development:** Next.js with MDX content structure
6. **Integrate JFSC RSS:** Primary alert data source

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-23 | Sprint 0 Team | Initial consolidation of ADRs and Spikes |

---

## 11. References

### Architecture Decision Records
- [ADR-001: Content Management](adr/ADR-001-content-management.md)
- [ADR-002: Email Service](adr/ADR-002-email-service.md)
- [ADR-003: Hosting Infrastructure](adr/ADR-003-hosting-infrastructure.md)
- [ADR-004: Analytics](adr/ADR-004-analytics.md)

### Spike Documents
- [Spike 0.1: Ollama/Qwen Evaluation](spikes/0.1-ollama-qwen-evaluation.md)
- [Spike 0.2: Jailbreak Resistance](spikes/0.2-jailbreak-resistance.md)
- [Spike 0.5: Jersey RSS Sources](spikes/0.5-jersey-rss-sources.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Ollama Documentation](https://ollama.ai/docs)
- [Resend Documentation](https://resend.com/docs)
- [Plausible Documentation](https://plausible.io/docs)
- [NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails)
- [JFSC Website](https://www.jerseyfsc.org/)
