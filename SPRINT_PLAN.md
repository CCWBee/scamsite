# ScamAware Jersey - Sprint & Task Breakdown

## Overview

This document defines the complete sprint structure for building ScamAware Jersey, an anti-scam awareness portal with an AI chatbot for Jersey residents.

**Principles:**
- Every task is atomic and results in a single commit
- Every task has explicit test/validation criteria
- Every sprint produces a demoable piece of software
- Sprints build incrementally on previous work

---

## Sprint 0: Technical Spikes & Architecture Decisions

**Goal:** Validate technical assumptions, make key architectural decisions, reduce risk.

**Demo:** Technical decision document with proof-of-concept validations.

### Tasks

#### 0.1 Spike: Evaluate Ollama/Qwen response quality
- Test Qwen 2.5 7B with 20 sample scam assessment prompts
- Measure response latency (target: <3s)
- Evaluate memory requirements
- Document model behavior and limitations
- **Validation:** Decision document with latency benchmarks and quality assessment

#### 0.2 Spike: Test jailbreak resistance of base model
- Run top 20 known jailbreak prompts against vanilla Qwen
- Document which attacks succeed/fail without guardrails
- Identify guardrail priorities
- **Validation:** Jailbreak test results documented with risk assessment

#### 0.3 Decision: Content management architecture
- Evaluate options: hardcoded, MDX files, headless CMS (Strapi/Sanity)
- Consider maintainability by non-technical staff
- Document decision with rationale
- **Validation:** ADR (Architecture Decision Record) created

#### 0.4 Decision: Email service provider
- Evaluate: SendGrid, Mailchimp, Resend, self-hosted
- Consider Jersey data residency requirements
- Document decision with rationale
- **Validation:** ADR created, account provisioned if applicable

#### 0.5 Spike: Identify Jersey alert RSS sources
- Research JFSC, Police, Fraud Prevention Forum feeds
- Test feed reliability and format
- Document available data sources
- **Validation:** List of validated RSS/API sources with sample data

#### 0.6 Decision: Hosting infrastructure
- Evaluate: self-hosted, Digital Jersey, AWS, Vercel + RunPod
- Consider GPU requirements for Ollama
- Document decision with cost estimate
- **Validation:** ADR created, staging environment identified

#### 0.7 Decision: Analytics solution
- Evaluate privacy-respecting options: Plausible, Matomo, Fathom
- Consider Jersey/GDPR compliance
- Document decision
- **Validation:** ADR created

#### 0.8 Create technical decision document
- Compile all ADRs into single reference document
- Include architecture diagram
- Get stakeholder sign-off
- **Validation:** Document reviewed and approved

---

## Sprint 1: Project Foundation & Infrastructure

**Goal:** Bootable development environment with containerized services.

**Demo:** Run `docker-compose up` → Next.js at localhost:3000, guardrails API at localhost:8080/health, Ollama responding at localhost:11434.

### Tasks

#### 1.1 Initialize monorepo structure
- Create directories: `frontend/`, `guardrails/`, `nginx/`, `scripts/`, `docs/`
- Initialize git with `.gitignore` (Node, Python, Docker, .env)
- Create root `package.json` with workspace scripts
- **Validation:** `git status` clean, all directories exist, `.gitignore` covers secrets

#### 1.2 Create environment configuration templates
- Create `.env.example` for root (shared vars)
- Create `frontend/.env.example` with API URLs
- Create `guardrails/.env.example` with Ollama host, model name
- Document all variables in README
- **Validation:** All `.env.example` files present with comments

#### 1.3 Scaffold Next.js application
- Run `npx create-next-app@latest frontend` (App Router, TypeScript, Tailwind, ESLint)
- Configure `next.config.js` for standalone output
- **Validation:** `cd frontend && npm run build` succeeds

#### 1.4 Add Next.js health endpoint
- Create `app/api/health/route.ts`
- Return JSON: `{ status: "ok", timestamp: Date.now() }`
- **Validation:** `curl localhost:3000/api/health` returns 200 with JSON

#### 1.5 Configure Git hooks for frontend
- Install husky and lint-staged
- Pre-commit: ESLint, Prettier, TypeScript check
- **Validation:** Commit with lint error is blocked

#### 1.6 Create frontend Dockerfile
- Multi-stage build: deps → builder → runner
- Node 20 Alpine base, non-root user
- Standalone output for minimal image
- **Validation:** `docker build -t scamaware-frontend ./frontend` succeeds, image < 500MB

#### 1.7 Scaffold Python guardrails service
- Create `guardrails/` with `pyproject.toml` or `requirements.txt`
- Dependencies: fastapi, uvicorn, pydantic, httpx
- Create basic `main.py` with FastAPI app
- **Validation:** `pip install -r requirements.txt` succeeds

