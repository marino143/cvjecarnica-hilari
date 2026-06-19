// =============================================
// CVJEĆARNICA HILARI — Skripte (redesign 2026)
// =============================================

// ---- I18N STRINGS ----
const I18N = {
  hr: {
    'meta.title': 'Cvjećarnica Hilari – Reci to cvijećem | Dostava cvijeća u Zagrebu',
    'meta.description': 'Cvjećarnica Hilari u Zagrebu – tradicija duga 30 godina. Buketi, aranžmani, flower box i dostava cvijeća. Koledinečka 4, 01/2992-047.',

    'topbar.hours': 'Pon – Sub: 7:00 – 20:00',

    'nav.logo-aria': 'Cvjećarnica Hilari — početna',
    'nav.aria': 'Glavna navigacija',
    'nav.menu-aria': 'Izbornik',
    'nav.flowers': 'O Cvijeću',
    'nav.about': 'O Nama',
    'nav.offer': 'Ponuda',
    'nav.gallery': 'Galerija',
    'nav.reviews': 'Recenzije',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Nazovi',

    'hero.aria': 'Naslovna',
    'hero.eyebrow': 'Cvjećarnica Hilari · Zagreb',
    'hero.line1': 'Reci to',
    'hero.line2': 'cvijećem',
    'hero.sub': 'Buketi, aranžmani i flower box — s ljubavlju izrađeni, s pažnjom dostavljeni.',
    'hero.cta1': 'Pogledaj ponudu',
    'hero.cta2': 'Kontaktiraj nas',

    'slider.prev': 'Prethodna slika',
    'slider.next': 'Sljedeća slika',
    'slider.dots': 'Slajdovi',
    'slider.slide1': 'Slajd 1',
    'slider.slide2': 'Slajd 2',
    'slider.slide3': 'Slajd 3',
    'scroll.hint': 'Pomakni dolje',

    'prednosti.pre': 'Prednosti',
    'prednosti.title': 'Po čemu se razlikujemo',
    'prednosti.f1.h': 'Kvaliteta i svježina',
    'prednosti.f1.p': 'Svaku stabljiku biramo sami — samo svježe i pažljivo aranžirano cvijeće.',
    'prednosti.f2.h': 'Dostava u Zagrebu',
    'prednosti.f2.p': 'Brza i sigurna dostava istog dana na području Zagreba i okolice.',
    'prednosti.f3.h': '30 godina tradicije',
    'prednosti.f3.p': 'Tri desetljeća iskustva, stalni klijenti i preporuke — naš najbolji jamac.',

    'blog.pre': 'O cvijeću',
    'blog.title': 'Saznajte više o vašem i našem cvijeću',
    'blog.tag1': 'Simbolika',
    'blog.h1': 'Simbolika cvijeća i boja',
    'blog.p1': 'Svaki cvijet nosi svoju priču i poruku. Saznajte što znače boje i vrste cvijeća kada ih poklanjate voljenoj osobi.',
    'blog.tag2': 'Savjeti',
    'blog.h2': 'Održavanje rezanog cvijeća',
    'blog.p2': 'Naučite kako produžiti vijek trajanja svog rezanog cvijeća i zadržati njegovu svježinu i ljepotu što duže.',
    'blog.tag3': 'Dostava',
    'blog.h3': 'Dostava cvijeća u Zagrebu',
    'blog.p3': 'Narudžba i dostava nikad nije bila jednostavnija. Saznajte kako funkcionira naša usluga dostave u Zagrebu i okolici.',
    'blog.read-more': 'Pročitajte više',

    'about.pre': 'O nama',
    'about.title': 'Cvjećarnica Hilari',
    'about.lead': 'Tradicija duga 30 godina svakako je najbolja preporuka naše cvjećarnice.',
    'about.p1': 'Razlog tome je vrhunski profesionalizam i posebnost naših usluga, jer bez toga ne bismo opstali toliko dugo. Kvalitetu čine kreativnost te spoj tradicije i modernizma u skladu sa svjetskim trendovima.',
    'about.p2': 'Svaki buket, svaki aranžman i svaki flower box izrađujemo s pažnjom — kao da je za nas same. Jer kad vi poklanjate cvijeće, vi poklanjate emocije.',
    'about.stat1': 'godina rada',
    'about.stat2': 'zadovoljnih klijenata',
    'about.stat3': 'prosječna ocjena',
    'about.cta': 'Kontaktirajte nas',
    'about.badge': 'godina<br>tradicije',
    'about.img-alt': 'Unutrašnjost cvjećarnice Hilari',

    'offer.pre': 'Naša ponuda',
    'offer.title': 'Istaknuti proizvodi',
    'offer.tab1': 'Aranžmani',
    'offer.tab2': 'Buketi',
    'offer.tab3': 'Flower Box',
    'offer.tab4': 'Rezano cvijeće',

    'product.cta': 'Pošalji upit',
    'product.a1.h': 'Stolni aranžman',
    'product.a1.p': 'Elegantni stolni aranžman za posebne prilike.',
    'product.a2.h': 'Vjenčani aranžman',
    'product.a2.p': 'Romantični aranžmani prilagođeni vašem vjenčanju.',
    'product.a3.h': 'Pogrebni aranžman',
    'product.a3.p': 'Dostojanstveni aranžmani u znak sjećanja.',
    'product.b1.h': 'Romantični buket',
    'product.b1.p': 'Klasičan buket za izraziti najljepše emocije.',
    'product.b2.h': 'Proljetni buket',
    'product.b2.p': 'Svježe, šareno cvijeće — radost u jednom buketu.',
    'product.b3.h': 'Mješani buket',
    'product.b3.p': 'Bogata kombinacija različitog sezonskog cvijeća.',
    'product.fb1.h': 'Flower Box — ruže',
    'product.fb1.p': 'Luksuzna kutija punjena svježim ružama.',
    'product.fb2.h': 'Flower Box — mješani',
    'product.fb2.p': 'Kombinacija različitog cvijeća u modernoj kutiji.',
    'product.fb3.h': 'Flower Box — luksuzni',
    'product.fb3.p': 'Premium izvedba za nezaboravne poklon prilike.',
    'product.r1.h': 'Ruže rezane',
    'product.r1.p': 'Klasika koja nikad ne izlazi iz mode.',
    'product.r2.h': 'Ljiljani rezani',
    'product.r2.p': 'Elegantni ljiljani s prepoznatljivim mirisom.',
    'product.r3.h': 'Sezonsko cvijeće',
    'product.r3.p': 'Birano cvijeće prema sezoni i raspoloživosti.',

    'gallery.pre': 'Galerija',
    'gallery.cta': 'Pratite nas na Instagramu',

    'reviews.pre': 'Zadovoljni kupci',
    'reviews.title': 'Što drugi kažu o nama',
    'reviews.t1': 'Ljubazno osoblje, svježe cvijeće, pristupačne cijene. Buket naručen preko telefona, dva sata prije događaja. Dovoljno je bilo objasniti kojim povodom i za koga je buket. Posao odlično odrađen. Hvala ekipi.',
    'reviews.t2': 'Cvjećarnica Hilari od sad će mi biti jedini izbor za dostavu cvijeća u okolici Zagreba. Kako živim u inozemstvu, odlučila sam poslati cvijeće prijateljici za rođendan. U istom danu su izvršili dostavu i cvijeće je bilo prekrasno!',
    'reviews.t3': 'Izvrsna cvjećarnica. Narudžba je prošla bez ikakvih problema. Usluga isporuke je bila brza i kvalitetno obavljena, a moja majka je bila presretna s poklonjenim cvijećem.',

    'contact.pre': 'Kontakt',
    'contact.title': 'Javite nam se',
    'contact.address.h': 'Adresa',
    'contact.address.p': 'Koledinečka 4<br>10000 Zagreb, Hrvatska',
    'contact.phone.h': 'Telefon',
    'contact.email.h': 'E-mail',
    'contact.hours.h': 'Radno vrijeme',
    'contact.hours.p': 'Ponedjeljak – Subota: 7:00 – 20:00<br>Nedjelja: na upit',
    'contact.map-title': 'Lokacija cvjećarnice Hilari',

    'form.intro': 'Pošaljite nam upit — javit ćemo se u najkraćem mogućem roku.',
    'form.name': 'Ime i prezime',
    'form.name-ph': 'Vaše ime',
    'form.email': 'E-mail',
    'form.email-ph': 'vas@email.com',
    'form.phone': 'Telefon',
    'form.phone-ph': '09X XXX XXXX',
    'form.occasion': 'Prilika',
    'form.occasion.select': 'Odaberi…',
    'form.occasion.birthday': 'Rođendan',
    'form.occasion.wedding': 'Vjenčanje',
    'form.occasion.anniversary': 'Godišnjica',
    'form.occasion.funeral': 'Pogreb',
    'form.occasion.none': 'Bez posebne prilike',
    'form.occasion.other': 'Ostalo',
    'form.message': 'Upit za proizvod / uslugu',
    'form.message-ph': 'Opišite što trebate — vrsta cvijeća, boje, budžet, datum dostave…',
    'form.submit': 'Pošalji upit',
    'form.submit-loading': 'Šaljem…',
    'form.note': 'Polja označena s * su obavezna. Tvoji podaci se koriste samo za odgovor na upit.',
    'form.success': '✓ Hvala! Tvoj upit je poslan — javit ćemo ti se uskoro.',
    'form.error': '✗ Nešto je pošlo po zlu. Pokušaj ponovo ili nas nazovi.',
    'form.alert': 'Molimo ispunite obavezna polja (Ime i E-mail).',

    'footer.tagline': 'Reci to cvijećem...',
    'footer.about': 'Tradicija duga 30 godina. Buketi, aranžmani i flower box. Dostava u Zagrebu i okolici.',
    'footer.h.pages': 'Stranice',
    'footer.h.contact': 'Kontakt',
    'footer.h.follow': 'Pratite nas',
    'footer.copy': 'Sva prava pridržana',

    'back-to-top.aria': 'Natrag na vrh',
    'sticky.tel': 'Nazovi cvjećarnicu',
    'sticky.wa': 'WhatsApp poruka',
    'lightbox.close': 'Zatvori',
    'lightbox.prev': 'Prethodna',
    'lightbox.next': 'Sljedeća',

    'cookie.text': 'Koristimo Google Analytics kolačiće za anonimnu analizu posjeta. Tvoji podaci se ne dijele s trećima.',
    'cookie.accept': 'Prihvaćam',
    'cookie.decline': 'Odbijam'
  },

  en: {
    'meta.title': 'Hilari Florist – Say it with flowers | Flower delivery in Zagreb',
    'meta.description': 'Hilari Florist in Zagreb – 30 years of tradition. Bouquets, arrangements, flower boxes and flower delivery. Koledinečka 4, +385 1 2992-047.',

    'topbar.hours': 'Mon – Sat: 7:00 – 20:00',

    'nav.logo-aria': 'Hilari Florist — home',
    'nav.aria': 'Main navigation',
    'nav.menu-aria': 'Menu',
    'nav.flowers': 'About Flowers',
    'nav.about': 'About Us',
    'nav.offer': 'Offer',
    'nav.gallery': 'Gallery',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.cta': 'Call us',

    'hero.aria': 'Home',
    'hero.eyebrow': 'Hilari Florist · Zagreb',
    'hero.line1': 'Say it with',
    'hero.line2': 'flowers',
    'hero.sub': 'Bouquets, arrangements and flower boxes — crafted with love, delivered with care.',
    'hero.cta1': 'View our offer',
    'hero.cta2': 'Get in touch',

    'slider.prev': 'Previous slide',
    'slider.next': 'Next slide',
    'slider.dots': 'Slides',
    'slider.slide1': 'Slide 1',
    'slider.slide2': 'Slide 2',
    'slider.slide3': 'Slide 3',
    'scroll.hint': 'Scroll down',

    'prednosti.pre': 'Why us',
    'prednosti.title': 'What sets us apart',
    'prednosti.f1.h': 'Quality & freshness',
    'prednosti.f1.p': 'We hand-pick every stem — only fresh, carefully arranged flowers.',
    'prednosti.f2.h': 'Delivery in Zagreb',
    'prednosti.f2.p': 'Fast and safe same-day delivery across Zagreb and the surrounding area.',
    'prednosti.f3.h': '30 years of tradition',
    'prednosti.f3.p': 'Three decades of experience, loyal clients and recommendations — our best guarantee.',

    'blog.pre': 'About flowers',
    'blog.title': 'Learn more about your flowers and ours',
    'blog.tag1': 'Symbolism',
    'blog.h1': 'The symbolism of flowers and colors',
    'blog.p1': 'Every flower carries its own story and message. Discover what colors and types of flowers mean when you give them to someone you love.',
    'blog.tag2': 'Care tips',
    'blog.h2': 'Caring for cut flowers',
    'blog.p2': 'Learn how to extend the life of your cut flowers and keep them looking fresh and beautiful for as long as possible.',
    'blog.tag3': 'Delivery',
    'blog.h3': 'Flower delivery in Zagreb',
    'blog.p3': 'Ordering and delivery has never been easier. Find out how our delivery service works in Zagreb and the surrounding area.',
    'blog.read-more': 'Read more',

    'about.pre': 'About us',
    'about.title': 'Hilari Florist',
    'about.lead': '30 years of tradition is, without doubt, the best recommendation our shop can offer.',
    'about.p1': 'The reason for this is the top professionalism and unique character of our services — without that, we would not have lasted so long. Our quality comes from creativity and the blend of tradition and modernity in step with global trends.',
    'about.p2': 'We craft every bouquet, every arrangement and every flower box with the same care as if it were for ourselves. Because when you give flowers, you give emotion.',
    'about.stat1': 'years in business',
    'about.stat2': 'happy customers',
    'about.stat3': 'average rating',
    'about.cta': 'Contact us',
    'about.badge': 'years of<br>tradition',
    'about.img-alt': 'Inside Hilari Florist',

    'offer.pre': 'Our offer',
    'offer.title': 'Featured products',
    'offer.tab1': 'Arrangements',
    'offer.tab2': 'Bouquets',
    'offer.tab3': 'Flower Box',
    'offer.tab4': 'Cut flowers',

    'product.cta': 'Send inquiry',
    'product.a1.h': 'Table arrangement',
    'product.a1.p': 'Elegant table arrangement for special occasions.',
    'product.a2.h': 'Wedding arrangement',
    'product.a2.p': 'Romantic arrangements tailored to your wedding.',
    'product.a3.h': 'Funeral arrangement',
    'product.a3.p': 'Dignified arrangements in remembrance.',
    'product.b1.h': 'Romantic bouquet',
    'product.b1.p': 'A classic bouquet to express the most beautiful emotions.',
    'product.b2.h': 'Spring bouquet',
    'product.b2.p': 'Fresh, colorful flowers — joy in a single bouquet.',
    'product.b3.h': 'Mixed bouquet',
    'product.b3.p': 'A rich combination of varied seasonal flowers.',
    'product.fb1.h': 'Flower Box — roses',
    'product.fb1.p': 'A luxurious box filled with fresh roses.',
    'product.fb2.h': 'Flower Box — mixed',
    'product.fb2.p': 'A combination of different flowers in a modern box.',
    'product.fb3.h': 'Flower Box — luxury',
    'product.fb3.p': 'Premium creation for unforgettable gifting moments.',
    'product.r1.h': 'Cut roses',
    'product.r1.p': 'A classic that never goes out of style.',
    'product.r2.h': 'Cut lilies',
    'product.r2.p': 'Elegant lilies with their signature fragrance.',
    'product.r3.h': 'Seasonal flowers',
    'product.r3.p': 'Hand-picked flowers based on the season and availability.',

    'gallery.pre': 'Gallery',
    'gallery.cta': 'Follow us on Instagram',

    'reviews.pre': 'Happy customers',
    'reviews.title': 'What others say about us',
    'reviews.t1': 'Friendly staff, fresh flowers, fair prices. I ordered the bouquet by phone two hours before the event — I just had to explain the occasion and who it was for. The job was done perfectly. Thank you to the team.',
    'reviews.t2': 'Hilari Florist will from now on be my only choice for flower delivery around Zagreb. As I live abroad, I decided to send flowers to a friend for her birthday. They delivered the same day and the flowers were beautiful!',
    'reviews.t3': 'An excellent florist. The order went through without any issues. The delivery was fast and well done, and my mother was overjoyed with the flowers.',

    'contact.pre': 'Contact',
    'contact.title': 'Get in touch',
    'contact.address.h': 'Address',
    'contact.address.p': 'Koledinečka 4<br>10000 Zagreb, Croatia',
    'contact.phone.h': 'Phone',
    'contact.email.h': 'E-mail',
    'contact.hours.h': 'Opening hours',
    'contact.hours.p': 'Monday – Saturday: 7:00 – 20:00<br>Sunday: on request',
    'contact.map-title': 'Hilari Florist location',

    'form.intro': 'Send us an inquiry — we will get back to you as soon as possible.',
    'form.name': 'Full name',
    'form.name-ph': 'Your name',
    'form.email': 'E-mail',
    'form.email-ph': 'you@email.com',
    'form.phone': 'Phone',
    'form.phone-ph': '+385 9X XXX XXXX',
    'form.occasion': 'Occasion',
    'form.occasion.select': 'Select…',
    'form.occasion.birthday': 'Birthday',
    'form.occasion.wedding': 'Wedding',
    'form.occasion.anniversary': 'Anniversary',
    'form.occasion.funeral': 'Funeral',
    'form.occasion.none': 'No special occasion',
    'form.occasion.other': 'Other',
    'form.message': 'Inquiry about a product / service',
    'form.message-ph': 'Describe what you need — type of flowers, colors, budget, delivery date…',
    'form.submit': 'Send inquiry',
    'form.submit-loading': 'Sending…',
    'form.note': 'Fields marked with * are required. Your information is used only to reply to your inquiry.',
    'form.success': '✓ Thank you! Your inquiry has been sent — we\'ll get back to you soon.',
    'form.error': '✗ Something went wrong. Please try again or call us.',
    'form.alert': 'Please fill in the required fields (Name and E-mail).',

    'footer.tagline': 'Say it with flowers...',
    'footer.about': '30 years of tradition. Bouquets, arrangements and flower boxes. Delivery in Zagreb and the surrounding area.',
    'footer.h.pages': 'Pages',
    'footer.h.contact': 'Contact',
    'footer.h.follow': 'Follow us',
    'footer.copy': 'All rights reserved',

    'back-to-top.aria': 'Back to top',
    'sticky.tel': 'Call the florist',
    'sticky.wa': 'WhatsApp message',
    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous',
    'lightbox.next': 'Next',

    'cookie.text': 'We use Google Analytics cookies for anonymous traffic analysis. Your data is not shared with third parties.',
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline'
  }
};

