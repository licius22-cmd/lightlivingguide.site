(() => {
  'use strict';

  const player = document.querySelector('vturb-smartplayer');
  const offerTime = 3252; // 54min12s de vídeo assistido.

  if (player) {
    player.addEventListener('player:ready', () => {
      player.displayHiddenElements(offerTime, ['.offer-content'], {
        persist: true,
        callback() {
          document.body.classList.add('offers-visible');
          document.querySelector('#scrolldown')?.scrollIntoView({
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
          });
        }
      });
    }, { once: true });

    const source = 'https://scripts.converteai.net/2c7dab58-ae57-4cfd-b407-5ca2b5a32d9c/players/6ad004a33acf84dd6adf9dc1/v4/player.js';
    if (![...document.scripts].some(script => script.src === source)) {
      const script = document.createElement('script');
      script.src = source;
      script.async = true;
      document.head.append(script);
    }
  }

  const date = document.querySelector('#currentDate');
  if (date) {
    const now = new Date();
    date.textContent = `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} (${now.toLocaleDateString('en-US', { weekday: 'long' })})`;
  }

  // A small accessible accordion replaces the complete UI framework.
  document.querySelectorAll('[data-accordion]').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('[data-accordion]').forEach(other => {
        const open = other === button && !expanded;
        other.setAttribute('aria-expanded', String(open));
        other.classList.toggle('collapsed', !open);
        document.querySelector(other.dataset.accordion)?.classList.toggle('show', open);
      });
    });
  });
})();