#### 1.8 Add guardrails health endpoint
- Create `/health` endpoint returning `{"status": "ok"}`
- **Validation:** `uvicorn main:app && curl localhost:8000/health` returns 200

#### 1.9 Configure pre-commit hooks for Python
- Install pre-commit with black, ruff, mypy
- Create `.pre-commit-config.yaml`
- **Validation:** `pre-commit run --all-files` passes

#### 1.10 Create guardrails Dockerfile
- Python 3.11 slim base
- Non-root user, minimal layers
- Uvicorn entrypoint
- **Validation:** `docker build -t scamaware-guardrails ./guardrails` succeeds

#### 1.11 Configure structured logging for guardrails
- Set up Python logging with JSON format
- Include: timestamp, level, request_id, message
- Never log PII or conversation content
- **Validation:** Logs output valid JSON, no sensitive data in test logs

#### 1.12 Create development docker-compose.yml
- Services: frontend, guardrails, ollama
- Network configuration for inter-service communication
- Volume mounts for hot-reload in development
- Environment variables from .env
- **Validation:** `docker-compose config` validates, no errors

#### 1.13 Add Ollama service configuration
- Use official `ollama/ollama` image
- GPU passthrough configuration (nvidia)
- Persistent volume for models
- **Validation:** Ollama container starts, GPU detected (if available)

#### 1.14 Create Ollama model initialization script
- `scripts/init-ollama.sh`
- Wait for Ollama readiness
- Pull `qwen2.5:7b-instruct-q4_K_M`
- Display progress indicator
- **Validation:** Script runs idempotently, model in `ollama list`

#### 1.15 Create nginx development configuration
- Basic reverse proxy config
- Route `/` to frontend:3000
- Route `/api/chat` to guardrails:8000
- **Validation:** `nginx -t` passes

#### 1.16 Add nginx service to docker-compose
- Mount nginx.conf
- Expose ports 80
- Depends on frontend and guardrails
- **Validation:** Full stack starts with `docker-compose up`

#### 1.17 Create development convenience scripts
- `scripts/dev.sh` - start all services with logs
- `scripts/build.sh` - build all Docker images
- `scripts/clean.sh` - remove containers and volumes
- **Validation:** Each script executes without error

#### 1.18 Create CI workflow
- `.github/workflows/ci.yml`
- Jobs: lint (frontend + backend), typecheck, test, docker-build
- Run on push to main and PRs
- **Validation:** Workflow passes on push

#### 1.19 Create README with setup instructions
- Prerequisites (Docker, Node, Python)
- Quick start guide
- Environment variable documentation
- Troubleshooting section
- **Validation:** New developer can start project following README

---

## Sprint 2: Design System & Core Components

**Goal:** Reusable component library with JFSC styling, documented in Storybook.

**Demo:** Browse Storybook showing all components with variants, responsive at all breakpoints, passing a11y checks.

### Tasks

#### 2.1 Set up Storybook
- Install Storybook for Next.js
- Configure for Tailwind CSS
- Add a11y addon (`@storybook/addon-a11y`)
- Add viewport addon for responsive testing
- **Validation:** `npm run storybook` launches at localhost:6006