const SUPPORTED_LANGS = ['hr', 'en'];

function detectInitialLang() {
  // URL is authoritative now (HR root vs /en/). Only honor an explicit
  // user preference saved from a previous click — don't auto-swap based on
  // navigator.language, because that would translate the HR URL silently
  // and confuse crawlers and direct visitors.
  const stored = localStorage.getItem('hilari.lang');
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  return null;
}

function applyLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'hr';
  const dict = I18N[lang];

  document.documentElement.lang = lang;

  const ogLocale = document.getElementById('og-locale');
  if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'hr_HR');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = dict[key];
    if (value === undefined) return;
    if (el.tagName === 'TITLE') {
      el.textContent = value;
    } else {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const pairs = el.dataset.i18nAttr.split(',');
    pairs.forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      const value = dict[key];
      if (attr && value !== undefined) el.setAttribute(attr, value);
    });
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });

  localStorage.setItem('hilari.lang', lang);
}

// Apply JS i18n ONLY on pages that opted in via data-i18n attributes (HR pages),
// AND only when the user has explicitly chosen a language via a previous click.
// Statically-rendered /en/ pages have no data-i18n nodes and keep their own
// lang/locale; first-time visitors keep the static HTML's language.
const HAS_JS_I18N = !!document.querySelector('[data-i18n]');
const INITIAL_LANG = detectInitialLang();
if (HAS_JS_I18N && INITIAL_LANG) applyLang(INITIAL_LANG);

