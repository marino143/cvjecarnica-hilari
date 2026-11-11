# Local consent repair, 2026-11-11

No commit, push or deployment. Prior uncommitted phone, language, slider and form fixes preserved. Existing GA4 ID G-8H40XGVSZZ unchanged.

## Scope and implementation
- All 14 current pages use consent.js, with equal accept/reject buttons, localized HR/EN/DE privacy links, persistent settings and withdrawal. Three translated privacy pages added.
- Removed inline unconditional GA loaders. Basic consent mode: no Google tag/analytics requests before a new explicit grant. Legacy hilari.consent grants are deliberately not trusted because the old disclosure said no third-party sharing.
- Ads consent remains denied. Google Signals/ad personalization disabled in local configuration. Custom events allowlisted; caller parameters discarded. No form contents, contact-link queries, URL query or fragment, or referring URL in manual payloads.
- Revoke/regrant, fresh storage checks, cross-tab changes, page restoration, storage failure, delayed tag completion, cookie cleanup, fetch/beacon/XHR late-send guards. Regrant produces a new page view, without a second config or script load.
- Google fonts self-hosted with original families/weights and SIL licenses in fonts/. Google Maps embeds replaced by explicit external map links, so neither makes automatic Google requests before consent. No redesign.
- Browser keyboard tests exposed a pre-existing article Escape/arrow-key null lightbox error; fixed main.js guard.
- Existing Behold Instagram widget is separate from analytics and remains unchanged; privacy disclosure explicitly mentions it. Browser harness stubs it, so it does not validate its third-party runtime. Do not claim this is a whole-site privacy certification.

## Preflight / design decisions
Existing site banner/button/CSS patterns were adequate; shared dependency-free controller replaces duplicated snippets. No service or paid dependency introduced.
Reading: functional privacy controls for florist visitors, retaining cream/charcoal/rose and original typefaces; ENERGY 1 / RHYTHM 1 / MOTION 1. Nonmodal fixed panel retains access to the page. Equal buttons avoid choice bias, high-contrast charcoal preserves readability. Existing shadow separates floating controls; no new icons, cards, gradients, motion or brand assets.

## Tests and evidence
- node --check main.js; node --check consent.js; node tests/conversions.cjs; git diff --check.
- tests/consent-browser.cjs uses installed Playwright/Chromium, isolated ephemeral profiles and loopback server. All external requests are fulfilled locally, including a deterministic fake Google tag, so no production events or forms are sent.
- All 14 pages: zero Google requests before choice, after rejection and reload; localized privacy destination, mobile overflow check, settings/Escape.
- Acceptance, manual payload minimization, ads denied, one load/config, new page view on regrant, cookie deletion, cross-tab withdrawal/regrant, revoke during load, blocked storage and legacy grant reset.
- After withdrawal, scroll/pagehide/direct gtag/custom events/fetch/beacon/XHR produce no Google requests in this harness.
- Screenshots: tests/screenshots/consent-{hr,en,de}-mobile.png and settings-{hr,en,de}-320.png; browser check also captures desktop. Mobile screenshots inspected for readable text, equal visible buttons and no clipping.
- Swap checked before browser: 6.28 GB in use. Only one isolated headless browser at a time; contexts, browser and loopback server closed in finally. No simulators used.

## Exact-diff correctness and security review
Reviewed git diff against HEAD 94323d9, plus new consent.js/privacy pages/font CSS/tests. Boundaries: browser storage (untrusted/possibly inaccessible), consent-controlled Google network, Formspree delivery, user-entered form data. Static localized UI text is not user-controlled; no secrets added; fixed analytics ID is public; no server/auth/payment changes.
Fixed original HIGH issues: unconditional Google loading; misleading sharing/anonymous copy; missing article consent and withdrawal; advertising consent grant. Additional local high-risk parameter leakage blocked by allowlisting, sanitized page context and disabling automatic collection settings where available. Keyboard null dereference fixed. No remaining known high issue in local first-party implementation.

## Required external gates before production
1. In the correct GA4 web stream, turn OFF Enhanced Measurement (all automatic events, especially outbound clicks, form interactions, search and history page views), and verify Google Signals/ad personalization remain off. Client-side enhanced_measurement and per-feature flags are defense-in-depth, NOT a documented substitute for the dashboard switch. Unverified until account inspection: do not ship as privacy-complete without this gate.
2. Confirm GA account ownership, retention setting and processor/transfer arrangements; owner should review privacy wording for their actual business practices. This is a technical disclosure, not a legal compliance certification.
3. Real Google tag behavior is NOT proven by a stub. After dashboard configuration, perform an authorized isolated real-tag test with collection intercepted, including withdrawal and buffered transports, then a separately authorized production collection/Realtime test after deployment. Do not infer delivery from the local fake tag.
4. Existing Behold runtime/its subresources remain outside this GA repair; separately review consent needs before claiming zero third-party requests site-wide.
5. Deploy current HTML + main.js + style.css + consent.js + all three privacy.html files + entire fonts/ together. Do not upload audit files/tests/screenshots. cPanel deployment remains owner-controlled. No actual form submission tested.

## Anti-slop delivery gate (changed UI only)
- Hard gate PASS: real localized controls/links, no new fabricated claims/assets/statistics; no added em dashes; 320/390px mobile checked; Escape and visible focus; 44px controls. Existing marketing content is not recertified.
- Purpose gate PASS: inherited florist palette/typefaces/radii, shadow only to separate overlay; no decorative additions.
- Liveliness PASS: declared 1/1/1 dials, inherited floral identity, title focal point, structural spacing and restrained rose borders.
- Craft/quality PASS: accepted/denied/storage-error states and working controls exercised; no redesign, new template sections, fake functionality or unsupported compliance claims.

Review: 6 issues found, 6 fixed, 0 open in local first-party diff. External gates above remain unverified and block production readiness.

## Independent follow-up
See INDEPENDENT-REVIEW-2026-11-11.md: attribution stripping corrected with validated campaign/click allowlist and origin-only referrer; post-grant early events now queued. Privacy wording updated accordingly. Actual Google runtime tested with ALL collection intercepted (not only stub); its local transport gate is now verified, but production receipt and dashboard/owner gates remain separate. Earlier claims here of stripping all query/referrer and lack of a real-tag test describe the prior revision.
