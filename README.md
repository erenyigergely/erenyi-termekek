# Erényi Bútor – Állandó termékek (weboldal)

Ez a mappa egy önálló, egyszerű (build nélküli) weboldal az **állandó, konfigurálható
termékek** vonalhoz, az erenyibutor.hu stílusához illesztve. Első termék: **Konyhasziget
kihúzható asztallal**.

Nincs szükség szerverre, build eszközre vagy telepítésre – tisztán HTML/CSS/JS fájlokból
áll, bármilyen egyszerű webtárhelyre feltölthető.

## Mappaszerkezet

```
erenyi-termekek/
├── index.html                     ← főoldal / termékkatalógus
├── termekek/
│   └── konyhasziget.html          ← termékoldal + konfigurátor
├── assets/
│   ├── css/style.css              ← közös design (színek, gombok, rácsok)
│   ├── js/
│   │   ├── layout.js              ← közös fejléc/lábjegyzet minden oldalon
│   │   ├── main.js                ← főoldal: termékrács kirajzolása
│   │   ├── configurator.js        ← a konfigurátor működése
│   │   └── data/
│   │       ├── products.js        ← termékkatalógus (itt jön a KÖVETKEZŐ termék is)
│   │       └── egger-decors.js    ← EGGER dekor-válogatás (kód, név, kép)
│   └── img/
│       ├── brand/
│       ├── konyhasziget/          ← a valós fényképek és videók
│       └── egger/                 ← EGGER mintaképek
├── serve.ps1                      ← egyszerű helyi előnézet-szerver (lásd lent)
└── README.md
```

## Helyi megtekintés

Az `index.html` simán dupla kattintással is megnyitható böngészőben, de a videók
lejátszásához (és a böngésző gyorsítótár-viselkedése miatt) jobb egy kis helyi szervert
futtatni. PowerShellben, ebből a mappából:

```powershell
./serve.ps1
```

majd nyisd meg: `http://localhost:8421/`

## Éles feltöltés

Az egész `erenyi-termekek` mappa tartalma (a `serve.ps1` és ez a README kivételével)
feltölthető bármilyen webtárhelyre. Két jó lehetőség:

- **Aldomain**: `termekek.erenyibutor.hu` → ez a mappa gyökere
- **Almappa**: `erenyibutor.hu/termekek/` → ez a mappa tartalma az almappába

Mindkét esetben a linkek/útvonalak relatívak, működnek külön domainen és almappában is.

## Hogyan kéri az ügyfél az árajánlatot?

A "Árajánlatot kérek" gomb egy **mailto: linket** nyit meg, előre kitöltve a kiválasztott
színekkel, mérettel és az ügyfél által (nem kötelezően) megadott névvel/telefonnal/e-maillel
– a levél az **info@erenyibutor.hu** címre megy. Ha az ügyfél böngészőjében/gépén nincs
beállítva e-mail kliens, a "Konfiguráció másolása vágólapra" gomb mindig működik
alternatívaként.

**Ha valódi űrlap-beküldést szeretnél** (pl. egy admin felületen vagy táblázatban
gyűjtve, mailto nélkül): ezt egy ingyenes űrlap-szolgáltatással (pl. Formspree, Web3Forms)
lehet a legegyszerűbben megoldani – ehhez egy saját fiók + endpoint URL kell, amit aztán
a `configurator.js` `updateQuoteLinks()` függvényébe illesztünk be egy sima `fetch()`
hívással. Szólj, ha ezt szeretnéd, és bekötjük.

## Új termék felvétele a katalógusba

1. Nyisd meg `assets/js/data/products.js`-t, és illessz be egy új objektumot a
   `PRODUCTS` tömbbe, a meglévő `konyhasziget` mintáját követve (`status: 'live'`,
   képek, méretek, `parts` tömb a 4 (vagy több/kevesebb) színezhető elemmel).
2. Hozz létre egy `termekek/uj-termek.html`-t a `konyhasziget.html` másolataként –
   csak a szöveges tartalmat és a `PRODUCT_ID` értékét kell módosítani
   `configurator.js`-ben (vagy másolatot készíteni belőle), ha más a részek elnevezése.
3. Rajzolj egy hasonló SVG-illusztrációt a konfigurátorhoz (a meglévő `<pattern>`
   blokkok mintájára), vagy szólj, és elkészítjük.
4. A főoldal termékrácsa automatikusan megjeleníti az új terméket – nincs HTML-szerkesztés.

A `kovetkezo` (`status: 'soon'`) bejegyzés egy helykitartó kártya – ha elkészül a következő
termék, ezt cseréld ki egy teljes, `status: 'live'` bejegyzésre.

## Új EGGER dekor felvétele

A jelenlegi 20 dekor egy **kézzel válogatott szűkítés** a teljes EGGER kínálatból (több száz
dekor van), a https://www.egger.com/hu/butor-es-belsoepiteszet/ oldalról ellenőrzött, valódi
nevekkel és mintaképekkel.

Új dekor felvételéhez:
1. Keresd meg a dekort a fenti EGGER oldalon, jegyezd fel a kódját (pl. `H3304_10`).
2. Töltsd le a mintaképét (a dekor adatlapján a "Decor" fülön lévő közeli kép), majd
   mentsd el `assets/img/egger/<KÓD>.jpg` néven (~900px széles, jó minőségű JPEG).
3. Vegyél fel egy új bejegyzést `assets/js/data/egger-decors.js`-ben (kód, név, családtag,
   kép útvonala).
4. A `products.js`-ben az adott alkatrész (`munkalap`, `butor`, stb.) `options` tömbjébe
   illeszd be a kódot.

**Fontos**: a képernyőn látott szín sosem 100%-osan pontos – ezt a konfigurátor oldal is
jelzi az ügyfélnek (lásd a GYIK blokkot).

## A videókról

A két eredeti videó (`konyhasziget-video-1.mov`, `konyhasziget-video-2.mov`) változatlan
minőségben került be, ezért egyenként 30–40 MB. Mai böngészőkben (Chrome, Edge, Firefox,
Safari) jól lejátszhatók (a kódolásuk H.264/AAC, ez univerzálisan támogatott), de lassú
mobilneten hosszabb a betöltésük. Ha szeretnéd, össze tudjuk tömöríteni (pl. ~5-10 MB-ra)
egy videószerkesztő (Clipchamp, HandBrake) vagy az `ffmpeg` eszközzel – ez a gépen jelenleg
nem volt elérhető, ezért most az eredeti fájlméret került be.

## Stílus / márka

A színek és a betűtípus (Open Sans + Oxygen) az erenyibutor.hu oldal valós CSS-éből lettek
kiolvasva: krém háttér `#e7dacf`, sötét palaszürke szöveg `#404751`, kék elsődleges szín
`#3b6f97`, terrakotta kiemelés `#e0732b`/`#be642f`. A fejléc logója az eredeti hatszögletű
"fiókos" szimbólum újraépített, vektoros (SVG) változata, hogy minden méretben éles maradjon.
