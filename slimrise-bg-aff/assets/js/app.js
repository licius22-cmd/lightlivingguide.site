/* =============================================================
 * SlimRise matcha VSL — page script
 * 1. VSL reveal   2. offer countdown   3. comment wall + auto-scroll
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

	/* ---------- 3. when the offer appears: hide the comment wall and
	 *              scroll the kits into view.
	 *              The scroll only fires on a reveal that happens while the
	 *              visitor is on the page — never on a reload where the
	 *              player's "persist" flag shows the offer immediately.
	 * ------------------------------------------------------------------ */
	(function onReveal() {
		var offer = document.querySelector('.esconder');
		if (!offer) return;
		var wall = document.getElementById('fb-comments');
		var kits = document.getElementById('scrolldown') || offer;
		var visible = function () { return getComputedStyle(offer).display !== 'none'; };
		var wasHidden = !visible();

		var run = function () {
			if (!visible()) return false;
			if (wall) wall.style.display = 'none';
			if (wasHidden) {
				// let the cards lay out before measuring the target
				requestAnimationFrame(function () {
					setTimeout(function () {
						try { kits.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
						catch (e) { kits.scrollIntoView(true); }
					}, 120);
				});
			}
			return true;
		};

		if (run()) return;
		var mo = new MutationObserver(function () { if (run()) mo.disconnect(); });
		mo.observe(offer, { attributes: true, attributeFilter: ['style', 'class'] });
	})();
})();
