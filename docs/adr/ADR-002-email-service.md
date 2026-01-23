# ADR-002: Email Service Provider

## Status

Proposed

## Date

2026-01-23

## Context

ScamAware Jersey requires an email service provider to power the alert subscription system. This system will send scam alerts to Jersey residents who have opted in to receive notifications. The service must:

- Support transactional and bulk email sending for scam alerts
- Comply with Jersey data protection requirements (aligned with GDPR/UK GDPR)
- Provide reliable deliverability to ensure critical scam warnings reach subscribers
- Support double opt-in subscription workflows
- Be cost-effective for an expected subscriber base of approximately 1,000 users

Jersey, as a Crown Dependency, has its own data protection legislation (Data Protection (Jersey) Law 2018) which is closely aligned with GDPR principles. This requires careful consideration of where subscriber data is processed and stored.

## Options Considered

### Option A: SendGrid (Twilio)

**Overview:** Industry-standard transactional email service with extensive features.

| Criteria | Assessment |
|----------|------------|
| Data Residency | US-based company; EU data processing available via DPA |
| GDPR Compliance | GDPR compliant with Standard Contractual Clauses |
| Pricing | Free tier: 100 emails/day; Essentials: $19.95/month for 50K emails |
| Integration | Excellent SDKs (Node.js, Python, etc.); REST API |
| Deliverability | Strong reputation; dedicated IP available on higher tiers |
| Double Opt-in | Supported via API workflows |

**Pros:**
- Mature, battle-tested platform
- Extensive documentation and community support
- Advanced analytics and tracking

**Cons:**
- Can be complex for simple use cases
- Higher tiers required for some compliance features
- US-centric data processing by default

### Option B: Mailchimp/Mandrill

**Overview:** Popular marketing platform with transactional email capability via Mandrill.

| Criteria | Assessment |
|----------|------------|
| Data Residency | US-based; EU data center option available |
| GDPR Compliance | GDPR compliant with DPA |
| Pricing | Mandrill requires Mailchimp subscription; starts ~$20/month + $20/month for Mandrill (25K emails) |
| Integration | Good API; tightly coupled with Mailchimp ecosystem |
| Deliverability | Good reputation for marketing emails |
| Double Opt-in | Native support in Mailchimp |

**Pros:**
- Strong marketing automation features
- Built-in subscription management
- Good for combined marketing and transactional needs

**Cons:**
- More expensive for pure transactional use
- Mandrill requires separate Mailchimp subscription
- Overkill for simple alert notifications
- Complex pricing structure

### Option C: Resend

**Overview:** Modern email API built for developers, founded by former SendGrid engineers.

| Criteria | Assessment |
|----------|------------|
| Data Residency | AWS infrastructure; EU region available (eu-west-1) |
| GDPR Compliance | GDPR compliant; DPA available; can specify EU-only processing |
| Pricing | Free tier: 3,000 emails/month; Pro: $20/month for 50K emails |
| Integration | Modern REST API; excellent TypeScript/React Email support |
| Deliverability | Strong deliverability; built on proven infrastructure |
| Double Opt-in | Supported via API implementation |

**Pros:**
- Developer-first experience with modern API design
- React Email integration for building email templates
- Simple, transparent pricing
- EU data residency option satisfies Jersey requirements
- Excellent documentation and TypeScript support
- Fast integration time

**Cons:**
- Newer service (launched 2023) with shorter track record
- Fewer advanced analytics compared to SendGrid
- Smaller community than established players

### Option D: Self-Hosted (Postfix/Mailgun)

**Overview:** Self-managed email infrastructure or Mailgun for more control.

| Criteria | Assessment |
|----------|------------|
| Data Residency | Full control with self-hosted; Mailgun offers EU option |
| GDPR Compliance | Full control if self-hosted |
| Pricing | Infrastructure costs only (self-hosted) or Mailgun: $35/month for 50K |
| Integration | Requires significant setup; Mailgun has good API |
| Deliverability | Challenging to maintain reputation self-hosted |
| Double Opt-in | Must implement manually |

**Pros:**
- Complete data control with self-hosted
- No third-party dependencies
- Mailgun offers good deliverability

**Cons:**
- Self-hosted requires significant operational overhead
- Deliverability reputation management is complex
- Higher maintenance burden
- IP warming required for new infrastructure
- Not practical for a small-scale project

## Decision Criteria

