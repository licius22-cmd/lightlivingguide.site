(() => {
  const player = document.querySelector('vturb-smartplayer');
  const offers = document.querySelector('.offer-content');
  const offerTime = 3481;

  if (player && offers) {
    player.addEventListener('player:ready', () => {
      // VTurb handles the playback time and remembers unlocked offers.
      const observer = new MutationObserver(revealOffers);

      function revealOffers() {
        if (getComputedStyle(offers).display === 'none') return;
        observer.disconnect();
        document.body.classList.add('offers-visible');
        offers.querySelector('#scrolldown')?.scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
      }

      observer.observe(offers, { attributes: true, attributeFilter: ['style', 'class'] });
      player.displayHiddenElements(offerTime, ['.offer-content'], { persist: true });
      revealOffers();
    }, { once: true });

    const script = document.createElement('script');
    script.src = 'https://scripts.converteai.net/0cbde239-7859-447c-9db6-b9e1e047c62e/players/6abaa0360ecc4d76911925bc/v4/player.js';
    script.async = true;
    document.head.append(script);
  }

  const dateLabel = document.querySelector('#fbDate');
  if (dateLabel) {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    dateLabel.textContent =
      `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })} at ` +
      `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
})();
