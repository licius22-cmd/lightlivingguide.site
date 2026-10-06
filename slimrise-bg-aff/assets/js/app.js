/* =============================================================
 * SlimRise matcha VSL — page script
 * 1. VSL reveal   2. offer countdown   3. comment wall
 * No tracking of any kind. The checkout links are plain hrefs.
 * ============================================================= */
(function () {
	'use strict';

	/* ---------- 1. reveal the offer block when the VSL hits the pitch ---------- */
	(function reveal() {
		var box = document.getElementById('video');
		var player = document.querySelector('vturb-smartplayer');
		if (!box || !player) return;
		var test = new URLSearchParams(location.search).get('test') === 'true';
		var delay = Number(test ? 3258 : box.dataset.vdelay) || 0;
		if (!delay) return;
		player.addEventListener('player:ready', function () {
			try { player.displayHiddenElements(delay, ['.esconder'], { persist: true }); }
			catch (e) { console.warn('[vturb] displayHiddenElements failed:', e); }
		});
	})();

	/* ---------- 2. offer countdown, started on scroll-into-view ---------- */
	(function countdown() {
		var el = document.getElementById('cta-countdown');
		if (!el) return;
		var left = 8 * 60 + 47, timer;
		var draw = function () { el.textContent = Math.floor(left / 60) + ':' + ('0' + left % 60).slice(-2); };
		var tick = function () { if (--left <= 0) { left = 0; clearInterval(timer); } draw(); };
		var start = function () { timer = timer || setInterval(tick, 1000); };
		draw();
		if (!('IntersectionObserver' in window)) return start();
		var io = new IntersectionObserver(function (es) {
			if (es.some(function (e) { return e.isIntersecting; })) { start(); io.disconnect(); }
		}, { threshold: 0.1 });
		io.observe(el);
	})();

	/* ---------- 3. hide the comment wall once the offer is showing ---------- */
	(function comments() {
		var offer = document.querySelector('.esconder');
		var wall = document.getElementById('fb-comments');
		if (!offer || !wall) return;
		var hide = function () {
			if (getComputedStyle(offer).display === 'none') return false;
			wall.style.display = 'none';
			return true;
		};
		if (hide()) return;
		var mo = new MutationObserver(function () { if (hide()) mo.disconnect(); });
		mo.observe(offer, { attributes: true, attributeFilter: ['style', 'class'] });
	})();
})();
