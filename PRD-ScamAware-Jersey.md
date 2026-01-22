# Product Requirements Document
## ScamAware Jersey — Anti-Scam Awareness Portal

**Version:** 1.0  
**Date:** 22 January 2026  
**Author:** Product Team  
**Status:** Draft for Review

---

## Executive Summary

ScamAware Jersey is a public-facing web portal designed to educate Jersey residents about financial scams, help them identify potential scam communications, and provide guidance on protective actions. The portal will mirror the JFSC's visual identity to maintain institutional trust and credibility, while presenting complex fraud information in an accessible, infographic-driven format. A key feature is an embedded AI chatbot that helps users assess whether a communication they've received may be a scam—without making definitive judgments—and guides them toward appropriate next steps.

---

## Problem Statement

Jersey residents lost an estimated £5 million to fraud in 2025, with reports reaching a four-year high. Current resources are fragmented across multiple organisations (JFSC, Jersey Fraud Prevention Forum, States of Jersey Police, Citizens Advice), making it difficult for residents to quickly access clear, actionable guidance when they receive a suspicious communication. There is no interactive tool that helps residents analyse potential scams in real-time.

**Key Pain Points:**
- Information is scattered across multiple websites with varying quality and recency
- Existing resources are text-heavy and not optimised for quick consumption during a potential scam encounter
- No interactive assessment tool exists to help users think through whether a communication is suspicious
- Vulnerable populations (elderly, less tech-savvy) struggle with current resource formats

---

## Goals & Success Metrics

### Primary Goals
1. Reduce successful scam attempts in Jersey by improving public awareness
2. Provide a single, authoritative, easy-to-use resource for scam identification
3. Empower residents to critically evaluate suspicious communications
4. Increase reporting of attempted scams to States of Jersey Police

### Success Metrics
| Metric | Baseline | Target (12 months) |
|--------|----------|-------------------|
| Monthly unique visitors | N/A (new) | 10,000+ |
| Chatbot interactions/month | N/A | 2,000+ |
| Average session duration | N/A | 3+ minutes |
| User satisfaction rating | N/A | 4.2/5.0 |
| Referral clicks to Police reporting | N/A | 500+/month |
| Bounce rate | N/A | <40% |

---

## Target Audience

### Primary Users
- **General Jersey residents** (all ages) who receive suspicious communications
- **Elderly residents** (65+) who are statistically more targeted by scammers
- **Small business owners** who face invoice fraud, BEC attacks, and impersonation scams

### Secondary Users
- **Carers and family members** helping vulnerable individuals assess communications
- **Employers** seeking resources to educate staff
- **Community organisations** distributing awareness materials

### User Personas

**Persona 1: Margaret, 72, Retired Teacher**
- Received a text claiming to be from her bank
- Not confident with technology
- Wants simple, clear guidance without jargon
- Needs large text, clear visuals, minimal clicking

**Persona 2: Tom, 34, Small Business Owner**
- Received an invoice from what looks like a supplier
- Tech-savvy but time-poor
- Wants to quickly verify legitimacy signals
- Needs checklist-style information

**Persona 3: Sarah, 45, Daughter and Carer**
- Her father keeps receiving scam calls
- Wants educational materials she can share
- Needs downloadable/printable resources

---

## Product Scope

### In Scope (MVP)
1. **Informational Content Pages**
   - Common scam types (with Jersey-specific examples)
   - Warning signs and red flags
   - What to do if you've been scammed
   - How to report scams

2. **Visual/Infographic Presentation**
   - Icon-driven navigation
   - Expandable cards for scam types
   - Visual checklists
   - Minimal text, maximum clarity

3. **AI Scam Assessment Chatbot**
   - Conversational interface for describing suspicious communications
   - Analysis of red flags present in user's description
   - Guided questioning to surface key indicators
   - Non-definitive guidance (probabilistic framing)
   - Clear calls-to-action for verification and reporting

