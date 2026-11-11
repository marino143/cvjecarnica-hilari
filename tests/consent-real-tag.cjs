// Fetch the public tag separately; browser traffic NEVER leaves interception.
// HILARI_TAG_FILE=/tmp/hilari-actual-gtag.js node tests/consent-real-tag.cjs
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('/Users/jarvis/.local/share/mise/installs/node/26.13.0/lib/node_modules/openclaw/node_modules/playwright-core');
const root=path.resolve(__dirname,'..'),tag=fs.readFileSync(process.env.HILARI_TAG_FILE||'/tmp/hilari-actual-gtag.js','utf8');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/jarvis/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const outbound=[],errors=[];let release;const gate=new Promise(r=>release=r);
 const c=await browser.newContext({serviceWorkers:'block'});
 await c.route('**/*',async route=>{const req=route.request(),u=new URL(req.url());
  if(u.origin==='https://hilari.test') {let f=u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname;const file=path.resolve(root,'.'+f);if(!file.startsWith(root+path.sep))return route.abort();if(!fs.existsSync(file))return route.fulfill({status:404,body:''});return route.fulfill({contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream',body:fs.readFileSync(file)});}
  outbound.push({url:req.url(),body:req.postData()||''});
  if(u.hostname==='www.googletagmanager.com'&&u.pathname==='/gtag/js'){await gate;return route.fulfill({contentType:'application/javascript',body:tag});}
  return route.fulfill({status:204,headers:{'access-control-allow-origin':'*'}});
 });
 const google=()=>outbound.filter(x=>!/behold/.test(x.url));
 const hits=()=>google().filter(x=>x.url.includes('/g/collect')).flatMap(x=> (x.body?x.body.split('\n'):['']).map(body=>new URLSearchParams(new URL(x.url).search.slice(1)+'&'+body)));
 try {
 const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto('https://hilari.test/?utm_source=google&utm_medium=cpc&utm_campaign=flowers_winter&gclid=TEST_ClickId123456789&email=PRIVATE_EMAIL&utm_term=user%40example.com#PRIVATE_FRAGMENT',{referer:'https://www.google.com/search?q=PRIVATE_SEARCH'});
 await p.waitForTimeout(300);assert.equal(google().length,0);
 await p.evaluate(()=>hilariAnalytics.track('phone_click'));await p.locator('#cookie-accept').click();
 await p.evaluate(()=>hilariAnalytics.track('whatsapp_click'));release();
 await p.waitForFunction(()=>window.google_tag_manager);await p.waitForTimeout(2500);
 assert(hits().some(h=>h.get('en')==='page_view'),'real page_view');assert(hits().some(h=>h.get('en')==='whatsapp_click'),'post-grant queued click');assert(!hits().some(h=>h.get('en')==='phone_click'),'pregrant click discarded');
 const first=hits().find(h=>h.get('en')==='page_view');assert.equal(first.get('dr'),'https://www.google.com/');assert(first.get('dl').includes('utm_source=google'));assert(first.get('dl').includes('gclid=TEST_ClickId123456789'));assert(!first.get('dl').includes('utm_term'));
 assert(!decodeURIComponent(JSON.stringify(google())).includes('PRIVATE_'),'no private context');
 await p.evaluate(()=>{hilariAnalytics.track('generate_lead',{email:'PRIVATE_FORM'});scrollTo(0,document.body.scrollHeight)});await p.waitForTimeout(1500);
 assert(hits().some(h=>h.get('en')==='generate_lead'));assert(!JSON.stringify(google()).includes('PRIVATE_FORM'));
 await p.locator('#cookie-settings').click();await p.locator('#cookie-decline').click();const count=google().length;
 await p.evaluate(async()=>{hilariAnalytics.track('phone_click');gtag('event','private_event');dispatchEvent(new Event('pagehide'));document.dispatchEvent(new Event('visibilitychange'));await fetch('https://www.google-analytics.com/g/collect');navigator.sendBeacon('https://region1.google-analytics.com/g/collect','late');const x=new XMLHttpRequest();x.open('POST','https://www.google-analytics.com/g/collect');x.send('late');});await p.waitForTimeout(2500);
 assert.equal(google().length,count,'no requests after withdrawal');assert(!(await c.cookies()).some(x=>x.name.startsWith('_ga')));
 await p.locator('#cookie-settings').click();await p.locator('#cookie-accept').click();await p.waitForTimeout(1500);assert.equal(hits().filter(h=>h.get('en')==='page_view').length,2);
 // Independent organic visit, plus malformed values and private referrer origins.
 for (const scenario of [
  {query:'',ref:'https://www.google.com/search?q=PRIVATE_ORGANIC',expected:'https://www.google.com/'},
  {query:'?utm_source=one&utm_source=two&gclid=bad%40email.com&token=PRIVATE_TOKEN',ref:'http://127.0.0.1/private?token=PRIVATE_REF',expected:''}
 ]) {
  await p.evaluate(()=>localStorage.clear());const start=google().length;
  await p.goto('https://hilari.test/'+scenario.query,{referer:scenario.ref});await p.locator('#cookie-decline').click();await p.reload();await p.waitForTimeout(100);assert.equal(google().length,start);await p.goto('https://hilari.test/'+scenario.query,{referer:scenario.ref});
  await p.locator('#cookie-settings').click();await p.locator('#cookie-accept').click();await p.waitForTimeout(1500);
  const h=hits().filter(h=>h.get('en')==='page_view').at(-1);assert.equal(h.get('dr')||'',scenario.expected);assert.equal(h.get('dl'),'https://hilari.test/');
 }
 assert(!decodeURIComponent(JSON.stringify(google())).includes('PRIVATE_'));
 assert.deepEqual(errors,[]);console.log(JSON.stringify({pass:true,tagBytes:Buffer.byteLength(tag),events:hits().map(h=>h.get('en')),requests:google().map(x=>new URL(x.url).origin+new URL(x.url).pathname),pageLocation:first.get('dl'),referrer:first.get('dr'),collection:'ALL intercepted, zero production delivery'},null,2));
 } finally {release();await c.close();await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
