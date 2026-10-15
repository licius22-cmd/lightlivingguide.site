(() => {
  'use strict';

  const storageKey = 'bg_attribution_v2';
  const clickKeys = ['rtkcid', 'rtkclickid', 'clickid', 'click_id', 'rtk_cid', 'cid', 'sid1'];
  const cookieKeys = ['rtkclickid-store', 'rtkclickid', 'rtkcid'];
  const incoming = new URLSearchParams(location.search);
  const isTrackingKey = key => /^utm_/.test(key) || clickKeys.includes(key) ||
    ['fbclid', 'gclid', 'gbraid', 'wbraid', 'ttclid', 'tbclid', 'src', 'sck', 'xcod'].includes(key);
  const fresh = [...incoming].filter(([key, value]) => isTrackingKey(key) && value);
  let saved = {};
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (stored && stored.expires > Date.now()) saved = stored.params;
  } catch {}
  // Uma nova origem substitui a campanha anterior por inteiro, sem misturar UTMs.
  const params = new URLSearchParams(fresh.length ? fresh : saved);
  if (fresh.length) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        params: Object.fromEntries(params), expires: Date.now() + 30 * 864e5
      }));
    } catch {}
  }

  function cookie(name) {
    const entry = document.cookie.split(/;\s*/).find(value => value.startsWith(name + '='));
    try { return entry ? decodeURIComponent(entry.slice(name.length + 1)) : ''; }
    catch { return ''; }
  }

  function clickId() {
    return clickKeys.map(key => incoming.get(key)).find(Boolean) ||
      cookieKeys.map(cookie).find(Boolean) || window.rtkClickID ||
      clickKeys.map(key => params.get(key)).find(Boolean) || '';
  }

  function checkout(link) {
    if (!link) return null;
    try {
      const url = new URL(link.href, location.href);
      return url.protocol === 'https:' &&
        /(^|\.)(buygoods\.com|bgcheckout\.com)$/.test(url.hostname) ? url : null;
    } catch { return null; }
  }

  function decorate(link) {
    const url = checkout(link);
    if (!url) return;
    // Nunca aceite account_id, aff_id, produto ou redirect vindos do anúncio.
    params.forEach((value, key) => url.searchParams.set(key, value));
    const id = clickId();
    if (id) url.searchParams.set('subid', id);
    if (link.href !== url.href) link.href = url.href;
  }

  function updateLinks() {
    document.querySelectorAll('a[href]').forEach(decorate);
  }

  // Atualiza também links criados pelo player, sem observar cada mudança da página.
  for (const type of ['pointerdown', 'focusin', 'click', 'auxclick']) {
    document.addEventListener(type, event => {
      const link = event.target.closest?.('a[href]');
      if (checkout(link)) decorate(link);
    }, true);
  }

  // Mantém o evento existente, restrito aos botões reais de compra.
  document.addEventListener('click', event => {
    const link = event.target.closest?.('.offers a[href]');
    if (event.defaultPrevented || event.button !== 0 || !checkout(link)) return;
    const id = clickId();
    if (!id) return;
    try { if (sessionStorage.getItem('rtk_ic_fired') === id) return; } catch {}
    const url = 'https://kshj1.ttrk.io/postback?' + new URLSearchParams({
      clickid: id, type: 'InitiateCheckout'
    });
    // Não segura a navegação esperando a resposta do rastreador.
    if (window.fetch) fetch(url, { mode: 'no-cors', keepalive: true }).catch(() => {});
    else new Image().src = url;
    try { sessionStorage.setItem('rtk_ic_fired', id); } catch {}
  });

  updateLinks();
  document.getElementById('redtrack')?.addEventListener('load', updateLinks, { once: true });
  window.addEventListener('pageshow', updateLinks);

  // O listener precisa existir antes de carregar o embed do VTurb.
  const player = document.querySelector('vturb-smartplayer');
  if (player) {
    player.addEventListener('player:ready', () => {
      player.displayHiddenElements(2913, ['.esconder'], { persist: true });
      updateLinks();
    }, { once: true });
    loadScript('https://scripts.converteai.net/6e3ae2f6-ad64-483b-9bc5-bafc50ec8005/players/6acd1e95f6f2219d5a348a57/v4/player.js');
  }

  // Uma única chamada, com o endereço e o referrer reais desta visita.
  const buygoods = new URL('https://tracking.buygoods.com/track/');
  buygoods.search = new URLSearchParams({
    a: '13186', firstcookie: '0', tracking_redirect: '', referrer: document.referrer,
    sessid2: cookie('sessid2'), product: 'PP_BTZ2UNITS_AFF,PP_BTZ3UNITS_AFF,PP_BTZ6UNITS_AFF',
    vid1: '', vid2: '', vid3: '', caller_url: location.href
  });
  if (typeof window.add_to_cart !== 'undefined') buygoods.searchParams.set('add_to_cart', window.add_to_cart);
  loadScript(buygoods.href);

  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.cfasync = 'false';
    document.head.appendChild(script);
  }
})();

