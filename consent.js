/* Basic consent mode: Google is not contacted until an affirmative choice. */
(() => {
  'use strict';
  const ID = 'G-8H40XGVSZZ';
  // Re-ask legacy grants made against the old, inaccurate disclosure.
  const KEY = 'hilari.analytics.v2';
  const lang = document.documentElement.lang;
  const words = {
    hr: ['Postavke privatnosti', 'Analitika posjeta', 'Uz tvoju privolu Google Analytics prima podatke o uređaju, posjećenim stranicama i klikovima za kontakt. Odbijanje ne utječe na korištenje stranice.', 'Prihvaćam analitiku', 'Odbijam / povlačim privolu', 'Privatnost', 'Zatvori', 'Odabir se ne može spremiti. Analitika ostaje isključena.', 'Analitika je uključena.', 'Analitika je isključena.'],
    en: ['Privacy settings', 'Visitor analytics', 'With your consent, Google Analytics receives device data, pages visited and contact clicks. Rejecting does not affect use of this website.', 'Accept analytics', 'Reject / withdraw consent', 'Privacy', 'Close', 'Your choice could not be saved. Analytics remains off.', 'Analytics is on.', 'Analytics is off.'],
    de: ['Datenschutzeinstellungen', 'Besuchsanalyse', 'Mit Ihrer Einwilligung erhält Google Analytics Geräteinformationen, besuchte Seiten und Kontaktklicks. Eine Ablehnung beeinträchtigt die Nutzung dieser Website nicht.', 'Analyse erlauben', 'Ablehnen / Einwilligung widerrufen', 'Datenschutz', 'Schließen', 'Ihre Auswahl konnte nicht gespeichert werden. Die Analyse bleibt aus.', 'Die Analyse ist aktiviert.', 'Die Analyse ist deaktiviert.']
  }[lang] || null;
  const t = words || ['Postavke privatnosti', 'Analitika posjeta', 'Google Analytics uključujemo samo uz privolu.', 'Prihvaćam analitiku', 'Odbijam / povlačim privolu', 'Privatnost', 'Zatvori', 'Odabir nije spremljen. Analitika je isključena.', 'Analitika je uključena.', 'Analitika je isključena.'];
  let allowed = false, loaded = false, loading = false, configured = false;
  function stored() { try { return localStorage.getItem(KEY); } catch (_) { return null; } }
  function permitted() { return allowed && stored() === 'granted'; }
  window['ga-disable-' + ID] = true;
  window.dataLayer = window.dataLayer || [];
  function command() { window.dataLayer.push(arguments); }
  const deniedAds = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  command('consent', 'default', { ...deniedAds, analytics_storage: 'denied' });
  // Only our allowlisted events enter the queue; arbitrary caller/form values do not.
  window.gtag = function () {};
  // Only non-personal campaign slugs are supported. Never use customer identifiers.
  function pageParams() {
    const url = new URL(location.origin + location.pathname);
    const query = new URLSearchParams(location.search);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_content', 'utm_term']) {
      const values = query.getAll(key);
      if (values.length === 1 && /^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(values[0])) url.searchParams.set(key, values[0]);
    }
    for (const key of ['gclid', 'dclid', 'gbraid', 'wbraid']) {
      const values = query.getAll(key);
      if (values.length === 1 && /^[a-zA-Z0-9_-]{10,256}$/.test(values[0])) url.searchParams.set(key, values[0]);
    }
    let referrer = '';
    try {
      const ref = new URL(document.referrer);
      // Public HTTP(S) origin only, never credentials, path or query.
      if (['https:', 'http:'].includes(ref.protocol) && !ref.username && !ref.password &&
          !ref.port && /^(?:[a-z0-9-]+\.)+[a-z]{2,63}$/i.test(ref.hostname) &&
          !/(?:^|\.)(?:localhost|local|internal|test|invalid)$/i.test(ref.hostname)) referrer = ref.origin + '/';
    } catch (_) {}
    return { page_location: url.href, page_referrer: referrer, page_title: document.title };
  }
  const pending = [];
  const eventNames = ['phone_click', 'whatsapp_click', 'generate_lead', 'page_view'];
  function send(name) {
    if (!permitted() || !eventNames.includes(name)) return;
    // Queue only post-grant interactions while the tag downloads; discard on withdrawal.
    if (!configured) { if (name !== 'page_view' && pending.length < 20) pending.push(name); return; }
    const safe = pageParams();
    if (name === 'phone_click') safe.method = 'telephone';
    else if (name === 'whatsapp_click') safe.method = 'whatsapp';
    else if (name === 'generate_lead') safe.method = 'kontakt_forma';
    else if (name !== 'page_view') return;
    command('event', name, safe);
  }
  window.hilariAnalytics = { track: send, permitted };
  // Guard late/buffered GA transports after withdrawal. Unrelated traffic is untouched.
  function googleDestination(value) {
    try {
      const host = new URL(typeof value === 'string' || value instanceof URL ? value : value.url, location.href).hostname;
      return ['google-analytics.com', 'analytics.google.com', 'googletagmanager.com', 'doubleclick.net', 'googleadservices.com'].some(h => host === h || host.endsWith('.' + h));
    } catch (_) { return false; }
  }
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    if (googleDestination(input) && !permitted()) return Promise.resolve(new Response(null, { status: 204 }));
    return originalFetch.call(this, input, init);
  };
  const originalBeacon = navigator.sendBeacon;
  if (originalBeacon) navigator.sendBeacon = function (url, data) {
    return googleDestination(url) && !permitted() ? false : originalBeacon.call(this, url, data);
  };
  const originalOpen = XMLHttpRequest.prototype.open, originalSend = XMLHttpRequest.prototype.send;
  const destinations = new WeakMap();
  XMLHttpRequest.prototype.open = function (method, url, ...args) { destinations.set(this, url); return originalOpen.call(this, method, url, ...args); };
  XMLHttpRequest.prototype.send = function (body) { if (googleDestination(destinations.get(this)) && !permitted()) { this.abort(); return; } return originalSend.call(this, body); };
  function clearCookies() {
    const domains = location.hostname.split('.');
    const scopes = [''];
    for (let i = 0; i < domains.length - 1; i++) scopes.push(domains.slice(i).join('.'), '.' + domains.slice(i).join('.'));
    document.cookie.split(';').forEach(pair => {
      const name = pair.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) return;
      scopes.forEach(domain => { document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : ''); });
    });
  }
  function activate() {
    if (!permitted()) return;
    window['ga-disable-' + ID] = false;
    command('consent', 'update', { ...deniedAds, analytics_storage: 'granted' });
    if (!configured) {
      command('js', new Date());
      command('config', ID, { ...pageParams(), send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 60 * 60 * 24 * 365, cookie_update: false,
        // Dashboard Enhanced Measurement must ALSO be disabled before deployment.
        enhanced_measurement: false, form_interactions: false, link_clicks: false, scrolls: false, page_changes: false, file_downloads: false, video_engagement: false, site_search: false });
      configured = true;
    }
    send('page_view');
    pending.splice(0).forEach(send);
  }
  function apply(grant) {
    const changed = allowed !== grant;
    allowed = grant;
    window['ga-disable-' + ID] = !grant;
    if (!grant) {
      pending.length = 0;
      // Remove unsent events, including ones queued while the tag was loading.
      for (let i = window.dataLayer.length - 1; i >= 0; i--) if (window.dataLayer[i]?.[0] === 'event') window.dataLayer.splice(i, 1);
      command('consent', 'update', { ...deniedAds, analytics_storage: 'denied' });
      clearCookies();
      return;
    }
    if (loaded) { if (changed) activate(); return; }
    if (loading) return;
    loading = true;
    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    script.onload = () => { loading = false; loaded = true; activate(); };
    script.onerror = () => { loading = false; script.remove(); };
    document.head.append(script);
  }
  const panel = document.createElement('section');
  panel.className = 'cookie-banner'; panel.id = 'cookie-banner'; panel.hidden = true;
  panel.setAttribute('aria-labelledby', 'cookie-title');
  panel.innerHTML = '<h2 id="cookie-title"></h2><p class="cookie-text"></p><p id="cookie-status" role="status"></p><div class="cookie-actions"><button type="button" class="cookie-btn" id="cookie-accept"></button><button type="button" class="cookie-btn" id="cookie-decline"></button></div><div class="cookie-links"><a id="cookie-privacy"></a><button type="button" id="cookie-close"></button></div>';
  const settings = document.createElement('button');
  settings.type = 'button'; settings.id = 'cookie-settings'; settings.textContent = t[0];
  settings.setAttribute('aria-controls', panel.id); settings.setAttribute('aria-expanded', 'false');
  document.body.append(settings, panel);
  panel.querySelector('h2').textContent = t[1];
  panel.querySelector('.cookie-text').textContent = t[2];
  const accept = panel.querySelector('#cookie-accept'), reject = panel.querySelector('#cookie-decline'), close = panel.querySelector('#cookie-close'), status = panel.querySelector('#cookie-status');
  accept.textContent = t[3]; reject.textContent = t[4]; close.textContent = t[6];
  const privacy = panel.querySelector('#cookie-privacy');
  privacy.textContent = t[5]; privacy.href = (lang === 'en' ? '/en/' : lang === 'de' ? '/de/' : '/') + 'privacy.html';
  function show(open, focus = false) { panel.hidden = !open; settings.setAttribute('aria-expanded', String(open)); if (focus) (open ? accept : settings).focus(); }
  function choose(value) {
    let saved = false;
    // Fail closed even if storage becomes inaccessible after an earlier grant.
    if (value === 'denied') apply(false);
    try { localStorage.setItem(KEY, value); saved = stored() === value; } catch (_) {}
    apply(saved && value === 'granted');
    status.textContent = saved ? (permitted() ? t[8] : t[9]) : t[7];
    if (saved) show(false, true);
  }
  accept.addEventListener('click', () => choose('granted'));
  reject.addEventListener('click', () => choose('denied'));
  settings.addEventListener('click', () => { status.textContent = permitted() ? t[8] : t[9]; show(true, true); });
  close.addEventListener('click', () => show(false, true));
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') show(false, true); });
  function sync() { apply(stored() === 'granted'); status.textContent = permitted() ? t[8] : t[9]; }
  window.addEventListener('storage', e => { if (e.key === KEY || e.key === null) sync(); });
  window.addEventListener('pageshow', sync);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) sync(); });
  sync();
  if (!['granted', 'denied'].includes(stored())) show(true);
})();
