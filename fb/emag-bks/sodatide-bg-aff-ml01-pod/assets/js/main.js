/* 1) Monta os blocos repetidos (oferta e garantia) a partir dos <template> */
document.querySelectorAll('[data-tpl]').forEach(function (el) {
  el.replaceWith(document.getElementById(el.dataset.tpl).content.cloneNode(true));
});

/* 2) Repassa os parâmetros da URL (utm, src, etc.) para os links de checkout */
(function () {
  var qs = location.search.slice(1);
  if (!qs) return;
  document.querySelectorAll('a.buylink').forEach(function (a) {
    a.href += (a.href.indexOf('?') > -1 ? '&' : '?') + qs;
  });
})();

/* 3) VTurb: libera a oferta no segundo X do vídeo e esconde os comentários */
(function () {
  var DELAY = 3875; // segundos do pitch
  var player = document.querySelector('vturb-smartplayer');
  var offer = document.querySelector('.esconder');
  var comments = document.getElementById('fb-comments');

  new MutationObserver(function (_, obs) {
    if (getComputedStyle(offer).display !== 'none') {
      comments.style.display = 'none';
      obs.disconnect();
    }
  }).observe(offer, { attributes: true });

  player.addEventListener('player:ready', function () {
    player.displayHiddenElements(DELAY, ['.esconder'], { persist: true });
  });
})();