'use strict';
// Nome, comentario, tempo, curtidas, resposta.
const comments = [
["Robert Martinez","I swear I thought this was just another one of those long boring scam videos... But hearing about the real Vick VaporRub trick actually made me stay and watch. When he showed why expensive inhalers never worked I was like omg that's literally me","2h","42",""],
["Catherine Wilson","Same here. When he said Big Pharma has been hiding a $3 solution on purpose, it clicked instantly.","1h","33","reply"],
["Michael Johnson","Exactly. I've wasted so much money on nebulizers and treatments before. This one felt like it was calling them all out directly.","1h","28","reply"],
["Dorothy Green","Honest question... is this legit or just another marketing hype?","45m","23",""],
["Patricia Stewart","I asked myself the same thing. Stayed skeptical until he explained why oxygen tanks never worked long term. Then I tried it and now I'm mad I waited lol","3h","27","reply"],
["James Baker","The part about reversing 20 years of lung damage with the correct VaporRub method is what made me keep watching. Because that's literally my story except I spent thousands on treatments that did nothing 😭","2h","31",""],
["Linda Clark","It's not even about breathing for me anymore. After watching the real explanation I finally understood why nothing I tried ever lasted.","2h","38","reply"],
["David Smith","Yes! I could breathe deeper within days it honestly surprised me. Day 5 my wife asked if I stopped using my inhaler lmaooo","2h","48",""],
["Carol Johnson","Has anyone actually seen real results from this? Or is it just talk?","2h","33",""],
["Frank Rodriguez","I'm on day 10 after following the VaporRub trick. My oxygen levels are visibly higher already. My doctor grabbed my chart last night and said \"what is happening to you\" 😳","2h","48","reply"],
["Margaret Perry","I'm further in. About 5 weeks now. My daughter called me and said \"dad what did you DO to your lungs.\" I just smiled 😏 she didn't believe me when I told her","1d","45","reply"],
["Thomas Richardson","I almost closed the video when I saw how long it was. Glad I didn't. The part about people spending thousands on treatments that all failed got me","1d","50",""],
["Betty Patterson","The craziest part is realizing the VaporRub trick itself wasn't the scam, the watered-down versions online were. Huge difference between rubbing it on your chest and what he actually explains","1d","48",""],
["William Garcia","I stayed because he mentioned people breathing normally once the SP-D protein activates naturally. I thought ok sure whatever. But it's been a month and I'm climbing stairs again. Ordered the 6 bottle one and I'm not stopping idc anymore","2d","46",""]
];
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const fill = (template, item) => template.replace(/{{(\w+)}}/g, (_, key) => escape(item[key]));

const commentTemplate = `<div class="comment {{reply}}"><img class="avatar" src="assets/{{image}}" width="80" height="80" alt="{{name}}" loading="lazy" decoding="async"><div class="bubble"><span class="author">{{name}}</span><div class="message">{{text}}</div><div class="actions"><span>Like</span> · <span>Reply</span> · <span>{{time}}</span></div><div class="reactions"><img src="assets/reactions.webp" width="80" height="52" alt="Reactions" loading="lazy" decoding="async"><span>{{likes}}</span></div></div></div>`;
const section = document.querySelector('.comments');
function renderComments() {
  section.insertAdjacentHTML('beforeend', comments.map(([name,text,time,likes,reply]) => fill(commentTemplate, {name,text,time,likes,reply,image:name.toLowerCase().replaceAll(' ','-')+'.webp'})).join(''));
}
if (section && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    renderComments();
  }, { rootMargin: '300px' });
  observer.observe(section);
} else if (section) renderComments();

