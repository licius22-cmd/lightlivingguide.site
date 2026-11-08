(() => {
  const $$ = (s, r = document) => r.querySelectorAll(s);

  // 1. Monta os blocos repetidos (preços e garantia) a partir dos <template>
  $$('[data-tpl]').forEach(el => el.replaceWith(document.getElementById('tpl-' + el.dataset.tpl).content.cloneNode(true)));

  // 2. Repassa os parâmetros da URL (utm_*, etc.) para os links de checkout
  const qs = new URLSearchParams(location.search);
  $$('.kit').forEach(a => {
    const u = new URL(a.href);
    qs.forEach((v, k) => u.searchParams.set(k, v));
    a.href = u;
  });

  // 3. Libera a oferta
  const offer = document.querySelector('.offer');
  let on = false;
  const show = () => {
    if (on) return;
    on = true;
    offer.style.display = 'block';
    document.querySelector('.fb').hidden = true;
    offer.scrollIntoView({ behavior: 'smooth' });
    $$('.countdown').forEach(el => {
      let n = +el.textContent;
      const t = setInterval(() => { n = Math.max(n - 6, 48); el.textContent = n; if (n === 48) clearInterval(t); }, 8000);
    });
  };

  // Teste rápido: abra a página com ?pitch=1 para ver a oferta sem esperar o vídeo
  if (qs.has('pitch')) return show();

  // VTurb: dispara quando o vídeo atinge PITCH_SECONDS (lembra o estado para quem volta à página)
  const player = document.querySelector('vturb-smartplayer');
  player.addEventListener('player:ready', () => {
    player.displayHiddenElements(window.PITCH_SECONDS, ['.offer'], { persist: true });
    new MutationObserver((_, o) => { if (getComputedStyle(offer).display !== 'none') { o.disconnect(); show(); } })
      .observe(offer, { attributes: true });
  });
})();
