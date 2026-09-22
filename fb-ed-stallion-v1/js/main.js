(function () {
  var PITCH = 3510;                          // segundos do vídeo até liberar as ofertas
  var KEY = 'alreadyElsDisplayed' + PITCH;   // mesma chave de antes (quem já viu continua vendo)
  var offer = document.getElementById('offer');

  // Data de hoje na barra de aviso (MM/DD/AAAA)
  var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
  document.getElementById('today').textContent = p(d.getMonth() + 1) + '/' + p(d.getDate()) + '/' + d.getFullYear();

  // Título da aba piscando
  var titles = ['📩 (1) Unread Message', '(1) Unread Message'], t = 0;
  setInterval(function () { document.title = titles[t ^= 1]; }, 1000);

  // Primeiro toque/clique em qualquer lugar dá play no vídeo
  function tap() {
    document.removeEventListener('touchstart', tap);
    document.removeEventListener('click', tap);
    var el = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
    if (el) el.click();
  }
  document.addEventListener('touchstart', tap);
  document.addEventListener('click', tap);

  // Libera as ofertas no tempo do pitch
  function show() {
    offer.hidden = false;
    try { localStorage.setItem(KEY, 'true'); } catch (e) {}
  }
  var seen = false;
  try { seen = localStorage.getItem(KEY) === 'true'; } catch (e) {}
  if (seen) return show();

  var tries = 0;
  (function watch() {
    var sp = window.smartplayer, pl = sp && sp.instances && sp.instances[0];
    if (!pl) return ++tries <= 10 && setTimeout(watch, 1000);
    pl.on('timeupdate', function () {
      if (offer.hidden && !pl.smartAutoPlay && pl.video.currentTime >= PITCH) show();
    });
  })();
})();