4. **JFSC-Styled Design System**
   - Colour palette, typography, and layout matching jerseyfsc.org
   - Responsive design for mobile-first usage
   - WCAG 2.1 AA accessibility compliance

5. **Resource Links**
   - Integration with Jersey Fraud Prevention Forum
   - Links to States of Jersey Police reporting
   - Links to JFSC warnings and public statements

### Out of Scope (Future Phases)
- User accounts/saved interactions
- Real-time scam database/lookup
- SMS/Email forwarding for automated analysis
- Multi-language support
- Native mobile application
- Integration with banking apps
- Scam reporting submission directly through portal

---

## Feature Specifications

### 1. Homepage

**Purpose:** Immediate clarity on site purpose, quick access to key functions

**Components:**
- Hero banner with clear value proposition: "Think you've received a scam? We can help you check."
- Prominent chatbot entry point (floating button + hero CTA)
- Quick-access cards for top scam types
- Latest scam alerts (pulled from JFSC public statements RSS)
- Emergency action banner: "Already given money or details? Act now →"
- Footer with partner logos (JFSC, Police, Fraud Prevention Forum)

**Interaction:**
- Single-click access to chatbot
- Cards expand on click/tap for brief overview before full page

---

### 2. Scam Types Library

**Purpose:** Educational resource on common scam categories

**Scam Categories to Include:**

| Category | Description | Jersey Context |
|----------|-------------|----------------|
| Impersonation (Bank/JFSC) | Callers/emailers pretending to be banks or JFSC | Recent JFSC impersonation warnings |
| Investment Fraud | Fake investment opportunities, crypto scams | "Jersey Tower Capital Bank" warning |
| Romance Scams | Fake online relationships leading to money requests | £400k lost in Jersey annually |
| Invoice/BEC Fraud | Fake invoices, compromised email accounts | Local business lost £130k |
| Delivery Scams | Fake Jersey Post/courier messages | Common SMS scam type |
| Tech Support Scams | Fake Microsoft/Apple calls | Targeting elderly |
| Prize/Lottery Scams | "You've won" messages | Classic scam format |
| Phishing | Fake websites mimicking real services | Credential harvesting |
| Authorised Push Payment | Tricked into sending money yourself | Bank transfer fraud |

**Page Format (per scam type):**
- **Header:** Scam name + danger level indicator
- **How it works:** 3-4 step visual process
- **Real example:** Anonymised Jersey case (where available)
- **Red flags:** Visual checklist (icons + brief text)
- **What to do:** Action steps if you encounter this
- **Related alerts:** Links to JFSC/Police warnings

---

### 3. Warning Signs Hub

**Purpose:** Universal red flags applicable across scam types

**Content Structure:**
- **Visual infographic grid** of top warning signs
- Each sign is clickable for expanded explanation
- "Scam Language Decoder" — common phrases used by scammers
- "Legitimate vs Scam" comparison examples

