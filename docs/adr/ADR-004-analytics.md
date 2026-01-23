# ADR-004: Analytics Solution

**Status:** Proposed

**Date:** 2026-01-23

**Decision Makers:** ScamAware Jersey Development Team

---

## Context

ScamAware Jersey requires website analytics to understand user engagement, measure the effectiveness of scam awareness content, and identify areas for improvement. However, as a public-interest website serving Jersey residents, we must prioritise user privacy and comply with:

- **General Data Protection Regulation (GDPR)** - applicable via Jersey's relationship with the EU
- **Jersey Data Protection Authority (DPA)** requirements
- **Jersey residents' expectations** for high privacy standards from government-affiliated services

Traditional analytics solutions like Google Analytics collect extensive personal data, use cookies for tracking, and transfer data to third-party servers (often outside the EU/UK adequacy zone). This creates compliance burdens (cookie consent banners, privacy policy updates) and erodes user trust.

We need an analytics solution that:
1. Provides actionable insights on website usage
2. Respects user privacy by design
3. Operates without cookies where possible
4. Complies with GDPR and Jersey DPA without requiring cookie consent banners
5. Aligns with the public-service nature of ScamAware Jersey

---

## Options Considered

### Option A: Plausible Analytics

**Overview:** Open-source, privacy-focused web analytics. Available as SaaS or self-hosted.

| Aspect | Details |
|--------|---------|
| **Privacy Model** | Cookie-free, no personal data collection, IP addresses not stored |
| **Data Location** | EU-based servers (Germany) for SaaS |
| **GDPR Compliance** | Fully compliant, no consent required |
| **Hosting** | SaaS (plausible.io) or self-hosted (Community Edition) |
| **Features** | Page views, bounce rate, visit duration, referrers, UTM tracking, goals, custom events, funnels |
| **Dashboard** | Clean, simple, single-page dashboard |
| **Cost (SaaS)** | From $9/month (10k pageviews) to $19/month (100k pageviews) |
| **Cost (Self-hosted)** | Free (infrastructure costs only) |
| **Setup Complexity** | Very easy (single script tag) |

**Pros:**
- Lightweight script (~1KB)
- EU-owned and operated company
- Public dashboard option (transparency)
- API access for custom reporting
- Strong community and documentation

**Cons:**
- Limited advanced segmentation compared to Google Analytics
- Self-hosted version requires PostgreSQL and ClickHouse

---

### Option B: Matomo (Self-hosted)

**Overview:** Open-source analytics platform, formerly Piwik. Full-featured Google Analytics alternative.

| Aspect | Details |
|--------|---------|
| **Privacy Model** | Configurable - can be cookie-free with reduced features |
| **Data Location** | Self-hosted (your infrastructure) |
| **GDPR Compliance** | Compliant when properly configured |
| **Hosting** | Self-hosted (On-Premise) or Matomo Cloud |
| **Features** | Comprehensive: heatmaps, session recording, A/B testing, funnels, custom dimensions |
| **Dashboard** | Feature-rich but complex |
| **Cost (Cloud)** | From EUR 19/month (50k hits) |
| **Cost (Self-hosted)** | Free (infrastructure + maintenance costs) |
| **Setup Complexity** | Moderate (requires PHP, MySQL, server maintenance) |

**Pros:**
- Most feature-complete open-source option
- Granular privacy controls
- Plugin ecosystem
- Import Google Analytics data

**Cons:**
- Higher maintenance burden for self-hosting
- Cookie-free mode reduces functionality
- Heavier script (~22KB)
- Requires more technical expertise

---

### Option C: Fathom Analytics

**Overview:** Privacy-first analytics SaaS, founded by privacy advocates.

| Aspect | Details |
|--------|---------|
| **Privacy Model** | Cookie-free, EU isolation available |
| **Data Location** | EU servers available (Frankfurt) |
| **GDPR Compliance** | Fully compliant, no consent required |
| **Hosting** | SaaS only (no self-hosted option) |
| **Features** | Page views, referrers, UTM tracking, custom events, goals |
| **Dashboard** | Clean and simple |
| **Cost** | From $14/month (100k pageviews) to $24/month (200k pageviews) |
| **Setup Complexity** | Very easy (single script tag) |

**Pros:**
- Strong privacy reputation
- EU data isolation option
- Uptime monitoring included
- Email reports

