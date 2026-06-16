/**
 * Főoldal: termékrács kirajzolása a products.js adatai alapján.
 * Új termék felvételekor (status: 'live' vagy 'soon') automatikusan
 * megjelenik itt, nincs szükség a HTML módosítására.
 */
(function () {
  var grid = document.getElementById('product-grid');
  if (!grid || !window.PRODUCTS) return;

  var cardsHtml = window.PRODUCTS.map(function (p) {
    if (p.status === 'soon') {
      return (
        '<article class="product-card is-soon">' +
          '<div class="product-card__media">' +
            '<span class="badge-soon">Hamarosan</span>' +
          '</div>' +
          '<div class="product-card__body">' +
            '<h3>' + p.shortName + '</h3>' +
            '<p>' + (p.tagline || '') + '</p>' +
            '<div class="product-card__foot">' +
              '<button class="btn btn-outline" disabled>Hamarosan</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    var tags = '';
    if (p.parts) {
      tags += '<span class="tag">' + p.parts.length + ' szín állítható</span>';
    }
    if (p.sizes) {
      tags += '<span class="tag">' + (p.sizes.length - 1) + '+ méret</span>';
    }
    tags += '<span class="tag">EGGER dekorok</span>';

    return (
      '<article class="product-card">' +
        '<div class="product-card__media">' +
          '<span class="product-card__badge">Konfigurálható</span>' +
          '<img src="' + p.cardImage + '" alt="' + p.name + '" loading="lazy">' +
        '</div>' +
        '<div class="product-card__body">' +
          '<h3>' + p.shortName + '</h3>' +
          '<p>' + p.tagline + '</p>' +
          '<div class="product-card__tags">' + tags + '</div>' +
          '<div class="product-card__foot">' +
            '<a href="' + p.url + '" class="btn btn-primary">Konfigurálom →</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  grid.innerHTML = cardsHtml;
})();
