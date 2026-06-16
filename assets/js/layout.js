/**
 * Közös fejléc / lábjegyzet beillesztése.
 * Minden oldal <body data-base="./"> (főoldal) vagy <body data-base="../">
 * (al-mappában lévő termékoldal) attribútummal jelzi, honnan kell
 * számolni a relatív linkeket – így új termék-oldal felvételekor nem kell
 * a fejlécet/lábjegyzetet kézzel másolni, csak ezt a fájlt kell betölteni.
 */
(function () {
  var base = document.body.getAttribute('data-base') || './';

  var BRAND_MARK =
    '<svg class="brand__mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">' +
      '<polygon points="90,50 70,84.6 30,84.6 10,50 30,15.4 70,15.4" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>' +
      '<rect x="37" y="40" width="26" height="26" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"/>' +
      '<line x1="37" y1="51" x2="63" y2="51" stroke="currentColor" stroke-width="3.2"/>' +
      '<line x1="37" y1="58.5" x2="63" y2="58.5" stroke="currentColor" stroke-width="3.2"/>' +
      '<line x1="41" y1="55" x2="48" y2="55" style="stroke:#e0732b" stroke-width="3.2" stroke-linecap="round"/>' +
      '<line x1="41" y1="62.5" x2="48" y2="62.5" style="stroke:#e0732b" stroke-width="3.2" stroke-linecap="round"/>' +
    '</svg>';

  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.classList.add('site-header');
    headerEl.innerHTML =
      '<div class="container site-header__bar">' +
        '<a href="' + base + 'index.html" class="brand">' +
          BRAND_MARK +
          '<span class="brand__name">Erényi Bútor<small>Állandó termékek</small></span>' +
        '</a>' +
        '<nav class="main-nav" id="main-nav">' +
          '<a href="' + base + 'index.html#termekek">Termékeink</a>' +
          '<a href="' + base + 'index.html#hogyan-mukodik">Hogyan működik</a>' +
          '<a href="https://www.erenyibutor.hu" target="_blank" rel="noopener">Egyedi bútorok</a>' +
          '<a href="' + base + 'index.html#kapcsolat">Kapcsolat</a>' +
        '</nav>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Menü megnyitása" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>';

    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.classList.add('site-footer');
    footerEl.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<a href="' + base + 'index.html" class="brand" style="color:#fff;margin-bottom:14px;">' +
              BRAND_MARK +
              '<span class="brand__name">Erényi Bútor<small>Állandó termékek</small></span>' +
            '</a>' +
            '<p>Egyedi bútorkészítés Budaörsön, 2021 óta – és válogatott kedvenceink most állandó, ' +
            'konfigurálható kínálatban is elérhetők, saját színekben és méretben.</p>' +
          '</div>' +
          '<div>' +
            '<h4>Termékek</h4>' +
            '<ul>' +
              '<li><a href="' + base + 'termekek/konyhasziget.html">Konyhasziget</a></li>' +
              '<li><a href="' + base + 'index.html#termekek">Összes állandó termék</a></li>' +
              '<li><a href="https://www.erenyibutor.hu" target="_blank" rel="noopener">Egyedi bútorok →</a></li>' +
            '</ul>' +
          '</div>' +
          '<div id="kapcsolat">' +
            '<h4>Kapcsolat</h4>' +
            '<ul>' +
              '<li><a href="tel:+36304880755">+36 30 488 0755</a></li>' +
              '<li><a href="mailto:info@erenyibutor.hu">info@erenyibutor.hu</a></li>' +
              '<li>2040 Budaörs</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' Erényi Bútor – Erényi Gergely</span>' +
          '<span>Stílus: erenyibutor.hu</span>' +
        '</div>' +
      '</div>';
  }
})();
