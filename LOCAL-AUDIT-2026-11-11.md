# Local Google growth audit, 2026-11-11

Baseline: clean working tree, HEAD 94323d9 (All Saints guide). No commits, push, deployment, browser use or real form submissions performed. Existing GA4 ID G-8H40XGVSZZ preserved. Live main.js matched baseline SHA-1 77d02f084aa10a125a9c2e51306231d29ab17e26. HTTP 200 verified for /, /en/, /de/, /blog/dostava.html and /blog/aranzmani-i-vijenci-za-sve-svete.html.

## Local fixes
- Correct mobile tel destination on HR/EN/DE homepages to match displayed 095/5309-214 and existing WhatsApp destination.
- Keep static URL language authoritative instead of silently translating HR URLs from a stale language preference; blocked localStorage no longer prevents startup.
- Do not start an empty hero slider on article pages.
- Validate form constraints (including email), prevent concurrent duplicate submissions, reject unconfigured/non-Formspree endpoints rather than showing false success, and use German loading/required-field feedback on DE pages.
- Preserve phone_click, whatsapp_click, generate_lead names. Custom events now require explicit analytics consent; generate_lead only follows successful HTTP response. Contact clicks are intent, NOT completed calls/messages or sales.
- Strip WhatsApp query/fragment from custom event payloads. No form values are sent to GA4 by this code.
- Analytics consent no longer grants advertising/personalization consent, both on accept and restored consent across all 14 current pages.
- All current HTML references bumped to main.js?v=12.

## Tests
`node --check main.js`, `node tests/conversions.cjs`, `git diff --check` passed. Dependency-free Node VM tests stub DOM, fetch and gtag: blocked storage, empty slider, grant/deny, phone and WhatsApp events, payload sanitization, invalid email/fields, invalid endpoints, unsuccessful response, successful response, denied-consent submission, duplicate submission and German form. No external POSTs. Exact diff manually inspected for correctness and sensitive data flows. Browser/mobile rendering, real endpoint delivery and GA4 collection remain unverified.

## Original open issues / next actions

Consent follow-up supersedes item 1: see [CONSENT-REVIEW-2026-11-11.md](CONSENT-REVIEW-2026-11-11.md) for implementation, tests and remaining external gates.
1. HIGH privacy/consent follow-up: existing inline GA loader still loads Google before consent (advanced Consent Mode, not a no-network gate). Existing banner claims anonymous analysis and no sharing with third parties, although Google receives analytics data. All 11 article pages have no consent controls; first-time article visitors cannot opt in there. No accessible consent withdrawal control exists. A coherent consent/privacy UI update across HR/EN/DE is needed before declaring this setup privacy-complete. The supplied anti-slop workflow requires user choice of during/after mode before UI work; this pass limited changes to functional defects and measurement code, leaving layout and new CTA/cookie UI untouched.
2. Parent: verify exact GA4 property/stream ownership, key-event settings for phone_click/whatsapp_click/generate_lead, Enhanced Measurement outbound/form events (possible separate duplicates or full WhatsApp URL capture), and Realtime/DebugView after Marino deploys. No claim of collected conversions can be made from local code tests.
3. Existing delivery landing page already has phone CTA, body contact-form link and sticky WhatsApp. Recommended next content/UI pass: an explicit form/WhatsApp option alongside the concluding phone CTA, and retain delivery as the evergreen homepage route. No new offers, prices, deadlines or Christmas products added. Existing same-day delivery claims require owner confirmation, not extrapolation.
4. Marino owns cPanel deployment. Upload changed current HTML files together with main.js; tests and this audit are developer artifacts, not public pages. Recheck browser consent, phone destination, WhatsApp URL and form behavior after deployment, with explicit authorization before sending a real test inquiry.

Original pass files: main.js; index.html; en/index.html; de/index.html; blog/{aranzmani-i-vijenci-za-sve-svete,cvijece-za-skolu,dostava,rezano,simbolika}.html; en/blog/{cut-flowers-care,delivery,symbolism}.html; de/blog/{blumenlieferung,schnittblumen-pflege,symbolik}.html; tests/conversions.cjs; this report. CSS, sitemap, offers, reviews and Google Business were not changed.
