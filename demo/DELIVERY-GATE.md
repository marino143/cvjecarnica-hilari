# Anti-slop delivery gate

## Hard gate

- R-02 PASS: `rg` potvrđuje da u korisničkom tekstu nema em dash znaka.
- R-03 PASS: Playwright testovi na 390 px potvrđuju da webshop i admin nemaju horizontalni overflow.
- R-17 PASS: nema statistika bez izvora; ogledne cijene su jasno označene kao prezentacijske.
- R-18 PASS: nema izmišljenih recenzija ni identiteta.
- R-23 PASS: koriste se postojeći Hilari logo i fotografije, bez generiranih ljudi ili lažnih asseta.
- R-24 PASS: svaka navigacijska poveznica vodi na postojeću sekciju ili stranicu.
- R-25 PASS: najosjetljivije tekstne boje imaju omjer kontrasta 5.06:1 i 5.73:1 na podlozi.
- R-26 PASS: košarica, filtri, checkout, dijalozi te admin akcije imaju stvarno ponašanje.
- R-27 PASS: webshop i admin imaju loading, empty i error stanje.
- R-28 PASS: nema generičkog FAQ sadržaja.
- R-32 PASS: koriste se semantički elementi, vidljiv `:focus-visible`, nativni dijalozi i testirano zatvaranje tipkom Escape.
- R-33 PASS: funkcionalnost je pisana izravno u izvorne datoteke, bez skripti za tekstualno krpanje CSS-a.
- R-34 PASS: nije isporučen theme toggle ni nedovršena druga tema.
- R-35 PASS: četiri Playwright toka prolaze na lokalnom i objavljenom Netlify URL-u.
- R-36 PASS: nema izmišljenih sigurnosnih, poslovnih ili izvedbenih tvrdnji.
- R-37 PASS: `DESIGN.md` navodi smjer i dials prije izrade.
- R-38 PASS: sav ogledni sadržaj i cijene jasno su označeni kao prezentacijski.

## Purpose gate

- R-01 PASS: prigušena ružičasta koristi se kao postojeći Hilari brand accent, bez gradijenata i glow efekata.
- R-04 PASS: nema generičkog ikon seta; koriste se samo funkcionalni tekstni znakovi za zatvaranje i potvrdu.
- R-06 PASS: Cormorant Garamond nosi toplinu i tradiciju, a Inter čitljivost obrazaca i admina.
- R-07 PASS: nema dekorativnih gridova, točkica ni blueprint podloga.
- R-08 PASS: nema dekorativnih strelica na gumbima.
- R-09 PASS: status dostupnosti je funkcionalna oznaka, ne marketinški badge.
- R-10 PASS: nema glassmorphism efekata.
- R-12 PASS: jača sjena postoji samo na draweru i dijalozima radi stvarne elevacije.
- R-13 PASS: nema glow efekata.
- R-14 PASS: kartice se koriste samo za proizvode koje kupac uspoređuje.
- R-19 PASS: motion je ograničen na hover i prijelaze stanja u skladu s MOTION 1.
- R-22 PASS: koriste se samo postojeće Hilari fotografije.

## Liveliness

- PASS: dials su ENERGY 2 / RHYTHM 2 / MOTION 1.
- PASS: storefront i admin dosljedno slijede navedene dials.
- PASS: naslov s velikom fotografijom je jedan jasan focal point iznad pregiba.
- PASS: whitespace odvaja kupovinu, dostavu i administraciju.
- PASS: prigušena ružičasta je jedini namjerni accent.
- PASS: urednički serif i fotografija preko punog polja čine ponovljivi Hilari motiv.
- PASS: Design Read je zapisan u `DESIGN.md` prije generiranja sučelja.

## Craftsmanship i quality locks

- C-1 PASS: razlozi glavnih odluka zapisani su u `DESIGN.md`.
- C-2 PASS: svi prikazani interaktivni elementi imaju ponašanje.
- C-3 PASS: postoje samo sekcije potrebne za odabir, kupnju, dostavu i upravljanje katalogom.
- C-4 PASS: testirani su desktop, mobilni prikaz, prazna košarica, loading, error i dijalozi.
- C-5 PASS: nema lažnih recenzija, statistika ni poslovnih tvrdnji.
- R-05 PASS: kompozicija prati sadržaj trgovine, bez generičkog feature ili bento predloška.
- R-11 PASS: gumbi, kartice, inputi i dijalozi nisu univerzalno pill-shaped.
- R-15 PASS: CTA tekstovi opisuju konkretnu akciju.
- R-16 PASS: nema zabranjenih marketinških buzzworda.
- R-20 PASS: fotografije, tipografija i paleta proizlaze iz postojećeg Hilari identiteta.
- R-21 PASS: svijetla tema je namjerna zbog postojećeg brenda i reprodukcije fotografija.
- R-29 PASS: koristi se jedna jezgrena brand boja uz neutralne tonove i statusne boje.
- R-30 PASS: dizajn ne imitira drugi poznati proizvod.
- R-31 PASS: boja, raspored, tipografija, razmaci, kartice, slike i motion imaju zapisanu svrhu.

