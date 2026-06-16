/**
 * EGGER dekor adatbázis
 * ----------------------------------------------------------------
 * Valódi, az EGGER hivatalos magyar oldaláról (egger.com/hu) ellenőrzött
 * dekornevek és -kódok, a hozzájuk tartozó közeli mintaképpel.
 *
 * FONTOS a kollégáknak / az ügyfélnek:
 * Ez egy SZŰKÍTETT, kézzel válogatott válogatás a teljes EGGER kínálatból
 * (több száz dekor létezik). A mintaképek a valós EGGER fotók, de a
 * képernyőn látott szín sosem 100%-osan egyezik a fizikai lappal –
 * végső szín-megerősítés mindig a fizikai EGGER mintán / az árajánlat
 * során történjen. Forrás és teljes választék:
 * https://www.egger.com/hu/butor-es-belsoepiteszet/?country=HU
 *
 * Új dekor felvétele: másolj egy új objektumot a listába, illeszd be
 * a kódot (pl. "H3304_10"), nevet és egy ~900px széles mintaképet
 * tegyél az assets/img/egger/ mappába ugyanolyan fájlnévvel, mint a
 * "code" mező (pl. H3304_10.jpg). Utána a products.js-ben bármelyik
 * alkatrész opciói közé felveheted a kódot.
 */

window.EGGER_DECORS = [
  // ---- Egyszínű (uni) dekorok ----
  {
    code: 'W1000_9',
    label: 'Prémium Fehér',
    fullName: 'W1000 ST9 Prémium Fehér',
    family: 'uni',
    hex: '#FAFBF3',
    image: 'assets/img/egger/W1000_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/W1000_9'
  },
  {
    code: 'U104_9',
    label: 'Alabástrom Fehér',
    fullName: 'U104 ST9 Alabástrom Fehér',
    family: 'uni',
    hex: '#FDF7E1',
    image: 'assets/img/egger/U104_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/U104_9'
  },
  {
    code: 'U211_9',
    label: 'Mandula bézs',
    fullName: 'U211 ST9 Mandula bézs',
    family: 'uni',
    hex: '#B29C8F',
    image: 'assets/img/egger/U211_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/U211_9'
  },
  {
    code: 'U222_9',
    label: 'Krém Bézs',
    fullName: 'U222 ST9 Krém Bézs',
    family: 'uni',
    hex: '#FDF2DC',
    image: 'assets/img/egger/U222_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/U222_9'
  },
  {
    code: 'U702_9',
    label: 'Kasmír Szürke',
    fullName: 'U702 ST9 Kasmír Szürke',
    family: 'uni',
    hex: '#D5C7BA',
    image: 'assets/img/egger/U702_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/U702_9'
  },
  {
    code: 'U708_9',
    label: 'Világos Szürke',
    fullName: 'U708 ST9 Világos Szürke',
    family: 'uni',
    hex: '#CFCCC3',
    image: 'assets/img/egger/U708_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/U708_9'
  },
  {
    code: 'U763_9',
    label: 'Gyöngy Szürke',
    fullName: 'U763 ST9 Gyöngy Szürke',
    family: 'uni',
    hex: '#BFBCB7',
    image: 'assets/img/egger/U763_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/U763_9'
  },
  {
    code: 'U999_76',
    label: 'Fekete',
    fullName: 'U999 ST76 Fekete',
    family: 'uni',
    hex: '#0A0A0A',
    image: 'assets/img/egger/U999_76.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/U999_76'
  },

  // ---- Fa dekorok ----
  {
    code: 'H1176_37',
    label: 'Halifax Fehér Tölgy',
    fullName: 'H1176 ST37 Halifax Fehér Tölgy',
    family: 'wood',
    hex: '#CBB9A2',
    image: 'assets/img/egger/H1176_37.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/H1176_37'
  },
  {
    code: 'H3303_10',
    label: 'Natúr Hamilton Tölgy',
    fullName: 'H3303 ST10 Natúr Hamilton Tölgy',
    family: 'wood',
    hex: '#BC9B6F',
    image: 'assets/img/egger/H3303_10.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/H3303_10'
  },
  {
    code: 'H3170_9',
    label: 'Natúr Kendal Tölgy',
    fullName: 'H3170 ST9 Natúr Kendal Tölgy',
    family: 'wood',
    hex: '#BEA180',
    image: 'assets/img/egger/H3170_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/H3170_9'
  },
  {
    code: 'H1399_10',
    label: 'Trüffel Barna Denver Tölgy',
    fullName: 'H1399 ST10 Trüffel Barna Denver Tölgy',
    family: 'wood',
    hex: '#8F7C69',
    image: 'assets/img/egger/H1399_10.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/H1399_10'
  },
  {
    code: 'H3325_28',
    label: 'Gladstone Dohány Tölgy',
    fullName: 'H3325 ST28 Gladstone Dohány Tölgy',
    family: 'wood',
    hex: '#5D4E43',
    image: 'assets/img/egger/H3325_28.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/H3325_28'
  },
  {
    code: 'H3734_9',
    label: 'Natúr Dijon Dió',
    fullName: 'H3734 ST9 Natúr Dijon Dió',
    family: 'wood',
    hex: '#8B613D',
    image: 'assets/img/egger/H3734_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/H3734_9'
  },

  // ---- Kő- és különleges hatású dekorok (munkalaphoz / asztallaphoz) ----
  {
    code: 'F812_9',
    label: 'Fehér Levanto Márvány',
    fullName: 'F812 ST9 Fehér Levanto Márvány',
    family: 'stone',
    hex: '#E8E7E0',
    image: 'assets/img/egger/F812_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/F812_9'
  },
  {
    code: 'F8001_9',
    label: 'Solid Márvány Kristály',
    fullName: 'F8001 ST9 Solid Márvány Kristály',
    family: 'stone',
    hex: '#E8E4DD',
    image: 'assets/img/egger/F8001_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/F8001_9'
  },
  {
    code: 'F637_10',
    label: 'Chromix Fehér',
    fullName: 'F637 ST10 Chromix Fehér',
    family: 'stone',
    hex: '#E1D9C9',
    image: 'assets/img/egger/F637_10.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/F637_10'
  },
  {
    code: 'F186_9',
    label: 'Világosszürke Chicago Beton',
    fullName: 'F186 ST9 Világosszürke Chicago beton',
    family: 'stone',
    hex: '#94908D',
    image: 'assets/img/egger/F186_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/F186_9'
  },
  {
    code: 'F205_9',
    label: 'Antracit Pietra Grigia',
    fullName: 'F205 ST9 Antracit Pietra Grigia',
    family: 'stone',
    hex: '#61594F',
    image: 'assets/img/egger/F205_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/F205_9'
  },
  {
    code: 'F206_9',
    label: 'Fekete Pietra Grigia',
    fullName: 'F206 ST9 Fekete Pietra Grigia',
    family: 'stone',
    hex: '#292826',
    image: 'assets/img/egger/F206_9.jpg',
    url: 'https://www.egger.com/hu/butor-es-belsoepiteszet/dekorok/F206_9'
  }
];

// Gyors elérés kód szerint
window.getEggerDecor = function (code) {
  return window.EGGER_DECORS.find(function (d) { return d.code === code; });
};
