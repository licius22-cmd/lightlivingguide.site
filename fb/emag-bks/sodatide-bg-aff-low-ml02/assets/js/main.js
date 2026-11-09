/* 1) Monta os blocos repetidos (oferta e garantia) a partir dos <template> */
document.querySelectorAll('[data-tpl]').forEach(function (el) {
  el.replaceWith(document.getElementById(el.dataset.tpl).content.cloneNode(true));
});

/* 2) Parâmetros da URL e subid para o checkout: feito pelo "BuyGoods Param Forwarder" no fim do index.html */

/* 3) VTurb: libera a oferta no segundo X do vídeo e esconde os comentários */
(function () {
  var DELAY = 3900; // segundos do pitch
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
