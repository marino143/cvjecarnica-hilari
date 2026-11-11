# Independent review, 2026-11-11

Reviewed complete tracked diff plus consent.js, three privacy pages, fonts CSS/source/licenses and tests. Read CONSENT-REVIEW as a report, not proof. No deploy/commit/push, no authenticated browser or account settings changed.

## Findings fixed
1. HIGH measurement regression: stripping all query/referrer and ignore_referrer:true destroyed source/campaign attribution. Removed ignore_referrer; allowlist six UTM keys (single ASCII slug, maximum 80 characters) and gclid/dclid/gbraid/wbraid (single URL-safe token, 10–256 characters). Reject duplicate, malformed and arbitrary parameters, fragments. Referrer is validated HTTP(S) origin only, without credentials, port, path or query; IP, local/internal/test origins rejected. Google Ads storage/user-data/personalization remain denied.
2. MEDIUM lost post-consent interactions during asynchronous tag loading: bounded in-memory queue (20 event names only), flush after config/page_view, discard on withdrawal. Never queue pre-consent interactions.
3. Disclosure alignment: HR/EN/DE privacy copy explicitly explains retained campaign/click IDs and origin; does not promise zero URL parameters.

## Evidence
Real public Google tag fetched without visitor events, 594513 bytes, SHA256 b75fd1bfa6651b4514f72b0ef905052f2a664627773521f88fa28e031dfba2f1. tests/consent-real-tag.cjs runs isolated headless Chromium, routes every browser request locally, blocks service workers, fulfills actual tag bytes locally and fulfills ALL external collection with 204. No production analytics or form submissions. Tag source is /tmp/hilari-actual-gtag.js, not shipped.
Real-runtime test passed (including separate organic visit, reject/reload, duplicate/malformed query rejection and private-IP referrer rejection): no Google before grant; pregrant phone click absent; queued post-grant WhatsApp present; actual page_view/generate_lead transport; UTM/gclid preserved in dl; dr=https://www.google.com/; private URL/referrer/form markers absent from ALL requests; no Google requests after withdrawal despite pagehide/visibility/fetch/beacon/XHR; GA cookies gone; regrant emits a second page view. Actual runtime also emitted /measurement/conversion under region1.google-analytics.com (intercepted); do not claim only /g/collect is used.

Also reran tests/consent-browser.cjs: all 14 current pages and privacy pages passed, no JS errors; conversions.cjs passed; node --check main.js/consent.js/new harness and git diff --check passed. All isolated browsers closed in finally. Result JSON: /tmp/hilari-real-tag-result.json.

## Residual limits / external gates
- Account Enhanced Measurement/Signals/ads settings must be verified by account owner/other reviewer. This review did not inspect them. Dashboard automatic events must remain off; client config flags alone do not establish that.
- No backend attribution/Realtime proof: collection intentionally intercepted. A separately authorized postdeployment smoke test is needed to establish receipt/source reporting. This is transport evidence, not GA reporting evidence.
- UTM validation cannot semantically distinguish a human name/customer ID from a valid campaign slug; campaign operators MUST use non-personal controlled taxonomy. Free-text/spaces/dots/@ are deliberately unsupported. Origin-only referrals sacrifice path detail, not source domain.
- Existing Behold runtime is stubbed and outside this analytics repair. Do not claim zero third-party requests site-wide or legal compliance.
- Privacy owner review, retention/processor/transfer arrangements remain external gates.
- Fonts are original licensed typefaces, but TTF total ~3.3 MB is a LOW performance opportunity; use WOFF2/subsetting in a separate visual-tested change. Deployment must ensure new public asset files are web-readable (local generated files have 0600 permissions; cPanel uploads commonly normalize, but verify).
- No arbitrary custom transport/CSP sandbox proof: guards cover real tested runtime fetch/beacon/XHR plus ga-disable; not a guarantee against future vendor runtime changes. Rerun real-runtime test after tag/config changes.

Review: 4 issues found, 3 fixed, 1 open (LOW font payload performance). External readiness gates above remain.

## Parent integration verification
- GA4 stream 15114840128 / property 542330491 verified: Enhanced Measurement OFF after reopen; standard page views remain; three custom key events preserved. Google Signals OFF. Account ads personalization remains allowed; site consent/controller explicitly denies it, so this is not an account-wide disable claim.
- Parent reran syntax, conversion regression and whitespace checks successfully.
- Found and fixed deployment omission: .cpanel.yml now copies consent.js, fonts/ and root privacy.html alongside existing assets. Destination and other deploy tasks unchanged; test/report files are not copied. Reviewed this exact one-line integration diff.
- Independent review plus integration: 5 issues found, 4 fixed, 1 open (LOW font size). Owner reviews privacy wording; cPanel deployment and production receipt remain separate.