**Cons:**
- No self-hosted option
- More expensive than Plausible for similar features
- US-based company (data processing concerns for some)
- Limited customisation

---

### Option D: Simple Analytics

**Overview:** Privacy-friendly analytics with strong ethical stance.

| Aspect | Details |
|--------|---------|
| **Privacy Model** | Cookie-free, minimal data collection |
| **Data Location** | EU-based (Netherlands) |
| **GDPR Compliance** | Fully compliant, no consent required |
| **Hosting** | SaaS only |
| **Features** | Page views, referrers, goals, events, lightweight |
| **Dashboard** | Minimalist |
| **Cost** | From $9/month (starter) to $49/month (business) |
| **Setup Complexity** | Very easy |

**Pros:**
- EU-based company
- Carbon-neutral infrastructure
- Twitter/social media integration
- Public dashboard option

**Cons:**
- Fewer features than competitors
- Limited event tracking
- No self-hosted option
- Smaller community

---

### Option E: Umami (Self-hosted)

**Overview:** Open-source, privacy-focused analytics. Modern alternative to Matomo.

| Aspect | Details |
|--------|---------|
| **Privacy Model** | Cookie-free, no personal data |
| **Data Location** | Self-hosted (your infrastructure) |
| **GDPR Compliance** | Compliant by design |
| **Hosting** | Self-hosted only (can use Vercel, Railway, etc.) |
| **Features** | Page views, referrers, events, realtime, multiple sites |
| **Dashboard** | Modern, clean interface |
| **Cost** | Free (infrastructure costs: ~$5-20/month on cloud platforms) |
| **Setup Complexity** | Easy with modern platforms (Docker, Vercel) |

**Pros:**
- Completely free and open-source
- Lightweight (~2KB script)
- Easy deployment on modern platforms
- Active development
- Multi-language support

**Cons:**
- Requires self-hosting infrastructure
- Fewer features than Plausible or Matomo
- Limited funnel analysis
- Smaller ecosystem

---

### Option F: No Analytics / Server-side Only

**Overview:** Rely on server logs or implement custom server-side analytics only.

| Aspect | Details |
|--------|---------|
| **Privacy Model** | Maximum privacy (no client-side tracking) |
| **Data Location** | Server logs only |
| **GDPR Compliance** | N/A or minimal processing |
| **Hosting** | N/A |
| **Features** | Basic: requests, status codes, IPs (anonymised) |
| **Dashboard** | Requires custom tooling (AWStats, GoAccess) |
| **Cost** | Free |
| **Setup Complexity** | Varies (log parsing setup required) |

**Pros:**
- Ultimate privacy compliance
- No external dependencies
- Zero additional cost
- No JavaScript required

**Cons:**
- Very limited insights
- No user journey analysis
- Difficult to measure content effectiveness
- Cannot track goals or events
- Missing data from cached pages/CDN

---

## Decision Criteria Evaluation

| Criteria | Weight | Plausible | Matomo | Fathom | Simple | Umami | No Analytics |
|----------|--------|-----------|--------|--------|--------|-------|--------------|
| **Privacy Compliance** | High | Excellent | Good | Excellent | Excellent | Excellent | Excellent |
| **Cookie-free** | High | Yes | Partial | Yes | Yes | Yes | Yes |
| **GDPR/Jersey DPA** | High | Compliant | Configurable | Compliant | Compliant | Compliant | N/A |
| **Self-hosted Option** | Medium | Yes | Yes | No | No | Yes | N/A |
| **Feature Set** | Medium | Good | Excellent | Good | Basic | Good | Poor |
| **Goals/Events** | Medium | Yes | Yes | Yes | Limited | Yes | No |
| **Funnels** | Low | Yes | Yes | No | No | Limited | No |
| **Ease of Setup** | Medium | Excellent | Moderate | Excellent | Excellent | Good | Poor |
| **Cost** | Medium | Low | Variable | Medium | Low | Free | Free |
| **EU Data Residency** | High | Yes | Yes (self) | Yes | Yes | Yes (self) | Yes |

---

## Decision

**Recommended Solution: Plausible Analytics (SaaS)**

After evaluating all options against our requirements, we recommend **Plausible Analytics** as the primary analytics solution for ScamAware Jersey.

### Rationale

1. **Privacy-First by Design:** Plausible is built from the ground up for privacy. It collects no personal data, uses no cookies, and requires no consent banners. This aligns perfectly with Jersey residents' expectations and GDPR/DPA requirements.

