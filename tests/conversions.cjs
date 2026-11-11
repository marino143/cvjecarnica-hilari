const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../main.js'), 'utf8');
function setup({consent = null, storageBlocked = false, valid = true, action = 'https://formspree.io/f/mlgzvpyz', response = true, lang = 'hr'} = {}) {
  const handlers = {}, events = [], requests = [], intervals = [];
  const element = () => ({ hidden: true, handlers: {}, textContent: 'Send', addEventListener(k, f) { this.handlers[k] = f; }, setAttribute(k) { if (k === 'hidden') this.hidden = true; }, removeAttribute(k) { if (k === 'hidden') this.hidden = false; } });
  const label = element(), button = element(); button.querySelector = () => label;
  const form = element(); let resets = 0;
  form.reportValidity = () => valid; form.getAttribute = () => action; form.reset = () => resets++;
  form.querySelector = s => s === '#ime' ? {value:'Test'} : s === '#email' ? {value:'test@example.invalid'} : button;
  const nodes = {form, 'form-success':element(), 'form-error':element(), 'cookie-banner':element(), 'cookie-accept':element(), 'cookie-decline':element()};
  const window = {location:{href:'https://cvjecarnica-hilari.hr/'}, hilariAnalytics:{track:(name,params)=>{if(consent === 'granted' && !storageBlocked) events.push(['event',name,params]);}}};
  const context = {window, document:{documentElement:{lang}, querySelector:()=>null, querySelectorAll:()=>[], getElementById:id=>nodes[id] || null, addEventListener:(k,f)=>handlers[k]=f}, localStorage:{getItem:()=>{if(storageBlocked) throw Error('blocked'); return consent;}, setItem:(k,v)=>{if(storageBlocked) throw Error('blocked'); consent=v;}}, gtag:(...args)=>events.push(args), setInterval:f=>intervals.push(f), clearInterval:()=>{}, setTimeout:()=>{}, alert:()=>{}, URL, FormData:class {}, fetch:async (...args)=>{requests.push(args); return {ok:response};}};
  vm.runInNewContext(source, context); handlers.DOMContentLoaded();
  return {events,requests,nodes,window,intervals,submit:()=>form.handlers.submit({preventDefault(){}}),resets:()=>resets,click:(href)=>handlers.click({target:{closest:s=>s.includes('tel:') ? (href.startsWith('tel:') ? {getAttribute:()=>href,textContent:'Call'} : null) : {getAttribute:()=>href}}})};
}
(async () => {
  let s = setup({storageBlocked:true}); assert.equal(s.intervals.length,0); s.click('tel:+38512992047'); assert.equal(s.events.length,0);
  // Consent controller lifecycle is exercised separately in consent-browser.cjs.
  s=setup({consent:'granted'}); s.click('tel:+38512992047'); assert.equal(s.events.at(-1)[1],'phone_click');
  s=setup({consent:'granted'}); s.click('https://wa.me/385955309214?text=private-message#secret'); assert.equal(s.events[0][2].link_url,'https://wa.me/385955309214');
  s.click('https://evil.example/?wa.me'); assert.equal(s.events.length,1);
  await s.submit(); assert.equal(s.requests.length,1); assert.equal(s.resets(),1); assert.equal(s.events.at(-1)[1],'generate_lead');
  for (const options of [{valid:false},{action:''},{action:'https://example.com'},{response:false}]) { s=setup({consent:'granted',...options}); await s.submit(); assert.equal(s.resets(),0); assert.equal(s.events.length,0); if(options.response !== false) assert.equal(s.requests.length,0); }
  s=setup({consent:'denied'}); await s.submit(); assert.equal(s.resets(),1); assert.equal(s.events.length,0);
  s=setup({consent:'granted'}); await Promise.all([s.submit(),s.submit()]); assert.equal(s.requests.length,1); assert.equal(s.events.length,1);
  s=setup({lang:'de'}); await s.submit(); assert.equal(s.resets(),1);
  console.log('PASS: offline startup, blocked storage, consent grant/deny, phone/WhatsApp payloads, form validity, endpoint/error handling, consent-gated success, duplicate submissions, German form. No network requests made.');
})().catch(e=>{console.error(e);process.exitCode=1;});
