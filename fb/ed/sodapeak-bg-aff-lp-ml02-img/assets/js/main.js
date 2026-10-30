(function () {
  var SEC = window.SECONDS_TO_DISPLAY || 3,
      KEY = 'offerShown' + SEC,
      CD_MIN = 19, CD_SEC = 59,            // countdown
      POP_EVERY = 16, POP_VISIBLE = 6,     // popup (segundos)
      PEOPLE = ['Benjamin','Michael','James','William','Daniel','Christopher','David','Henry','John','Robert','Thomas','Joseph','Matthew','Anthony','Mark','Richard','Charles','Paul','Steven','Andrew'],
      CITIES = ['St. Louis, MO','Austin, TX','Denver, CO','Tampa, FL','Columbus, OH','Portland, OR','Tulsa, OK','Phoenix, AZ','Dallas, TX','Miami, FL'];

  var $ = function (s) { return document.querySelector(s); },
      $$ = function (s) { return document.querySelectorAll(s); },
      pick = function (a) { return a[Math.random() * a.length | 0]; },
      pad = function (n) { return (n < 10 ? '0' : '') + n; },
      store = function (s, k, v) { try { return v == null ? window[s].getItem(k) : window[s].setItem(k, v); } catch (e) {} };

  // Data de hoje (MM/DD/YYYY)
  var d = new Date();
  $('#today').textContent = pad(d.getMonth() + 1) + '/' + pad(d.getDate()) + '/' + d.getFullYear();

  // Tabela de preços (1 template -> 2 blocos)
  var tpl = $('#pricing-tpl');
  $$('[data-pricing]').forEach(function (el) { el.appendChild(tpl.content.cloneNode(true)); });

  var lazy = $$('img[data-src]'), shown = false;
  var loadImgs = function () { lazy.forEach(function (i) { if (!i.src) i.src = i.dataset.src; }); };

  // Libera a oferta
  function reveal() {
    if (shown) return;
    shown = true;
    loadImgs();
    $('#offer').classList.remove('delay');
    store('localStorage', KEY, 1);
    countdown();
    setTimeout(popup, 3000);
    setInterval(popup, (POP_EVERY + POP_VISIBLE) * 1000);
  }

  function countdown() {
    var el = $('#countdown'), start = +store('sessionStorage', 'cdStart');
    if (!start) store('sessionStorage', 'cdStart', start = Date.now());
    var end = start + (CD_MIN * 60 + CD_SEC) * 1000;
    (function tick() {
      var l = Math.max(0, end - Date.now());
      el.textContent = pad(l / 6e4 | 0) + ':' + pad(l % 6e4 / 1e3 | 0);
      if (l) setTimeout(tick, 1000);
    })();
  }

  // Popup de compras
  var pop = $('#pop');
  function hidePop() { pop.classList.add('hide'); setTimeout(function () { pop.classList.remove('show'); }, 400); }
  function popup() {
    var q = pick([2, 3, 6]), card = $('.card[data-qty="' + q + '"]');
    pop.querySelector('.pop-name').textContent = pick(PEOPLE) + ' from ' + pick(CITIES);
    pop.querySelector('.pop-title').textContent = 'Just Bought ' + q + ' Bottles';
    pop.querySelector('.pop-time').textContent = (Math.random() * 58 + 2 | 0) + ' min ago';
    $('#pop-img').src = card.querySelector('.prod').dataset.src;
    pop.href = card.href;
    pop.classList.remove('hide');
    pop.classList.add('show');
    setTimeout(hidePop, POP_VISIBLE * 1000);
  }
  pop.querySelector('.pop-close').onclick = function (e) { e.preventDefault(); e.stopPropagation(); hidePop(); };

  // VTurb: libera a oferta após SEC segundos assistidos (ignora o autoplay mudo)
  var isAuto = function (o) { var s = o && ((o.config && o.config.smartAutoPlay) || o.smartAutoPlay); return !!(s && (s.active != null ? s.active : s)); };
  function onTime(player) {
    return function (e) {
      var t = e.detail, time = typeof t == 'number' ? t : t && (typeof t.time == 'number' ? t.time : t.currentTime);
      if (!isAuto(t) && !isAuto(player) && time >= SEC) reveal();
    };
  }
  var vp = $('vturb-smartplayer');
  vp.addEventListener('video:timeupdate', onTime(vp));
  vp.addEventListener('player:ready', function (e) {
    var p = e.detail && e.detail.player;
    if (p) p.addEventListener('video:timeupdate', onTime(p));
  });

  if (store('localStorage', KEY)) setTimeout(reveal, 100);

  // Pré-carrega as imagens da oferta em segundo plano
  window.addEventListener('load', function () { setTimeout(function () { if (!shown) lazy.forEach(function (i) { new Image().src = i.dataset.src; }); }, 6000); });

  // Bloqueia botão direito / atalhos de inspeção
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) {
    var c = e.code || '', k = c.indexOf('Key') ? (e.key || '').toLowerCase() : c.slice(3).toLowerCase(), m = e.ctrlKey || e.metaKey;
    if (k == 'f12' || c == 'F12' || (m && (k == 'u' || k == 's' || ((e.shiftKey || e.altKey) && 'ijc'.indexOf(k) > -1)))) e.preventDefault();
  });

  window.revealOffer = reveal; // útil para testes no console
})();