#### 2.2 Configure Tailwind with JFSC design tokens
- Extend colors: navy (#1a1f3d), trust-blue (#0066a1), alert-red (#c8102e), success (#28a745), warning (#ffc107)
- Configure font family: Arial stack
- Define spacing scale
- **Validation:** Tailwind IntelliSense shows custom tokens

#### 2.3 Document design system in Storybook
- Create "Design Tokens" documentation page
- Show color palette with contrast ratios
- Document typography scale
- Document spacing scale
- **Validation:** Design tokens page renders in Storybook

#### 2.4 Create Button component
- Variants: primary, secondary, danger, ghost
- Sizes: sm, md, lg
- States: default, hover, focus, disabled, loading
- Props: leftIcon, rightIcon, fullWidth
- **Test:** Unit tests for all variants, Storybook stories, a11y audit passes

#### 2.5 Create Icon component
- Wrapper for Lucide React icons
- Sizes: sm (16px), md (20px), lg (24px), xl (32px)
- Color inheritance + custom color prop
- Accessible: aria-hidden when decorative, aria-label when meaningful
- **Test:** Renders common icons (Shield, AlertTriangle, Phone, etc.)

#### 2.6 Create Typography components
- Heading component (h1-h4) with size variants
- Text component (body, small, caption)
- Label component for forms
- Support `as` prop for semantic flexibility
- **Test:** Unit tests, Storybook stories for all variants

#### 2.7 Create Card component
- Variants: default, elevated, outlined, interactive
- Props: title, children, footer, onClick
- Hover state for interactive variant
- **Test:** Unit tests, Storybook stories, keyboard interaction for interactive

#### 2.8 Create ExpandableCard component
- Extends Card with expand/collapse behavior
- Chevron animation on toggle
- ARIA expanded state
- **Test:** Unit tests for toggle, Storybook interaction test, a11y audit

#### 2.9 Create Badge component
- Variants: info, success, warning, danger, neutral
- Optional dot indicator
- Used for danger levels on scam types
- **Test:** Unit tests, Storybook stories

#### 2.10 Create Alert component
- Variants: info, success, warning, error
- Props: icon, title, description, action, dismissible
- ARIA role="alert" for important messages
- Dismiss animation
- **Test:** Unit tests, a11y audit for alert role

#### 2.11 Create Input component
- Props: label, placeholder, error, helperText, disabled
- Focus ring styling
- Error state with message
- **Test:** Unit tests for states, Storybook stories

#### 2.12 Create TextArea component
- Extends Input patterns
- Character counter (optional)
- Auto-resize option
- **Test:** Unit tests, character counter accuracy

#### 2.13 Create form validation hook
- `useFormValidation` hook
- Common validators: required, email, maxLength
- Error message patterns
- **Test:** Unit tests for all validators

#### 2.14 Create Header component
- Logo placeholder
- Navigation links (configurable)
- Mobile: hamburger button (no drawer yet)
- **Test:** Renders correctly at all breakpoints

#### 2.15 Create mobile navigation drawer
- Slide-in drawer for mobile
- Triggered by hamburger button
- Focus trap when open
- Escape to close
- **Test:** Opens/closes correctly, focus management works

#### 2.16 Create Footer component
- Partner logo placeholders
- Copyright text
- Key links section
- **Test:** Renders at all breakpoints

#### 2.17 Create Layout component
- Composes Header, main content area, Footer
- Max-width container (1200px)
- Responsive padding
- Skip link for accessibility
- **Test:** Skip link works, layout renders correctly

#### 2.18 Create Skeleton components
- SkeletonText (single line, multi-line)
- SkeletonCard
- SkeletonButton
- Shimmer animation
- **Test:** Storybook stories showing loading states

#### 2.19 Create Breadcrumb component
- Props: items array with label and href
- Current page not linked
- Accessible navigation landmark
- **Test:** Renders correctly, last item not clickable

#### 2.20 Create ThemeProvider foundation
- Context for theme (light mode only for MVP)
- CSS variables approach for future dark mode
- **Test:** Theme context accessible in components

---

## Sprint 3: Static Content Pages

**Goal:** All informational pages built with real content, navigable site structure.

**Demo:** Navigate through homepage, all 9 scam type pages, warning signs hub, with working links. Lighthouse SEO > 90.

### Tasks

#### 3.1 Define content data structures
- TypeScript interfaces: ScamType, WarningSign, RedFlag, Step
- Zod schemas for validation
- **Validation:** Types compile, schemas validate test data

#### 3.2 Create scam types content files
- MDX or JSON files for all 9 scam types:
  1. Bank/JFSC Impersonation
  2. Investment Fraud
  3. Romance Scams
  4. Invoice/BEC Fraud
  5. Delivery Scams
  6. Tech Support Scams
  7. Prize/Lottery Scams
  8. Phishing
  9. Authorised Push Payment
- Include: description, how it works (steps), red flags, actions
- **Validation:** All files pass schema validation

#### 3.3 Create warning signs content
- Content for 10 universal warning signs
- Each: title, description, examples, icon
- **Validation:** Content file passes schema validation

#### 3.4 Implement Next.js metadata API
- Create metadata utility function
- Configure default metadata in layout
- OG image placeholder
- **Validation:** Pages have correct title, description in head

#### 3.5 Create HeroSection component
- Props: title, subtitle, primaryCTA, secondaryCTA
- Background styling matching JFSC
- Responsive text sizing
- **Test:** Renders correctly, CTAs are focusable

#### 3.6 Create homepage hero
- Title: "Think you've received a scam? We can help you check."
- Primary CTA: "Check a message" (placeholder action)
- Secondary CTA: "I've been scammed →"
- **Test:** Renders with correct content

#### 3.7 Create ScamTypeCard component
- Props: icon, title, description, href, dangerLevel
- Badge for danger level
- Hover animation
- **Test:** Renders correctly, link navigates

#### 3.8 Create homepage scam type grid
- Display all 9 scam types as cards
- Responsive: 1 col → 2 col → 3 col
- **Test:** All 9 cards render, responsive layout correct

#### 3.9 Create AlertPreview component
- Props: title, date, category, href
- Category badge
- Date formatting
- **Test:** Renders with mock data

#### 3.10 Create homepage alerts section
- Display 3 latest alerts (mock data for now)
- "View all alerts" link
- Graceful empty state
- **Test:** Renders with mock data, handles empty array

#### 3.11 Create EmergencyBanner component
- High-visibility styling (alert-red background)
- Text: "Already given money or details? Act now →"
- Link to emergency guide
- Dismissible (session storage)
- **Test:** Renders, dismiss persists in session

#### 3.12 Assemble homepage
- Integrate: hero, scam grid, alerts, emergency banner
- Partner logos in footer
- SEO metadata
- **Test:** Page renders completely, Lighthouse SEO > 90

#### 3.13 Create StepVisualization component
- Props: steps array with icon, title, description
- Horizontal on desktop, vertical on mobile
- Numbered steps with connector lines
- **Test:** Renders 3-5 steps correctly, responsive

#### 3.14 Create RedFlagChecklist component
- Props: flags array
- Warning icon per item
- Expandable detail (optional)
- **Test:** Renders list, expand works

#### 3.15 Create ActionSteps component
- Props: steps array
- Numbered action items
- Optional link per step
- **Test:** Renders steps with correct numbering

#### 3.16 Create scam type page template
- Route: `/scams/[slug]`
- Sections: header with badge, how it works, red flags, actions
- Breadcrumb navigation
- Related scam types links
- **Test:** Template renders with test data

#### 3.17 Implement static generation for scam pages
- `generateStaticParams` for all 9 slugs
- `generateMetadata` per page
- **Validation:** All 9 pages build successfully

#### 3.18 Create WarningSignCard component
- Props: icon, title, description
- Expandable for full detail
- **Test:** Renders, expand/collapse works

#### 3.19 Create ScamLanguageDecoder component
- List of common scam phrases
- Each phrase with explanation
- **Test:** Renders phrase list correctly

#### 3.20 Create ComparisonTable component
- Side-by-side: Legitimate vs Scam
- Visual indicators (check vs X)
- Responsive stacking on mobile
- **Test:** Renders correctly at all breakpoints

#### 3.21 Build warning signs hub page
- Route: `/warning-signs`
- Grid of 10 warning signs
- Scam language decoder section
- Comparison examples
- **Test:** Page renders all sections, SEO metadata correct

#### 3.22 Create site navigation links
- Update Header with real links
- Active state for current page
- **Test:** Navigation works, active states correct

#### 3.23 Create 404 page
- Friendly error message
- Links to homepage and popular sections
- **Test:** Unknown routes show 404

#### 3.24 Create loading states for pages
- Loading.tsx files for route segments
- Use Skeleton components
- **Test:** Loading states appear during navigation

---

## Sprint 4: Guardrails Backend Service

**Goal:** Fully functional input/output validation API that blocks attacks and ensures safe responses.

**Demo:** curl requests demonstrating: blocked jailbreaks, passed legitimate queries, softened outputs, rate limiting.

### Tasks

#### 4.1 Create system prompt
- Implement full prompt from technical spec
- Identity, scope, manipulation resistance sections
- Jersey-specific information
- Response structure guidelines
- **Validation:** Prompt renders correctly, no syntax errors, reviewed by team

#### 4.2 Define API schemas
- `ChatRequest`: message (str, max 2000), session_id (optional str)
- `ChatResponse`: response (str), concern_level (enum), blocked (bool), blocked_reason (optional)
- `ValidationResult`: is_valid, reason (enum), user_message, cleaned_input
- `ErrorResponse`: error_code, message, details
- **Test:** Schema validation tests for valid/invalid inputs

#### 4.3 Create standardized error responses
- Error codes: INPUT_TOO_LONG, EMPTY_INPUT, BLOCKED_CONTENT, RATE_LIMITED, SERVICE_UNAVAILABLE
- Consistent response structure
- **Test:** Error responses match schema

#### 4.4 Implement base validation framework
- `validate_input()` function structure
- Ordered layer execution
- Return ValidationResult
- **Test:** Framework executes layers in order

#### 4.5 Implement length validation
- Reject > 2000 characters
- Reject empty/whitespace-only
- User-friendly messages
- **Test:** Boundary tests (0, 1, 2000, 2001 chars)

#### 4.6 Implement encoding detection
- Base64 detection and decode attempt
- Leetspeak detection (>30% substitution)
- Zero-width character detection
- **Test:** Unit tests for each encoding type (10+ cases)

#### 4.7 Implement persona injection detection
- Patterns: "you are now", "act as", "DAN", "developer mode", "grandma"
- Case-insensitive
- **Test:** 15+ known persona injection attempts blocked

#### 4.8 Implement hypothetical framing detection
- Patterns: "hypothetically", "for a story", "imagine", "fictional"
- **Test:** 10+ hypothetical framing attempts blocked

#### 4.9 Implement urgency manipulation detection
- Patterns: "will die", "emergency", "only you can", "child is dying"
- **Test:** 10+ urgency manipulation attempts blocked

#### 4.10 Implement authority escalation detection
- Patterns: "I'm a developer", "security audit", "override", "OpenAI"
- **Test:** 10+ authority escalation attempts blocked

#### 4.11 Implement prompt injection detection
- Patterns: `<|...|>`, `[INST]`, `<<SYS>>`, `###System`, role markers
- **Test:** 10+ prompt injection attempts blocked

#### 4.12 Implement off-topic detection
- Scam-related keyword patterns (generous matching)
- Allow greetings/pleasantries
- **Test:** On-topic passes, off-topic blocked, edge cases handled

#### 4.13 Create unified input validation function
- Execute all validators in order
- Short-circuit on first failure
- Map reasons to user-friendly messages
- **Test:** Integration tests covering all paths

#### 4.14 Implement output claim softening
- Detect "definitely a scam" patterns
- Replace with "shows warning signs" language
- Preserve meaning while removing certainty
- **Test:** Claim detection and replacement (10+ cases)

#### 4.15 Implement verification advice injection
- Check if scam-related response lacks verification advice
- Append standard reminder
- Don't duplicate if already present
- **Test:** Injection logic correct

#### 4.16 Implement hard output filter
- Exact phrase blocklist (harmful, persona breaks, prompt leaks)
- Regex pattern blocklist (weapons, drugs, malware, phishing)
- Replace entire response with safe fallback
- **Test:** Each banned category triggers replacement

#### 4.17 Create Ollama client
- Async HTTP client with httpx
- Configurable: model, temperature, max_tokens, timeout
- Retry logic with exponential backoff
- **Test:** Mock tests for success, timeout, retry

#### 4.18 Implement timeout handling
- 30-second timeout for Ollama requests
- Graceful degradation message
- Log timeout events
- **Test:** Timeout returns appropriate response

#### 4.19 Implement fallback behavior
- Detect Ollama unavailability
- Return helpful fallback message with manual resources
- **Test:** Fallback triggers when Ollama down

#### 4.20 Implement rate limiting middleware
- Per-IP rate limiting (10 req/min)
- Per-session rate limiting
- Return 429 with retry-after header
- **Test:** Rate limit triggers correctly, header present

#### 4.21 Create chat endpoint
- `POST /api/chat`
- Pipeline: rate limit → input validation → Ollama → output validation → hard filter
- Structured response
- **Test:** Integration tests for full cycle

#### 4.22 Implement request logging
- Log: request_id, input_length, latency_ms, blocked, blocked_reason
- Hash IP for privacy
- Never log content
- **Test:** Logs contain expected fields, no PII

#### 4.23 Implement security event logging
- Separate security log for blocked requests
- Log: timestamp, block_type, trigger (not full content)
- **Test:** Security events logged correctly

#### 4.24 Add Prometheus metrics
- Counters: requests_total, blocks_total (by reason)
- Histograms: request_latency, llm_latency
- Gauges: active_requests
- **Test:** Metrics endpoint returns valid Prometheus format

#### 4.25 Create jailbreak test suite
- 50+ test cases covering all attack categories
- Automated execution against API
- Assert on should_contain and should_not_contain
- **Test:** Full suite passes (100% required)

#### 4.26 Create API documentation
- OpenAPI/Swagger spec
- Document all endpoints, schemas, error codes
- Example requests/responses
- **Validation:** Swagger UI renders correctly

---

## Sprint 5: Chatbot UI Integration

**Goal:** Functional chat interface connected to backend, handling all conversation flows.

**Demo:** Open chat widget, have conversation about suspicious message, see assessment with concern level, quick replies, error recovery.

### Tasks

#### 5.1 Create ChatMessage component
- Props: content, role (user/assistant), timestamp, concernLevel
- Visual distinction: user (right, blue), bot (left, gray)
- Markdown rendering for bot messages
- Concern level badge on assessments
- **Test:** Renders both roles, markdown parses

#### 5.2 Create ChatInput component
- TextArea with send button
- Character counter (max 2000)
- Submit on Enter (Shift+Enter for newline)
- Disabled state while sending
- **Test:** Validation, keyboard shortcuts, disabled state

#### 5.3 Create TypingIndicator component
- Animated dots
- Accessible: aria-label "Assistant is typing"
- **Test:** Animation renders, accessible

#### 5.4 Create ChatMessageList component
- Scrollable container
- Auto-scroll to bottom on new message
- Show TypingIndicator when loading
- **Test:** Scroll behavior works

#### 5.5 Create chat API client
- `chatApi.sendMessage(message, sessionId)` function
- Returns typed response
- Handles errors with typed error responses
- **Test:** Mock API tests for success, errors

#### 5.6 Create useChat hook
- State: messages[], isLoading, error, sessionId
- Functions: sendMessage, clearChat, retryLast
- Session ID generation
- **Test:** State updates correctly for all operations

#### 5.7 Create ChatWidget container
- Floating button (bottom-right, navy)
- Expandable panel (400px × 600px)
- Header with title and close button
- **Test:** Opens/closes correctly

#### 5.8 Create chat widget state persistence
- Store open/closed state in sessionStorage
- Restore on page navigation
- **Test:** State persists across navigation

#### 5.9 Create chat welcome message
- Display on first open
- Explains purpose: "I help assess suspicious messages..."
- Suggests what to share
- **Test:** Welcome appears only on first open

#### 5.10 Create QuickReply component
- Props: options array with label and value
- Displayed after bot messages
- Clicking sends as user message
- **Test:** Buttons render, clicking sends message

#### 5.11 Define quick reply content
- Context-aware replies: "Tell me more", "What should I do?", "Check another message"
- Post-assessment replies: "Report this", "Contact my bank"
- **Validation:** Content reviewed for appropriateness

#### 5.12 Implement ARIA live regions
- Announce new messages to screen readers
- Use aria-live="polite" for bot messages
- **Test:** Screen reader announces messages

#### 5.13 Implement focus management
- Focus input when chat opens
- Return focus to trigger when closed
- **Test:** Focus moves correctly on open/close

#### 5.14 Create ChatFeedback component
- "Was this helpful?" with thumbs up/down
- Appears after bot responses
- Sends anonymous feedback
- **Test:** Buttons work, feedback sent

#### 5.15 Create HumanEscalation component
- Links: Police (01534 612612), Citizens Advice
- Click-to-call on mobile (tel: links)
- Displayed in chat footer
- **Test:** Links render with correct hrefs

#### 5.16 Create ChatDisclaimer component
- Brief AI limitations disclaimer
- "This is guidance only, not professional advice"
- In chat header or footer
- **Test:** Disclaimer visible

#### 5.17 Create ChatError component
- Network error with retry button
- Rate limit with countdown
- Generic error fallback
- **Test:** Each error state renders, retry works

#### 5.18 Implement message retry
- "Retry" button on failed messages
- Resends last user message
- **Test:** Retry sends message, updates on success

#### 5.19 Implement copy response
- Copy button on bot messages
- Copies markdown as plain text
- Toast confirmation
- **Test:** Copy works, toast appears

#### 5.20 Create chat widget animations
- Open/close slide animation (Framer Motion)
- Message appear fade-in
- 60fps performance
- **Test:** Animations smooth, no layout shift

#### 5.21 Integrate chat widget into layout
- Add to Layout component
- Appears on all pages
- Z-index management
- **Test:** Widget accessible from all pages

#### 5.22 Implement conversation persistence
- Store messages in sessionStorage
- Restore on page reload
- Clear on "Start new chat"
- **Test:** Messages persist, clear works

#### 5.23 Create E2E test: happy path
- Open chat → send suspicious message → receive assessment → use quick reply
- **Test:** Playwright test passes

#### 5.24 Create E2E test: error handling
- Simulate network error → see error state → retry → success
- **Test:** Playwright test passes

#### 5.25 Create E2E test: jailbreak attempt
- Send jailbreak prompt → receive appropriate deflection
- **Test:** Playwright test passes

#### 5.26 Create visual regression tests
- Snapshot tests for all chat states
- Open, closed, loading, error, with messages
- **Test:** Visual snapshots match baseline

---

## Sprint 6: Emergency Guide, Resources & Alerts

**Goal:** Complete victim support pages, downloadable resources, live alert feed.

**Demo:** Navigate emergency guide with click-to-call, download PDF resources, view live alerts from JFSC.

### Tasks

#### 6.1 Create EmergencyStep component
- Props: number, icon, title, description, action (button/link)
- High-visibility styling
- Click-to-call for phone numbers
- **Test:** Renders correctly, tel: links work on mobile

#### 6.2 Create emergency guide page layout
- Route: `/help/ive-been-scammed`
- Time-critical visual treatment
- Print-friendly stylesheet
- **Test:** Page renders, print preview looks correct

#### 6.3 Build emergency guide content
- 7 steps in order:
  1. STOP further contact
  2. CALL your bank (click-to-call)
  3. CHANGE passwords
  4. REPORT to Police (01534 612612)
  5. DOCUMENT everything
  6. CHECK for damage
  7. GET support
- **Validation:** Content accuracy reviewed

#### 6.4 Add emotional support section
- "It's not your fault" messaging
- Victim Support Jersey link
- Mental health resources
- **Validation:** Tone reviewed for appropriateness

#### 6.5 Create print stylesheet
- Print-optimized styles for emergency guide
- Remove navigation, chat widget
- Phone numbers clearly visible
- **Test:** Print preview shows clean output

#### 6.6 Create ResourceCard component
- Props: title, description, fileType, fileSize, downloadUrl
- Download icon and button
- Preview thumbnail (optional)
- **Test:** Renders correctly, download link works

#### 6.7 Create PDF resources
- Warning signs poster (A4)
- Wallet card with emergency numbers
- "Before you click" checklist
- Accessible tagged PDFs
- **Validation:** PDFs render correctly, print at correct size

#### 6.8 Create resources page
- Route: `/resources`
- Downloadable materials section
- External links section
- **Test:** Page renders all sections

#### 6.9 Add downloadable resources
- List all PDFs with ResourceCards
- Organize by category
- **Test:** All download links functional

#### 6.10 Create ExternalLinkCard component
- Props: title, description, url, organization
- External link icon
- Opens in new tab with rel="noopener noreferrer"
- **Test:** Links open correctly

#### 6.11 Add external links section
- JFSC, Police, Fraud Prevention Forum, Citizens Advice
- Jersey-specific resources
- **Test:** All links valid and accessible

#### 6.12 Create RSS feed parser
- Fetch and parse JFSC/Police RSS feeds
- Extract: title, date, summary, link, category
- Handle parse errors gracefully
- **Test:** Parser handles valid feed, graceful on error

#### 6.13 Create alerts API route
- `GET /api/alerts`
- Server-side fetch with caching (15 min TTL)
- Return structured alert data
- **Test:** Returns valid JSON, caching works

#### 6.14 Implement RSS fetch error handling
- Retry logic (3 attempts)
- Stale content fallback
- Log errors
- **Test:** Retry works, fallback triggers

#### 6.15 Create AlertCard component
- Props: title, date, category, summary, href
- Category badge
- Date formatting
- **Test:** Renders correctly

#### 6.16 Create alerts page
- Route: `/alerts`
- Full list with pagination (10 per page)
- Category filter
- **Test:** Pagination works, filter works

#### 6.17 Update homepage alerts section
- Fetch from /api/alerts
- Display latest 3
- Graceful fallback on error
- **Test:** Shows real alerts, handles errors

#### 6.18 Create EmailSubscribe component
- Email input with validation
- Subscribe button
- Success/error states
- **Test:** Validation works, states display

#### 6.19 Implement email subscription endpoint
- `POST /api/subscribe`
- Integrate with email service (from Sprint 0 decision)
- Double opt-in flow
- **Test:** Subscription creates record

#### 6.20 Create unsubscribe page
- Route: `/unsubscribe`
- Token-based unsubscribe
- Confirmation message
- **Test:** Unsubscribe works with valid token

#### 6.21 Create about page
- Route: `/about`
- Purpose, partners, team
- AI disclaimer section
- **Test:** Page renders all content

#### 6.22 Create privacy policy page
- Route: `/privacy`
- Data handling, cookies, GDPR/Jersey DPA
- **Validation:** Legal review completed

#### 6.23 Implement cookie consent banner
- Display on first visit
- Accept/reject options
- Store preference
- Block analytics until consent
- **Test:** Banner shows, preference persists

---

## Sprint 7: Accessibility, Testing & Production

**Goal:** WCAG 2.1 AA compliant, security hardened, production deployed.

**Demo:** Pass automated a11y audit with 0 critical issues, demonstrate keyboard navigation, show staging deployment, pass security review.

### Tasks

#### 7.1 Run automated accessibility audit
- axe-core scan on all pages
- Document all violations by severity
- Create remediation plan
- **Validation:** Audit complete, issues documented

#### 7.2 Fix critical accessibility issues
- Address all critical/serious axe violations
- Color contrast, missing labels, focus issues
- **Test:** Re-scan shows 0 critical issues

#### 7.3 Fix moderate accessibility issues
- Address remaining violations
- ARIA improvements
- **Test:** Re-scan shows minimal issues

#### 7.4 Add skip navigation link
- "Skip to main content" at page start
- Visible on focus, hidden otherwise
- **Test:** Tab shows link, activates correctly

#### 7.5 Manual keyboard testing
- Tab through all pages
- Verify logical tab order
- Test all interactive elements
- Document any issues
- **Test:** All functionality keyboard accessible

#### 7.6 Screen reader testing
- Test with NVDA/VoiceOver
- Verify announcements for dynamic content
- Document any issues
- **Test:** Core flows work with screen reader

#### 7.7 Execute full jailbreak test suite
- Run 50+ test matrix against staging
- Document any failures
- Fix guardrails for bypasses
- **Test:** 100% pass rate required

#### 7.8 Create load test configuration
- k6 or Artillery scripts
- Scenarios: 10, 30, 50 concurrent users
- Test chat endpoint specifically
- **Validation:** Scripts ready to execute

#### 7.9 Execute load tests
- Run against staging environment
- Measure: latency p95, error rate, throughput
- Target: p95 < 5s at 30 concurrent
- **Test:** Performance targets met

#### 7.10 Optimize based on load test results
- Address identified bottlenecks
- Connection pooling, caching, etc.
- Re-test after optimization
- **Test:** Improved metrics

#### 7.11 Configure SSL/TLS
- Let's Encrypt certificates (or provided)
- Auto-renewal setup
- TLS 1.3 configuration
- **Test:** SSL Labs score A+

#### 7.12 Implement security headers
- CSP (Content Security Policy)
- HSTS
- X-Frame-Options
- X-Content-Type-Options
- **Test:** securityheaders.com passes

#### 7.13 Review and lock CORS policy
- Allow only production frontend domain
- Restrict methods to POST for chat
- **Test:** Cross-origin requests from other domains blocked

#### 7.14 Run dependency vulnerability scan
- `npm audit` for frontend
- `safety` or `pip-audit` for Python
- Address critical vulnerabilities
- **Test:** No critical vulnerabilities

#### 7.15 Security checklist review
- No secrets in code (git-secrets scan)
- No PII in logs (log review)
- Container security (non-root)
- Rate limiting verified
- **Test:** Checklist complete

#### 7.16 Configure error tracking
- Sentry integration for frontend and backend
- Source maps upload
- Alert configuration
- **Test:** Test error appears in Sentry

#### 7.17 Configure uptime monitoring
- External monitor for key endpoints
- Alert on downtime
- **Test:** Monitor pings successfully

#### 7.18 Configure log aggregation
- Centralize logs from all services
- Structured log parsing
- **Test:** Logs flowing to central location

#### 7.19 Configure alerting
- Alerts: error rate > 1%, latency > 5s, service down
- Alert channels (email, Slack, etc.)
- **Test:** Test alert triggers correctly

#### 7.20 Create production docker-compose
- `docker-compose.prod.yml`
- Production environment variables
- Resource limits
- Restart policies
- Health checks
- **Validation:** Config validates, services start

#### 7.21 Create deployment scripts
- `scripts/deploy.sh` for production
- Blue-green deployment support
- **Test:** Script executes successfully on staging

#### 7.22 Document rollback procedure
- Step-by-step rollback instructions
- Test rollback
- **Test:** Rollback successfully restores previous version

#### 7.23 Write operations runbook
- Startup/shutdown procedures
- Common troubleshooting
- Incident response
- Contact escalation
- **Validation:** Runbook covers operational scenarios

#### 7.24 Provision staging environment
- Deploy full stack to staging
- Configure staging domain
- Mirror production config
- **Test:** Staging accessible

#### 7.25 Full E2E test on staging
- Run complete test suite
- Manual smoke test of all flows
- **Test:** All tests pass

#### 7.26 Configure DNS
- Production domain DNS records
- CNAME/A records as needed
- TTL configuration
- **Validation:** DNS resolves correctly

#### 7.27 Production deployment
- Execute deployment to production
- Verify all services healthy
- **Test:** Production site accessible

#### 7.28 Post-launch verification
- Lighthouse audit: Performance > 80, A11y > 90, SEO > 90
- Chat functionality verified
- Mobile responsiveness verified
- Monitoring verified
- **Test:** All metrics meet targets

#### 7.29 Create launch checklist document
- All verifications documented
- Sign-off from stakeholders
- **Validation:** Checklist complete, signed off

---

## Summary

| Sprint | Tasks | Focus |
|--------|-------|-------|
| 0 | 8 | Technical decisions & risk reduction |
| 1 | 19 | Infrastructure & dev environment |
| 2 | 20 | Design system & components |
| 3 | 24 | Static content pages |
| 4 | 26 | Guardrails backend |
| 5 | 26 | Chat UI integration |
| 6 | 23 | Emergency guide, resources, alerts |
| 7 | 29 | Accessibility, security, production |
| **Total** | **175** | |

## Dependencies Between Sprints

```
Sprint 0 ─────────────────────────────────────────────────────────┐
    │                                                              │
    ▼                                                              │
Sprint 1 (Infrastructure)                                         │
    │                                                              │
    ├─────────────────┬───────────────────┐                       │
    ▼                 ▼                   ▼                       │
Sprint 2          Sprint 4           Sprint 6 ◄───────────────────┘
(Components)      (Backend)          (Content decisions)
    │                 │
    ▼                 │
Sprint 3             │
(Pages)              │
    │                 │
    └────────┬────────┘
             ▼
         Sprint 5
         (Chat UI)
             │
             ▼
         Sprint 7
         (Production)
```

## Risk Register

| Risk | Mitigation | Sprint |
|------|------------|--------|
| Qwen model quality insufficient | Sprint 0 spike, early testing | 0 |
| Jailbreak bypasses discovered | Comprehensive test suite, iterative hardening | 4, 7 |
| RSS feeds unreliable | Multiple sources, fallback content | 0, 6 |
| Performance under load | Load testing, optimization sprint | 7 |
| Accessibility failures | Testing throughout, dedicated fixes | 7 |
| GPU hardware issues | Cloud fallback plan | 0 |