| Criteria | Weight | SendGrid | Mailchimp | Resend | Self-Hosted |
|----------|--------|----------|-----------|--------|-------------|
| Jersey/GDPR Data Residency | High | Good | Good | Excellent | Excellent |
| Cost (1K subscribers) | Medium | Good | Fair | Excellent | Poor |
| Ease of Integration | High | Good | Fair | Excellent | Poor |
| Deliverability Reputation | High | Excellent | Good | Good | Poor |
| Double Opt-in Support | Medium | Good | Excellent | Good | Poor |
| Developer Experience | Medium | Good | Fair | Excellent | Poor |
| Long-term Viability | Medium | Excellent | Excellent | Good | Fair |

## Decision

**Recommended: Option C - Resend**

Resend is recommended as the email service provider for ScamAware Jersey based on the following rationale:

1. **GDPR/Jersey Compliance:** Resend offers EU data residency (eu-west-1 region), satisfying Jersey's data protection requirements. Data can be processed entirely within EU jurisdiction, avoiding cross-border transfer complications.

2. **Cost Effectiveness:** The free tier (3,000 emails/month) is sufficient for initial launch and testing. With 1,000 subscribers receiving approximately 2-4 alerts per month, the free tier should cover initial needs. The Pro tier at $20/month provides ample headroom for growth.

3. **Developer Experience:** Resend's modern API design and TypeScript-first approach aligns well with modern web development practices. The React Email integration enables building maintainable, component-based email templates.

4. **Simplicity:** For an alert notification system, Resend provides exactly what is needed without unnecessary complexity. The straightforward API reduces implementation time.

5. **Deliverability:** Built by former SendGrid engineers with strong infrastructure foundations, Resend maintains good deliverability rates essential for ensuring scam alerts reach residents.

## Consequences

### Positive

- Fast implementation with modern, well-documented API
- EU data residency option ensures Jersey data protection compliance
- Cost-effective for projected subscriber volume
- React Email integration enables maintainable email templates
- Simple pricing model with predictable costs

### Negative

- Newer service with shorter track record than established competitors
- Fewer advanced features (A/B testing, advanced analytics) compared to SendGrid
- Smaller community and fewer third-party integrations
- May need to migrate if service discontinues (mitigated by abstraction layer)

### Mitigation Strategies

- Implement email service as an abstraction layer to allow provider switching if needed
- Monitor Resend's service status and company health
- Maintain email templates in portable format (React Email compiles to standard HTML)
- Set up basic monitoring and alerting for email delivery issues

## Cost Estimate

### Projected Usage

| Metric | Estimate |
|--------|----------|
| Initial subscribers | 100-500 |
| 12-month target | 1,000 |
| Alerts per month | 2-4 |
| Emails per month (1K subs) | 2,000-4,000 |

### Resend Pricing Tiers

| Tier | Monthly Cost | Emails/Month | Notes |
|------|-------------|--------------|-------|
| Free | $0 | 3,000 | Suitable for initial launch |
| Pro | $20 | 50,000 | Suitable for growth phase |
| Enterprise | Custom | Unlimited | If significant scale needed |

### Annual Cost Projection

| Phase | Duration | Monthly Cost | Annual Cost |
|-------|----------|--------------|-------------|
| Launch (Free tier) | 0-6 months | $0 | $0 |
| Growth (Pro tier) | 6-12 months | $20 | $120 |
| **Year 1 Total** | | | **$120** |
| Year 2 (Pro tier) | 12 months | $20 | $240 |

### Cost Comparison (Annual, 1K subscribers)

| Provider | Annual Cost |
|----------|-------------|
| Resend (Pro) | $240 |
| SendGrid (Essentials) | $240 |
| Mailchimp + Mandrill | $480+ |
| Self-hosted | $300+ (infrastructure) + staff time |

## Implementation Notes

1. **API Integration:** Use official Resend Node.js SDK
2. **Region Configuration:** Configure for EU region (eu-west-1) in API settings
3. **Double Opt-in:** Implement confirmation email workflow using Resend API
4. **Templates:** Use React Email for template development
5. **Monitoring:** Implement webhook handlers for delivery status tracking

## References

- [Resend Documentation](https://resend.com/docs)
- [Resend GDPR Compliance](https://resend.com/legal/dpa)
- [Data Protection (Jersey) Law 2018](https://www.jerseylaw.je/laws/current/Pages/15.240.aspx)
- [React Email](https://react.email/)

## Decision Record

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-23 | ScamAware Jersey Team | Initial proposal |