document.addEventListener('DOMContentLoaded', () => {

  // ---- LANGUAGE SWITCHER ----
  // Anchor-based switchers handle themselves via href; only wire up <button>
  // elements (legacy HR pages that still toggle JS strings).
  if (HAS_JS_I18N) {
    document.querySelectorAll('button.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  }
  // Persist clicked language on anchor switchers so navigation across
  // HR↔EN URLs remembers the user's choice for any auto-routing later.
  document.querySelectorAll('a.lang-btn').forEach(a => {
    a.addEventListener('click', () => {
      try { localStorage.setItem('hilari.lang', a.dataset.lang); } catch (e) {}
    });
  });

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

  // ---- BACK TO TOP ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleBtt = () => backToTop.classList.toggle('visible', window.scrollY > 600);
    toggleBtt();
    window.addEventListener('scroll', toggleBtt, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const lang  = document.documentElement.lang === 'en' ? 'en' : 'hr';
    const dict  = I18N[lang];

    const ime   = form.querySelector('#ime')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    if (!ime || !email) {
      alert(dict['form.alert']);
      return;
    }

    const action = form.getAttribute('action') || '';
    // Ako nije postavljen Formspree endpoint, prikaži success bez slanja (lokalna verzija).
    const isPlaceholder = action.includes('your-form-id') || !action.startsWith('http');

    const btn = form.querySelector('button[type="submit"]');
    const labelEl = btn?.querySelector('.btn-label');
    const oldLabel = labelEl?.textContent;
    if (btn && labelEl) { btn.disabled = true; labelEl.textContent = dict['form.submit-loading']; }

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
      if (btn && labelEl) {
        btn.disabled = false;
        if (oldLabel) labelEl.textContent = oldLabel;
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

  // ---- COOKIE CONSENT (GA4 Consent Mode v2) ----
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    let consent = null;
    try { consent = localStorage.getItem('hilari.consent'); } catch (e) {}
    if (!consent) cookieBanner.hidden = false;

    const grantConsent = () => {
      try { localStorage.setItem('hilari.consent', 'granted'); } catch (e) {}
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted'
        });
      }
      cookieBanner.hidden = true;
    };

    const denyConsent = () => {
      try { localStorage.setItem('hilari.consent', 'denied'); } catch (e) {}
      cookieBanner.hidden = true;
    };

    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    if (acceptBtn) acceptBtn.addEventListener('click', grantConsent);
    if (declineBtn) declineBtn.addEventListener('click', denyConsent);
  }

});