2. **EU Data Residency:** Plausible's SaaS servers are located in Germany (EU), ensuring data remains within GDPR-adequate jurisdiction. The company is EU-owned and operated.

3. **Sufficient Feature Set:** While not as comprehensive as Google Analytics or Matomo, Plausible provides all the metrics ScamAware Jersey needs:
   - Page views and unique visitors
   - Bounce rate and visit duration
   - Referral sources and UTM campaign tracking
   - Goal completions (e.g., "user viewed scam report form")
   - Custom events (e.g., "clicked emergency contacts")
   - Basic funnels for user journeys

4. **Lightweight and Fast:** The ~1KB script has minimal impact on page load performance, important for accessibility and mobile users.

5. **Transparent Operations:** Plausible offers public dashboards, allowing ScamAware Jersey to share analytics openly with stakeholders, demonstrating transparency and public accountability.

6. **Cost-Effective:** At $9-19/month, the SaaS option is affordable for a public-interest project and eliminates infrastructure maintenance overhead.

7. **Easy Integration:** Single script tag integration works seamlessly with Astro/static site generators.

### Implementation Approach

```html
<!-- Plausible Analytics - Privacy-friendly, no cookies -->
<script defer data-domain="scamaware.je" src="https://plausible.io/js/script.js"></script>
```

For goal tracking:
```javascript
// Track scam report submissions
plausible('Scam Report Submitted', { props: { type: 'phishing' } });
```

---

## Consequences

### Positive Consequences

1. **No Cookie Consent Banner Required:** Plausible's cookie-free approach means no intrusive consent popups, improving user experience and page load times.

2. **GDPR/DPA Compliance by Default:** No additional legal review or privacy policy updates needed specifically for analytics.

3. **Trust Building:** Using privacy-respecting analytics demonstrates ScamAware Jersey's commitment to protecting residents' data.

4. **Transparent Reporting:** Public dashboard option allows stakeholders to view site performance without requiring separate reports.

5. **Simple Maintenance:** SaaS model eliminates infrastructure management, freeing resources for content development.

### Negative Consequences

1. **Limited Advanced Analytics:** Cannot perform detailed cohort analysis, heatmaps, or session recordings available in full-featured platforms.

2. **Recurring Cost:** Monthly subscription adds to operational costs (mitigated by choosing lower-tier plan initially).

3. **Vendor Dependency:** Reliance on third-party SaaS provider (mitigated by self-hosted option availability if needed).

4. **No Historical Data Import:** Cannot import historical data from other analytics platforms.

### Mitigations

- **Feature Gaps:** If advanced analytics become necessary, consider supplementing with Umami (self-hosted) for specific campaigns or A/B tests.
- **Cost Management:** Start with 10k pageview tier ($9/month), upgrade only as traffic grows.
- **Vendor Risk:** Plausible is open-source; self-hosting remains an option if the SaaS service becomes unavailable.

---

## Cost Estimate

### Recommended: Plausible SaaS

| Tier | Monthly Pageviews | Monthly Cost | Annual Cost |
|------|-------------------|--------------|-------------|
| Starter | Up to 10,000 | $9 | $108 |
| Growth | Up to 100,000 | $19 | $228 |
| Business | Up to 1,000,000 | $69 | $828 |

**Recommended Starting Tier:** Starter ($9/month)

For a new public-awareness website, 10,000 pageviews/month is a reasonable starting point. Plausible allows seamless upgrades as traffic grows.

### Alternative: Self-hosted Umami (if budget-constrained)

| Component | Monthly Cost |
|-----------|--------------|
| Railway/Render hosting | $5-10 |
| Database (included) | $0 |
| **Total** | ~$5-10/month |

Self-hosting reduces cost but increases maintenance responsibility.

---

## References

- [Plausible Analytics](https://plausible.io/)
- [Plausible GDPR Compliance](https://plausible.io/data-policy)
- [Jersey Data Protection Authority](https://jerseyoic.org/)
- [GDPR Cookie Consent Requirements](https://gdpr.eu/cookies/)
- [Matomo Analytics](https://matomo.org/)
- [Fathom Analytics](https://usefathom.com/)
- [Simple Analytics](https://simpleanalytics.com/)
- [Umami Analytics](https://umami.is/)

---

## Revision History

| Date | Author | Description |
|------|--------|-------------|
| 2026-01-23 | ScamAware Jersey Team | Initial draft |