**Key Warning Signs to Feature:**
1. Urgency/pressure to act immediately
2. Requests for unusual payment methods (gift cards, crypto, wire transfers)
3. Unsolicited contact about money/accounts
4. Requests to keep the conversation secret
5. Too-good-to-be-true offers
6. Requests for remote access to devices
7. Poor grammar/spelling (though sophisticated scams may not have this)
8. Mismatched email domains/phone numbers
9. Requests for passwords, PINs, or full card details
10. Caller ID spoofing (number looks legitimate but isn't)

---

### 4. AI Scam Assessment Chatbot

**Core Philosophy:**
The chatbot NEVER definitively confirms or denies a scam. It helps users think critically by surfacing relevant red flags and providing probability-based guidance. It always recommends verification with the supposed sender through official channels.

**Technical Architecture:**

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│              (Chat widget embedded in portal)            │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway                            │
│            (Rate limiting, input sanitisation)           │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Self-Hosted LLM Backend                     │
│     (Fine-tuned or prompted model on local infra)        │
│                                                         │
│  System prompt includes:                                │
│  - Scam identification framework                        │
│  - Response tone guidelines                             │
│  - Escalation triggers                                  │
│  - Jersey-specific context                              │
└─────────────────────────────────────────────────────────┘
```

**Chatbot Conversation Flow:**

```
START
  │
  ▼
┌──────────────────────┐
│  Greeting & Context  │
│  "What type of       │
│  message did you     │
│  receive?"           │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Information         │
│  Gathering           │
│  - Channel (SMS,     │
│    email, call)      │
│  - Claimed sender    │
│  - What they asked   │
│  - Any urgency?      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Analysis            │
│  - Identify red      │
│    flags present     │
│  - Match to known    │
│    scam patterns     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Response            │
│  (See response       │
│  framework below)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Action Guidance     │
│  - Verify with       │
│    official source   │
│  - Report if needed  │
│  - Protect yourself  │
└──────────────────────┘
```

**Chatbot Response Framework:**

**High Concern (Multiple strong red flags detected):**
> "Based on what you've described, this communication shows several warning signs commonly associated with scams:
> - [Red flag 1]
> - [Red flag 2]
> - [Red flag 3]
>
> I'd strongly recommend NOT responding or clicking any links. Instead, contact [organisation] directly using a number from their official website (not from this message). If you've already shared any information or money, contact your bank immediately and report to States of Jersey Police on 01534 612612."

**Moderate Concern (Some red flags present):**
> "This message has some characteristics that could indicate a scam:
> - [Red flag 1]
> - [Red flag 2]
>
> However, it could also be legitimate. Before taking any action, I'd recommend verifying by contacting [organisation] directly through their official website or a number you trust. Don't use contact details from the message itself."

**Low Concern (Few/no red flags, appears standard):**
> "Based on your description, this doesn't show the typical warning signs of a scam. However, it's always good to be cautious. If you have any doubts, you can verify by contacting [organisation] directly. Remember, legitimate organisations won't mind you double-checking."

**Uncertainty/Insufficient Information:**
> "I'd need a bit more information to help assess this. Could you tell me:
> - [Specific question]
> - [Specific question]"

**Chatbot Safety Rails:**
- Never asks users to share actual passwords, card numbers, or sensitive data
- Detects if user is in immediate distress and provides crisis resources
- Recognises when user has already lost money and fast-tracks to reporting guidance
- Does not store conversation history beyond session
- Includes clear disclaimer about AI limitations

**Chatbot UI Features:**
- Floating button (bottom-right, JFSC brand colour)
- Expandable chat panel
- Quick-reply buttons for common responses
- "Share what you received" prompt with formatting guidance
- Copy-to-clipboard for guidance text
- "Was this helpful?" feedback at end
- Option to start new conversation
- Link to speak to human (Police, Citizens Advice)

---

### 5. "I've Been Scammed" Emergency Guide

**Purpose:** Immediate action steps for victims

**Structure (time-critical order):**

1. **STOP further contact** — Don't send more money or information
2. **CALL your bank** — If money sent, call immediately
3. **CHANGE passwords** — If credentials shared
4. **REPORT to Police** — 01534 612612 or visit HQ
5. **DOCUMENT everything** — Screenshot messages, note times/numbers
6. **CHECK for damage** — Review accounts, credit report
7. **GET support** — Victim Support, Citizens Advice

**Additional Elements:**
- "Time matters" urgency messaging
- Direct dial buttons (mobile click-to-call)
- Emotional support acknowledgment ("It's not your fault")
- Recovery resources

---

### 6. Resources & Downloads

**Purpose:** Shareable materials for offline use and community distribution

**Materials to Develop:**
- One-page scam warning signs poster (printable A4)
- Wallet card with emergency numbers
- "Before you click" checklist
- Family conversation guide ("Talking to elderly relatives about scams")
- Business invoice fraud checklist
- Infographic versions of top 5 scam types

**Formats:**
- PDF download
- High-res image for printing
- Shareable social media graphics

---

### 7. Latest Alerts Feed

**Purpose:** Current scam activity in Jersey

**Data Sources:**
- JFSC Public Statements and Warnings RSS
- Jersey Fraud Prevention Forum updates
- States of Jersey Police alerts

**Display:**
- Card-based timeline
- Category tags
- Date stamps
- "Read more" links to source
- Email subscribe option for alerts

---

## Design Specifications

### Visual Identity (JFSC Alignment)

**Colour Palette (extracted from jerseyfsc.org):**

| Use | Colour | Hex |
|-----|--------|-----|
| Primary | Dark Navy | #1a1f3d |
| Secondary | Trust Blue | #0066a1 |
| Accent | Alert Red | #c8102e |
| Success | Green | #28a745 |
| Warning | Amber | #ffc107 |
| Background | Light Grey | #f5f5f5 |
| Text | Dark Grey | #333333 |
| White | White | #ffffff |

**Typography:**
- Primary: Arial (matches JFSC)
- Headings: Bold, sentence case
- Body: 16px base, 1.5 line height

**Iconography:**
- Line-style icons (consistent weight)
- Duotone where emphasis needed
- Accessible labels on all icons

**Layout Principles:**
- Maximum content width: 1200px
- Generous whitespace
- Card-based content blocks
- Mobile-first responsive breakpoints: 320px, 768px, 1024px, 1440px

### Accessibility Requirements (WCAG 2.1 AA)

- Colour contrast ratio: 4.5:1 minimum
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Alt text on all images
- Captions on any video content
- Text resizable to 200% without loss
- No content relies solely on colour
- Form labels and error messages

---

## Technical Architecture

### Frontend

**Technology Stack:**
- Framework: Next.js (React) for SSR and performance
- Styling: Tailwind CSS (utility-first, matches JFSC simplicity)
- Chat UI: Custom component or Chatbase-style widget
- Icons: Lucide or Heroicons
- Animations: Framer Motion (subtle, accessible)

**Hosting:**
- Static site generation where possible
- CDN distribution for assets
- Jersey-based or UK hosting for data sovereignty

### Backend

**LLM Infrastructure:**
- Self-hosted model (Llama 3, Mistral, or similar)
- Alternatively: Claude API with strict system prompts
- API gateway with rate limiting (prevent abuse)
- No conversation persistence beyond session

**Content Management:**
- Headless CMS (Strapi, Sanity, or similar) for scam type library
- RSS integration for JFSC/Police alerts
- Admin interface for content updates

### Data & Privacy

**Principles:**
- Minimal data collection
- No user accounts required
- Chat conversations not stored permanently
- Analytics via privacy-respecting tool (Plausible, Fathom)
- Cookie consent for any tracking
- GDPR/Jersey DPA compliant

**Data Collected:**
- Anonymous usage analytics (page views, interactions)
- Chat feedback ratings (no conversation content)
- Newsletter signups (with explicit consent)

---

## Chatbot System Prompt Specification

```markdown
# System Prompt: ScamAware Jersey Assistant

You are the ScamAware Jersey assistant, helping Jersey residents evaluate 
whether communications they've received might be scams. You are embedded 
in an official resource portal supported by the Jersey Fraud Prevention Forum.

## Core Principles

1. NEVER definitively state something IS or IS NOT a scam
2. ALWAYS use probabilistic language ("this shows signs of...", "this could indicate...")
3. ALWAYS recommend verification through official channels
4. NEVER ask users to share actual passwords, full card numbers, or bank details
5. ALWAYS provide actionable next steps
6. Be warm, supportive, and non-judgmental
7. Recognise emotional distress and respond with empathy

## Response Structure

1. Acknowledge what the user shared
2. Identify specific red flags (or lack thereof)
3. Provide contextual assessment (high/moderate/low concern)
4. Give clear action steps
5. Offer additional resources if relevant

## Red Flags to Identify

- Urgency/pressure tactics
- Unusual payment methods requested
- Requests to keep conversation secret
- Unsolicited contact about accounts/money
- Too-good-to-be-true offers
- Requests for remote device access
- Mismatched sender details
- Requests for passwords/PINs
- Threats or intimidation
- Prize/lottery claims from competitions not entered

## Jersey-Specific Context

- JFSC email domain is @jerseyfsc.org
- JFSC phone is +44 (0)1534 822000
- States of Jersey Police fraud line: 01534 612612
- Local banks: HSBC, Lloyds, Barclays, Santander, NatWest, RBS
- Common local scams: JFSC impersonation, bank impersonation, Jersey Post delivery scams

## Escalation Triggers

If user indicates they have:
- Already sent money → Fast-track to bank contact + police reporting
- Shared passwords → Immediate password change guidance
- Given remote access → Device security steps
- Emotional distress → Supportive acknowledgment + support resources

## Tone

- Professional but approachable
- Clear and jargon-free
- Patient with repeated questions
- Non-condescending regardless of user's tech literacy
- Brief where possible, detailed when needed
```

---

## Implementation Phases

### Phase 1: MVP (8 weeks)

| Week | Deliverable |
|------|-------------|
| 1-2 | Design system, wireframes, content outline |
| 3-4 | Frontend build: homepage, scam library, warning signs |
| 5-6 | Chatbot integration and prompt engineering |
| 7 | "I've Been Scammed" guide, resources page |
| 8 | Testing, accessibility audit, soft launch |

### Phase 2: Enhancement (Weeks 9-12)

- Alert feed integration (JFSC RSS)
- Downloadable resources creation
- SEO optimisation
- Performance tuning
- User feedback integration

### Phase 3: Growth (Months 4-6)

- Community outreach toolkit
- Business-specific resources
- Video content (scam awareness shorts)
- Expanded chatbot capabilities
- Multi-channel promotion

---

## Stakeholder & Partner Coordination

### Primary Stakeholders
- Jersey Financial Services Commission (JFSC)
- Jersey Fraud Prevention Forum
- States of Jersey Police

### Coordination Required
- JFSC: Approval for visual identity alignment, content review
- Police: Ensure reporting guidance accuracy
- Forum: Alignment with existing materials, cross-promotion

### Partner Integration Opportunities
- Jersey Bankers Association: Scam alert distribution
- Age Concern Jersey: Elderly outreach
- Citizens Advice Jersey: Resource linking
- Digital Jersey: Tech support scam awareness
- JT/Sure/Airtel-Vodafone: SMS scam alerts

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Chatbot gives incorrect guidance | Medium | High | Robust testing, clear disclaimers, human escalation path |
| Users over-rely on chatbot | Medium | Medium | Clear messaging that chatbot is guidance only, not definitive |
| Low adoption/awareness | Medium | High | Strong launch campaign, partner promotion |
| JFSC objects to visual alignment | Low | High | Early engagement, clear differentiation in branding |
| LLM generates harmful content | Low | High | Strict system prompts, input/output filtering |
| Scammers use site to improve tactics | Low | Low | Focus on awareness, not detailed scam mechanics |

---

## Open Questions for Stakeholder Review

1. **Branding:** Should this be explicitly JFSC-branded, or a separate "ScamAware Jersey" brand that references JFSC?

2. **Hosting:** Who owns and hosts the infrastructure? JFSC, Government of Jersey, or independent?

3. **Chatbot model:** Self-hosted open-source LLM vs. commercial API (Claude/GPT)?

4. **Content approval:** What review process for scam library content and chatbot responses?

5. **Launch promotion:** Budget and channels for public awareness campaign?

6. **Maintenance:** Who handles ongoing content updates, chatbot monitoring, and technical support?

7. **Escalation:** Should chatbot have option to connect to live human (e.g., Citizens Advice chat)?

8. **Languages:** Is Jersey French or Portuguese support needed given demographics?

---

## Appendix A: Competitive/Reference Analysis

| Resource | Strengths | Gaps |
|----------|-----------|------|
| fraudprevention.je | Local, multi-partner | Text-heavy, no interactive tools |
| Take Five UK | Good infographics | Not Jersey-specific |
| Action Fraud UK | Comprehensive | Complex, overwhelming |
| Scamwatch Australia | Clean design, chatbot | Different jurisdiction |
| JFSC Fraud Prevention | Official authority | Minimal content, links elsewhere |

---

## Appendix B: Sample Chatbot Interactions

**Example 1: Bank Impersonation SMS**

> **User:** I got a text saying my Lloyds account has been compromised and I need to click a link to verify my identity. It looks official.

> **Bot:** Thanks for sharing that. Let me help you assess this message.
>
> **Warning signs I'm noticing:**
> - Unsolicited message about account security
> - Contains a link asking you to "verify" identity
> - Creates urgency around a security issue
>
> These are common characteristics of bank impersonation scams. Legitimate banks typically won't send links in SMS messages asking you to verify your identity.
>
> **What I'd recommend:**
> 1. Don't click the link
> 2. Open a new browser and go to lloyds.com directly (don't use the link)
> 3. Log in to check your account, or call the number on the back of your card
> 4. If you've already clicked, contact Lloyds immediately on their official number
>
> Would you like the number for reporting this to the Police, or do you have other questions about this message?

---

**Example 2: Legitimate-Looking Communication**

> **User:** I got an email from my energy supplier about a price change. It has their logo and looks normal. Just wanted to check.

> **Bot:** Good thinking to verify! Based on your description, this doesn't show typical scam warning signs. Price change notifications from energy suppliers are common and expected.
>
> **However, it's always worth checking:**
> - Does the sender email address match the company's domain?
> - Are there any links asking for payment or personal details?
> - Did you expect communication from them?
>
> If you're still unsure, you can log into your account directly through the supplier's website (not via email links) to see the same information.
>
> Is there anything specific about the email that concerned you?

---

**Example 3: User Already Sent Money**

> **User:** Someone called saying they were from Microsoft and my computer had a virus. I gave them remote access and paid £200 for "security software". Now I'm worried it was a scam.

> **Bot:** I'm really sorry this happened to you. What you've described is unfortunately a well-known tech support scam. This is not your fault—these scammers are very convincing.
>
> **You need to act quickly:**
>
> 1. **Contact your bank immediately** — Call the number on your card and explain what happened. They may be able to stop or reverse the payment.
>
> 2. **Secure your computer:**
>    - Disconnect from the internet
>    - Run a full antivirus scan
>    - Change passwords for important accounts (email, banking) from a different device
>
> 3. **Report to Police** — Call 01534 612612. Your report helps protect others.
>
> 4. **Monitor your accounts** — Watch for unusual activity over the coming weeks.
>
> Would you like me to provide more detail on any of these steps? You can also contact Citizens Advice Jersey for support.

---

## Appendix C: Content Inventory (MVP)

| Page | Content Elements | Word Count (est.) |
|------|-----------------|-------------------|
| Homepage | Hero, intro, quick links, alerts | 300 |
| About | Purpose, partners, disclaimer | 400 |
| Scam Types (×9) | Process, example, red flags, actions | 400 each |
| Warning Signs | Infographic grid, expandables | 600 |
| I've Been Scammed | Emergency steps, resources | 500 |
| Resources | Downloads, external links | 200 |
| Privacy Policy | Data handling, cookies | 600 |
| **Total** | | ~6,500 words |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 22 Jan 2026 | Product Team | Initial draft |

---

*This PRD is a living document and will be updated as requirements evolve through stakeholder feedback and user research.*
