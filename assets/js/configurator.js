/**
 * Konyhasziget konfigurátor
 * ----------------------------------------------------------------
 * Adatvezérelt: a products.js "konyhasziget" bejegyzése és az
 * egger-decors.js katalógus alapján rajzolja fel a galériát, a
 * színválasztókat, a méretválasztót, és tartja szinkronban az
 * élő SVG előnézetet + az árajánlat-kérés szövegét.
 *
 * Ha egy jövőbeli termékoldal ugyanezt a mintát követi (azonos id-k:
 * #media-grid, #parts-column, #island-illustration mintájú SVG
 * pattern image-ekkel "img-<részid>", #config-summary, stb.), ez a
 * fájl szó szerint újrafelhasználható, csak a getProduct('...') hívást
 * kell az adott termék id-jára módosítani.
 */
(function () {
  var PRODUCT_ID = 'konyhasziget';
  var product = window.getProduct(PRODUCT_ID);
  if (!product) return;

  // Az adatfájlokban (products.js, egger-decors.js) minden elérési út a
  // gyökérhez (index.html) viszonyított – ezen az oldalon (termekek/...)
  // a body data-base értékével ("../") kell kiegészíteni.
  var BASE = document.body.getAttribute('data-base') || './';
  function assetPath(p) { return p ? BASE + p : p; }

  var state = {};
  product.parts.forEach(function (part) { state[part.id] = part.defaultCode; });
  var defaultSize = product.sizes.filter(function (s) { return s.isDefault; })[0] || product.sizes[0];
  state.size = defaultSize.id;
  state.extended = true;

  /* ---------------- Galéria ---------------- */
  function renderGallery() {
    var grid = document.getElementById('media-grid');
    if (!grid || !product.gallery) return;

    grid.innerHTML = product.gallery.map(function (item) {
      if (item.type === 'video') {
        return (
          '<div class="media-tile media-tile--video">' +
            '<video controls preload="metadata" playsinline poster="' + assetPath(item.poster) + '">' +
              '<source src="' + assetPath(item.src) + '">' +
              'A böngésződ nem tudja lejátszani a videót beágyazva – ' +
              '<a href="' + assetPath(item.src) + '">töltsd le, vagy nyisd meg külön</a>.' +
            '</video>' +
            '<span class="media-tile__label">' + item.label + '</span>' +
          '</div>'
        );
      }
      return (
        '<div class="media-tile">' +
          '<img src="' + assetPath(item.src) + '" alt="' + item.label + '" loading="lazy">' +
          '<span class="media-tile__label">' + item.label + '</span>' +
        '</div>'
      );
    }).join('');

    Array.prototype.forEach.call(grid.querySelectorAll('.media-tile--video video'), function (video) {
      var tile = video.closest('.media-tile');
      video.addEventListener('play', function () { tile.classList.add('is-playing'); });
      video.addEventListener('pause', function () { tile.classList.remove('is-playing'); });
      video.addEventListener('ended', function () { tile.classList.remove('is-playing'); });
    });
  }

  /* ---------------- Alkatrész-választók + méret ---------------- */
  function renderParts() {
    var col = document.getElementById('parts-column');
    if (!col) return;

    var partsHtml = product.parts.map(function (part) {
      return (
        '<div class="part-block" data-part-block="' + part.id + '">' +
          '<div class="part-block__head"><h3>' + part.label + '</h3><span class="part-block__current" data-current="' + part.id + '"></span></div>' +
          '<p class="part-block__hint">' + part.hint + '</p>' +
          '<div class="swatch-grid" data-swatch-grid="' + part.id + '"></div>' +
        '</div>'
      );
    }).join('');

    var sizeHtml =
      '<div class="part-block" data-part-block="size">' +
        '<div class="part-block__head"><h3>Méret</h3></div>' +
        '<p class="part-block__hint">Bevált méretek, vagy kérd egyedi méretre szabva a konyhádhoz.</p>' +
        '<div class="size-grid" id="size-grid"></div>' +
      '</div>';

    col.innerHTML = partsHtml + sizeHtml;

    product.parts.forEach(function (part) {
      var swatchGrid = col.querySelector('[data-swatch-grid="' + part.id + '"]');
      swatchGrid.innerHTML = part.options.map(function (code) {
        var decor = window.getEggerDecor(code);
        if (!decor) return '';
        return (
          '<button type="button" class="swatch" data-part="' + part.id + '" data-code="' + decor.code + '" title="' + decor.fullName + '">' +
            '<span class="swatch__chip" style="background-image:url(\'' + assetPath(decor.image) + '\'); background-color:' + decor.hex + ';"></span>' +
            '<span class="swatch__name">' + decor.label + '<span class="swatch__code">' + decor.code.replace('_', ' ST') + '</span></span>' +
          '</button>'
        );
      }).join('');
    });

    Array.prototype.forEach.call(col.querySelectorAll('.swatch'), function (btn) {
      btn.addEventListener('click', function () {
        selectPart(btn.getAttribute('data-part'), btn.getAttribute('data-code'));
      });
    });

    renderSizes();
  }

  function renderSizes() {
    var grid = document.getElementById('size-grid');
    if (!grid) return;
    grid.innerHTML = product.sizes.map(function (size) {
      return (
        '<button type="button" class="size-card" data-size="' + size.id + '">' +
          '<strong>' + size.label + '</strong><span>' + size.detail + '</span>' +
        '</button>'
      );
    }).join('');

    Array.prototype.forEach.call(grid.querySelectorAll('.size-card'), function (btn) {
      btn.addEventListener('click', function () {
        state.size = btn.getAttribute('data-size');
        refreshSizeSelection();
        updateSummary();
      });
    });
    refreshSizeSelection();
  }

  function refreshSizeSelection() {
    var grid = document.getElementById('size-grid');
    if (!grid) return;
    Array.prototype.forEach.call(grid.querySelectorAll('.size-card'), function (btn) {
      btn.classList.toggle('is-selected', btn.getAttribute('data-size') === state.size);
    });
  }

  /* ---------------- Kiválasztás + élő előnézet ---------------- */
  function selectPart(partId, code) {
    state[partId] = code;
    applyPatternImage(partId, code);
    refreshSwatchSelection(partId);
    refreshCurrentLabel(partId);
    updateSummary();
  }

  function applyPatternImage(partId, code) {
    var decor = window.getEggerDecor(code);
    var img = document.getElementById('img-' + partId);
    if (decor && img) img.setAttribute('href', assetPath(decor.image));
  }

  function refreshSwatchSelection(partId) {
    var sel = '.swatch[data-part="' + partId + '"]';
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (btn) {
      btn.classList.toggle('is-selected', btn.getAttribute('data-code') === state[partId]);
    });
  }

  function refreshCurrentLabel(partId) {
    var decor = window.getEggerDecor(state[partId]);
    var el = document.querySelector('[data-current="' + partId + '"]');
    if (el && decor) el.textContent = decor.label;
  }

  function initSelections() {
    product.parts.forEach(function (part) {
      applyPatternImage(part.id, state[part.id]);
      refreshSwatchSelection(part.id);
      refreshCurrentLabel(part.id);
    });
  }

  /* ---------------- Zárva / kihúzva állapot ---------------- */
  function initStateToggle() {
    var toggle = document.getElementById('state-toggle');
    var svg = document.getElementById('island-illustration');
    if (!toggle || !svg) return;
    Array.prototype.forEach.call(toggle.querySelectorAll('button'), function (btn) {
      btn.addEventListener('click', function () {
        var extended = btn.getAttribute('data-state') === 'extended';
        state.extended = extended;
        Array.prototype.forEach.call(toggle.querySelectorAll('button'), function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        svg.classList.toggle('is-closed', !extended);
      });
    });
  }

  /* ---------------- Összegzés ---------------- */
  function updateSummary() {
    var box = document.getElementById('config-summary');
    if (!box) return;

    var rows = product.parts.map(function (part) {
      var decor = window.getEggerDecor(state[part.id]);
      return (
        '<div class="summary-row">' +
          '<span class="summary-row__label">' + part.label + '</span>' +
          '<span class="summary-row__value">' +
            '<span class="summary-row__swatch" style="background-image:url(\'' + assetPath(decor.image) + '\')"></span>' +
            decor.label +
          '</span>' +
        '</div>'
      );
    }).join('');

    var size = product.sizes.filter(function (s) { return s.id === state.size; })[0];
    rows += (
      '<div class="summary-row">' +
        '<span class="summary-row__label">Méret</span>' +
        '<span class="summary-row__value">' + (size ? size.label : '') + '</span>' +
      '</div>'
    );

    box.innerHTML = rows;
    updateQuoteLinks();
  }

  /* ---------------- Árajánlat: mailto + másolás ---------------- */
  function fieldValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function buildSummaryText() {
    var lines = [];
    lines.push('Árajánlat kérés – ' + product.name);
    lines.push('');
    product.parts.forEach(function (part) {
      var decor = window.getEggerDecor(state[part.id]);
      lines.push(part.label + ': ' + decor.fullName);
    });
    var size = product.sizes.filter(function (s) { return s.id === state.size; })[0];
    if (size) lines.push('Méret: ' + size.label + ' (' + size.detail + ')');
    lines.push('Illusztráción: ' + (state.extended ? 'kihúzott állapot' : 'zárt állapot'));

    var name = fieldValue('q-name');
    var phone = fieldValue('q-phone');
    var email = fieldValue('q-email');
    var message = fieldValue('q-message');
    if (name || phone || email || message) {
      lines.push('');
      lines.push('Elérhetőség:');
      if (name) lines.push('Név: ' + name);
      if (phone) lines.push('Telefon: ' + phone);
      if (email) lines.push('E-mail: ' + email);
      if (message) lines.push('Megjegyzés: ' + message);
    }
    lines.push('');
    lines.push('(Üzenet a konyhasziget online konfigurátorából.)');
    return lines.join('\n');
  }

  function updateQuoteLinks() {
    var text = buildSummaryText();
    var pre = document.getElementById('copy-summary-text');
    if (pre) pre.textContent = text;

    var mailBtn = document.getElementById('quote-mailto-btn');
    if (mailBtn) {
      var subject = encodeURIComponent('Árajánlat kérés – ' + product.name);
      var body = encodeURIComponent(text);
      mailBtn.setAttribute('href', 'mailto:info@erenyibutor.hu?subject=' + subject + '&body=' + body);
    }
  }

  function initCopyButton() {
    var btn = document.getElementById('copy-summary-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var text = document.getElementById('copy-summary-text').textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { showToast('Konfiguráció a vágólapra másolva.'); },
          function () { showToast('A másolás nem sikerült – jelöld ki kézzel a szöveget.'); }
        );
      } else {
        showToast('A másolás nem támogatott – jelöld ki kézzel a szöveget.');
      }
    });
  }

  function bindContactFields() {
    ['q-name', 'q-phone', 'q-email', 'q-message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', updateQuoteLinks);
    });
  }

  /* ---------------- Toast ---------------- */
  var toastTimer = null;
  function showToast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2600);
  }

  /* ---------------- Init ---------------- */
  function init() {
    renderGallery();
    renderParts();
    initSelections();
    initStateToggle();
    bindContactFields();
    updateSummary();
    initCopyButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
