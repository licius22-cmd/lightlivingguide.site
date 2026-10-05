/* app.js — substitui jQuery (90KB) + bootstrap.bundle (80KB) */
(function () {
  'use strict';

  /* ---------- 1. Accordion (substitui bootstrap collapse) ---------- */
  function closePanel(el) {
    el.style.height = el.scrollHeight + 'px';
    el.classList.add('collapsing');
    el.classList.remove('collapse', 'show');
    requestAnimationFrame(function () { el.style.height = '0px'; });
    setTimeout(function () {
      el.classList.remove('collapsing');
      el.classList.add('collapse');
      el.style.height = '';
    }, 350);
    var btn = document.querySelector('[data-bs-target="#' + el.id + '"]');
    if (btn) { btn.classList.add('collapsed'); btn.setAttribute('aria-expanded', 'false'); }
  }

  function openPanel(el) {
    el.classList.remove('collapse');
    el.classList.add('collapsing');
    el.style.height = '0px';
    requestAnimationFrame(function () { el.style.height = el.scrollHeight + 'px'; });
    setTimeout(function () {
      el.classList.remove('collapsing');
      el.classList.add('collapse', 'show');
      el.style.height = '';
    }, 350);
    var btn = document.querySelector('[data-bs-target="#' + el.id + '"]');
    if (btn) { btn.classList.remove('collapsed'); btn.setAttribute('aria-expanded', 'true'); }
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-bs-toggle="collapse"]');
    if (!trigger) return;
    e.preventDefault();
    var target = document.querySelector(trigger.getAttribute('data-bs-target'));
    if (!target || target.classList.contains('collapsing')) return;

    var isOpen = target.classList.contains('show');
    var parentSel = target.getAttribute('data-bs-parent');
    if (parentSel && !isOpen) {
      var parent = document.querySelector(parentSel);
      if (parent) {
        parent.querySelectorAll('.collapse.show').forEach(function (p) {
          if (p !== target) closePanel(p);
        });
      }
    }
    isOpen ? closePanel(target) : openPanel(target);
  }, false);

  /* ---------- 2. Esconder comentarios quando o conteudo aparece ---------- */
  var hideWatcher = setInterval(function () {
    var esconder = document.querySelector('.esconder');
    var fbComments = document.getElementById('fb-comments');
    if (!esconder || !fbComments) return;
    if (getComputedStyle(esconder).display !== 'none') {
      fbComments.style.display = 'none';
      clearInterval(hideWatcher);   // roda uma vez so, nao a cada 500ms pra sempre
    }
  }, 500);

  /* ---------- 3. Player: revelar oferta, scroll e countdown ---------- */
  var DELAY_SECONDS = 3330;

  function smoothScrollTo(el) {
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' });
  }

  function startCountdowns(scope) {
    scope.querySelectorAll('.countdown').forEach(function (el) {
      var match = (el.textContent || '').trim().match(/\d+/);
      if (!match) return;
      var value = parseInt(match[0], 10);
      var timer = setInterval(function () {
        if (value > 48) {
          value = Math.max(value - 6, 48);
          el.textContent = value;
        } else {
          clearInterval(timer);
        }
      }, 8000);
    });
  }

  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function initPlayerHooks(player) {
    player.addEventListener('player:ready', function () {
      if (typeof player.displayHiddenElements === 'function') {
        player.displayHiddenElements(DELAY_SECONDS, ['.esconder'], { persist: true });
      }
      var done = false;
      var watch = setInterval(function () {
        if (done) return;
        var target = Array.prototype.find.call(document.querySelectorAll('.esconder'), isVisible);
        if (!target) return;
        done = true;
        clearInterval(watch);
        smoothScrollTo(document.getElementById('quiz'));
        smoothScrollTo(document.getElementById('scrolldown'));
        startCountdowns(target);
      }, 500);
    });
  }

  function boot() {
    var player = document.querySelector('vturb-smartplayer');
    if (player) return initPlayerHooks(player);
    // player ainda nao foi registrado pelo script externo
    var tries = 0;
    var wait = setInterval(function () {
      var p = document.querySelector('vturb-smartplayer');
      if (p) { clearInterval(wait); initPlayerHooks(p); }
      else if (++tries > 60) clearInterval(wait);
    }, 250);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
