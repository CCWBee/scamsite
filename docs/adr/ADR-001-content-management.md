# ADR-001: Content Management Architecture

**Status:** Proposed

**Date:** 2026-01-23

**Deciders:** ScamAware Jersey Development Team

---

## Context

The ScamAware Jersey portal requires a content management solution to handle educational content about scams, warning signs, reporting procedures, and other informational resources for Jersey residents. The content will include:

- Scam type descriptions and examples
- Warning signs and red flags
- Reporting procedures and contact information
- Educational articles and guides
- News and alerts about current scam trends

A decision is needed on how to store, manage, and deliver this content. The chosen approach must balance ease of content updates by non-technical staff, developer experience, performance, cost, and operational complexity.

---

## Options Considered

### Option A: Hardcoded Content in Code

Content is embedded directly in React/Next.js components as JSX or JavaScript objects.

**Pros:**
- Simple initial setup
- No additional dependencies
- Full TypeScript support and type safety
- Fast build times

**Cons:**
- Requires developer involvement for every content change
- Risk of introducing bugs when editing content
- Poor separation of concerns
- Not scalable for large amounts of content
- No preview capability for non-technical editors

### Option B: MDX Files in Repository

Content is stored as MDX (Markdown with JSX) files within the project repository, compiled at build time.

**Pros:**
- Familiar Markdown syntax accessible to non-technical staff
- Ability to embed React components when needed
- Git versioning provides full audit trail and rollback capability
- No additional infrastructure or hosting costs
- Excellent performance with static generation
- Content can be validated at build time
- Works seamlessly with Next.js App Router
- Local development and preview is straightforward

**Cons:**
- Content updates require a git commit and deployment
- Non-technical staff need basic git training or a git-based CMS interface
- No real-time preview without running development server
- Limited querying capabilities compared to a database

### Option C: Headless CMS (Strapi, Sanity, Contentful)

Content is managed through a dedicated CMS platform with an API for content delivery.

**Pros:**
- Rich editing experience with WYSIWYG editors
- Real-time preview capabilities
- Role-based access control
- Content scheduling and workflow features
- API-based content delivery
- Non-technical users can edit independently

**Cons:**
- Additional infrastructure to host and maintain (self-hosted options like Strapi)
- Monthly costs for SaaS solutions (Contentful, Sanity)
- Added complexity in build and deployment pipeline
- Potential latency from API calls (mitigated with caching)
- Another system to secure and monitor
- Vendor lock-in with proprietary platforms
- Overkill for relatively static content

---

## Decision Criteria

| Criteria | Weight | Option A: Hardcoded | Option B: MDX | Option C: Headless CMS |
|----------|--------|---------------------|---------------|------------------------|
| Maintainability by non-technical staff | High | Poor | Good | Excellent |
| Developer experience | Medium | Good | Excellent | Good |
| Performance | High | Excellent | Excellent | Good |
| Cost | Medium | Free | Free | Variable ($0-$500+/mo) |
| Hosting complexity | Medium | None | None | High |
| Audit trail / versioning | High | Via git | Via git | CMS-dependent |
| Time to implement | Low | Fast | Fast | Slow |

---

## Decision

**We recommend Option B: MDX files in repository.**

This approach provides the best balance of maintainability, performance, cost, and simplicity for the ScamAware Jersey portal.

### Rationale

1. **Content Characteristics:** The portal content is relatively static. Scam types, warning signs, and reporting procedures do not change frequently and do not require real-time updates.

2. **Accessibility for Non-Technical Staff:** Markdown is a widely-used, simple format that non-technical staff can learn with minimal training. Many are already familiar with it from documentation tools, GitHub, or note-taking apps.

3. **Version Control and Audit Trail:** Storing content in git provides a complete history of all changes, the ability to roll back mistakes, and accountability for who made what changes and when. This is valuable for a public-facing government/community resource.

4. **Zero Infrastructure Overhead:** No additional servers, databases, or third-party services need to be provisioned, secured, or maintained. This reduces operational burden and eliminates potential points of failure.

5. **Cost Efficiency:** No ongoing costs for CMS hosting or SaaS subscriptions. The entire solution runs on the existing hosting infrastructure.

6. **Performance:** MDX content compiles to static HTML at build time, resulting in fast page loads and excellent Core Web Vitals scores. No runtime API calls are needed to fetch content.

7. **Developer Experience:** MDX integrates seamlessly with Next.js and React. Developers can create reusable components that content authors can embed in their markdown. TypeScript support and build-time validation catch errors early.

8. **Future Flexibility:** If requirements change and a full CMS becomes necessary, the MDX content can be migrated to a headless CMS. The investment in MDX content is not lost.

---

## Consequences

### Positive Consequences

- **Simplified Architecture:** The application remains a single deployable unit without external dependencies for content.
- **Reliable Performance:** Static generation ensures consistent, fast page loads regardless of traffic.
- **Cost Savings:** No CMS licensing or hosting costs throughout the project lifecycle.
- **Security:** Reduced attack surface with no CMS admin interface to secure.
- **Disaster Recovery:** Content is backed up through git, making recovery straightforward.

### Negative Consequences

- **Deployment Required for Updates:** Content changes require a commit and redeployment. This adds a small delay compared to CMS-based instant publishing.
- **Training Needed:** Non-technical staff will need brief training on Markdown syntax and the git workflow (or a git-based editing interface like GitHub's web editor).
- **Limited Dynamic Features:** Features like content scheduling or complex workflows would require custom implementation.

### Mitigation Strategies

- Implement a CI/CD pipeline with preview deployments so content changes can be reviewed before going live.
- Create a simple content style guide and Markdown cheat sheet for content editors.
- Consider integrating a git-based CMS like Netlify CMS, Forestry, or TinaCMS in the future if the editing experience needs enhancement.
- Document the content update process thoroughly for non-technical team members.

---

## Implementation Notes

### Recommended File Structure

```
content/
  scams/
    phishing.mdx
    romance-scams.mdx
    investment-fraud.mdx
  guides/
    how-to-report.mdx
    protect-yourself.mdx
  alerts/
    2026-01-current-threats.mdx
```

### Technology Stack

- **@next/mdx** or **next-mdx-remote** for MDX processing
- **gray-matter** for frontmatter parsing
- **remark/rehype plugins** for enhanced markdown features
- Custom React components for interactive elements (warning boxes, reporting buttons, etc.)

---

## References

- [Next.js MDX Documentation](https://nextjs.org/docs/pages/building-your-application/configuring/mdx)
- [MDX Official Documentation](https://mdxjs.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Architecture Decision Records](https://adr.github.io/)
- [Jamstack Architecture](https://jamstack.org/)

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-23 | Development Team | Initial proposal |
