// =============================================
// CVJEĆARNICA HILARI — Skripte (redesign 2026)
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- HERO SLIDER ----
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  const nextSlide = () => goTo(current + 1);
  const prevSlide = () => goTo(current - 1);
  function startAuto() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  }

  document.getElementById('next')?.addEventListener('click', () => { nextSlide(); startAuto(); });
  document.getElementById('prev')?.addEventListener('click', () => { prevSlide(); startAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

  // Touch swipe na hero
  const hero = document.querySelector('.hero');
  if (hero) {
    let startX = 0;
    hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { dx > 0 ? prevSlide() : nextSlide(); startAuto(); }
    }, { passive: true });
  }

  startAuto();

  // ---- HEADER SCROLL ----
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navEl = document.getElementById('nav');
  if (hamburger && navEl) {
    hamburger.addEventListener('click', () => {
      const open = navEl.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navEl.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navEl.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ---- TABS (Ponuda) ----
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // ---- LIGHTBOX (galerija) ----
  const lbItems = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbPrev  = document.getElementById('lb-prev');
  const lbNext  = document.getElementById('lb-next');
  let lbIdx = 0;

  function openLb(idx) {
    lbIdx = idx;
    lbImg.src = lbItems[lbIdx].getAttribute('href');
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  function moveLb(delta) {
    lbIdx = (lbIdx + delta + lbItems.length) % lbItems.length;
    lbImg.src = lbItems[lbIdx].getAttribute('href');
  }

  lbItems.forEach((item, i) => {
    item.addEventListener('click', (e) => { e.preventDefault(); openLb(i); });
  });
  lbClose?.addEventListener('click', closeLb);
  lbPrev?.addEventListener('click', () => moveLb(-1));
  lbNext?.addEventListener('click', () => moveLb(1));
  lb?.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (lb?.hidden) return;
    if (e.key === 'Escape')    closeLb();
    if (e.key === 'ArrowLeft') moveLb(-1);
    if (e.key === 'ArrowRight') moveLb(1);
  });

  // Touch swipe u lightboxu
  if (lb) {
    let sx = 0;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) moveLb(dx > 0 ? -1 : 1);
    }, { passive: true });
  }

  // ---- CONTACT FORM (Formspree-compatible) ----
  const form     = document.getElementById('form');
  const okBox    = document.getElementById('form-success');
  const errBox   = document.getElementById('form-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    okBox?.setAttribute('hidden', '');
    errBox?.setAttribute('hidden', '');

    const ime   = form.querySelector('#ime')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    if (!ime || !email) {
      alert('Molimo ispunite obavezna polja (Ime i E-mail).');
      return;
    }

    const action = form.getAttribute('action') || '';
    // Ako nije postavljen Formspree endpoint, prikaži success bez slanja (lokalna verzija).
    const isPlaceholder = action.includes('your-form-id') || !action.startsWith('http');

    const btn = form.querySelector('button[type="submit"]');
    const oldLabel = btn?.querySelector('.btn-label')?.textContent;
    if (btn) { btn.disabled = true; btn.querySelector('.btn-label').textContent = 'Šaljem…'; }

    try {
      if (!isPlaceholder) {
        const data = new FormData(form);
        const res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error('Form error');
      }
      form.reset();
      okBox?.removeAttribute('hidden');
      setTimeout(() => okBox?.setAttribute('hidden', ''), 6000);
    } catch (err) {
      errBox?.removeAttribute('hidden');
      setTimeout(() => errBox?.setAttribute('hidden', ''), 6000);
    } finally {
      if (btn) {
        btn.disabled = false;
        if (oldLabel) btn.querySelector('.btn-label').textContent = oldLabel;
      }
    }
  });

  // ---- ACTIVE NAV LINK ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav a');
  if ('IntersectionObserver' in window && sections.length) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active-link'));
          const link = document.querySelector(`#nav a[href="#${e.target.id}"]`);
          link?.classList.add('active-link');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navObs.observe(s));
  }

  // ---- FOOTER YEAR ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
