/**
 * Termékkatalógus – állandó, konfigurálható bútorok
 * ----------------------------------------------------------------
 * Ide kerül majd a következő állandó termék is, ha elkészül: csak egy
 * új bejegyzést kell felvenni a PRODUCTS tömbbe, a meglévő "konyhasziget"
 * mintáját követve. A katalógus (index.html) és a konfigurátor motor
 * (configurator.js) automatikusan felveszi az új terméket is.
 */

window.PRODUCTS = [
  {
    id: 'konyhasziget',
    status: 'live', // 'live' | 'soon'
    name: 'Konyhasziget kihúzható asztallal',
    shortName: 'Konyhasziget',
    tagline: 'Egy bútor, ami asztallá nő, amikor szükség van rá.',
    description:
      'Kompakt konyhasziget tárolóval és munkafelülettel, amelynek oldalából egy kerek záródású asztallap húzható ki – ' +
      'a kihúzott végét egy elegáns, gyűrűzött hengeres láb támasztja alá. Csukva munkapult és tárolószekrény, ' +
      'kihúzva teljes értékű étkezőasztal két-négy főre.',
    url: 'termekek/konyhasziget.html',
    heroImage: 'assets/img/konyhasziget/konyhasziget-2.jpg',
    cardImage: 'assets/img/konyhasziget/konyhasziget-2-thumb.jpg',
    gallery: [
      {
        type: 'video',
        src: 'assets/img/konyhasziget/konyhasziget-video-2.mov',
        poster: 'assets/img/konyhasziget/konyhasziget-2-thumb.jpg',
        label: 'Videó – a kihúzható asztal működés közben'
      },
      {
        type: 'image',
        src: 'assets/img/konyhasziget/konyhasziget-2.jpg',
        label: 'Elkészült konyhasziget – kihúzott asztallal'
      },
      {
        type: 'video',
        src: 'assets/img/konyhasziget/konyhasziget-video-1.mov',
        poster: 'assets/img/konyhasziget/konyhasziget-1-thumb.jpg',
        label: 'Videó – másik nézet'
      },
      {
        type: 'image',
        src: 'assets/img/konyhasziget/konyhasziget-1.jpg',
        label: 'Elkészült konyhasziget – másik nézetből'
      }
    ],
    sizes: [
      {
        id: 's160',
        label: '160 cm',
        detail: 'sziget hossza zárva · +60 cm kihúzva'
      },
      {
        id: 's180',
        label: '180 cm',
        detail: 'sziget hossza zárva · +70 cm kihúzva',
        isDefault: true
      },
      {
        id: 's200',
        label: '200 cm',
        detail: 'sziget hossza zárva · +80 cm kihúzva'
      },
      {
        id: 'custom',
        label: 'Egyéni méret',
        detail: 'a konyhád pontos méreteire szabva'
      }
    ],
    parts: [
      {
        id: 'munkalap',
        label: 'Munkalap',
        hint: 'A sziget munkafelülete – kő- és különleges hatású EGGER dekorok.',
        defaultCode: 'F812_9',
        options: ['F812_9', 'F8001_9', 'F637_10', 'F186_9', 'F205_9', 'F206_9', 'H3303_10', 'W1000_9']
      },
      {
        id: 'asztallap',
        label: 'Asztallap',
        hint: 'A kihúzható asztal felülete. Alapból a munkalapéval egyezik, de bármelyik dekorra módosítható.',
        defaultCode: 'F812_9',
        options: ['F812_9', 'F8001_9', 'F637_10', 'F186_9', 'F205_9', 'F206_9', 'H3303_10', 'W1000_9']
      },
      {
        id: 'butor',
        label: 'Bútor színe',
        hint: 'A sziget testének (front és oldal) színe.',
        defaultCode: 'W1000_9',
        options: ['W1000_9', 'U104_9', 'U211_9', 'U222_9', 'U702_9', 'U708_9', 'U763_9', 'U999_76', 'H1176_37', 'H3303_10']
      },
      {
        id: 'hengerlab',
        label: 'Hengeres láb',
        hint: 'A kihúzott asztal végét alátámasztó gyűrűzött henger.',
        defaultCode: 'U211_9',
        options: ['U211_9', 'H3170_9', 'H1399_10', 'H3325_28', 'H3734_9', 'U999_76', 'W1000_9']
      }
    ]
  },

  // Helykitartó kártya a következő állandó termékhez – ha elkészül, cseréld
  // ki egy teljes ('status: live') bejegyzésre a "konyhasziget" mintáját követve.
  {
    id: 'kovetkezo',
    status: 'soon',
    shortName: 'Következő termékünk',
    tagline: 'Dolgozunk a kínálat következő darabján – hamarosan érkezik.'
  }
];

window.getProduct = function (id) {
  return window.PRODUCTS.find(function (p) { return p.id === id; });
};
