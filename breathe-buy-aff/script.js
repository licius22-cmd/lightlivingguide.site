'use strict';
const kits = [{"quantity":"6","variant":"featured","heading":"BEST VALUE","headingClass":"badge","label":"","supply":"6-month supply","price":"49","save":"YOU SAVE $780!","oldTotal":"$1074","total":"$294","shipping":"+FREE SHIPPING"},{"quantity":"3","variant":"good","heading":"Good Value","headingClass":"bar only-desktop","label":"Most Popular","supply":"3-month supply","price":"69","save":"YOU SAVE 330!","oldTotal":"$537","total":"$207","shipping":"+FREE SHIPPING"},{"quantity":"2","variant":"basic","heading":"Basic","headingClass":"bar only-desktop","label":"Basic","supply":"2-month supply","price":"79","save":"YOU SAVE $200!","oldTotal":"$358","total":"$158","shipping":"+$9.99 SHIPPING"}];
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

document.querySelector('.offers').innerHTML = kits.map(kit => fill(`
<article class="card {{variant}}"><div class="{{headingClass}}">{{heading}}</div><div class="body">
<div class="grid"><div class="left"><span class="label">{{label}}</span><h3 class="qty">{{quantity}} BOTTLE${kit.quantity === "2" ? "S" : ""}</h3><p class="supply">{{supply}}</p><img class="bottles" src="assets/kit-{{quantity}}-300.webp" srcset="assets/kit-{{quantity}}-300.webp 300w, assets/kit-{{quantity}}-600.webp 600w" sizes="(min-width:900px) 271px,210px" width="600" height="600" alt="{{quantity}} bottles of Breathizen" loading="lazy" decoding="async"></div>
<div class="right"><div class="price"><span class="price__cur">$</span><span class="price__num">{{price}}</span><span class="price__per">PER<br>BOTTLE</span></div><ul class="benefits"><li class="save">{{save}}</li>${kit.variant === "featured" ? "<li>BIGGEST DISCOUNT</li>" : ""}<li>MONEY-BACK GUARANTEE</li></ul><p class="total">total: <s>{{oldTotal}}</s> <b>{{total}}</b><span class="ship">{{shipping}}</span></p></div></div>
<a class="btn {{button}}" href="{{href}}">BUY NOW</a><img class="pay only-desktop" src="assets/payment-06.webp" width="391" height="57" alt="" loading="lazy" decoding="async"></div></article>`, {...kit, href: "https://buygoods.com/secure/checkout.html?account_id=13186&product_codename=" + 'PP_BTZ' + kit.quantity + 'UNITS_AFF' + "&redirect=aHR0cHM6Ly9pbXByb3ZpbmdvdXJoZWFsdGguY29tL2J0ei1hZmYtYnV5LXVwMS8=", button:kit.variant === 'featured' ? 'btn--yellow' : 'btn--grey'})).join('');

const commentTemplate = `<div class="comment {{reply}}"><img class="avatar" src="assets/{{image}}" width="80" height="80" alt="{{name}}" loading="lazy" decoding="async"><div class="bubble"><span class="author">{{name}}</span><div class="message">{{text}}</div><div class="actions"><span>Like</span> · <span>Reply</span> · <span>{{time}}</span></div><div class="reactions"><img src="assets/reactions.webp" width="80" height="52" alt="Reactions" loading="lazy" decoding="async"><span>{{likes}}</span></div></div></div>`;
document.querySelector('.comments').insertAdjacentHTML('beforeend', comments.map(([name,text,time,likes,reply]) => fill(commentTemplate, {name,text,time,likes,reply,image:name.toLowerCase().replaceAll(' ','-')+'.webp'})).join(''));


(() => {
  const video = document.getElementById('site-video');
  const button = document.getElementById('start-video');
  const status = document.getElementById('video-status');
  const offerAt = Number(video.dataset.offerAt);
  let hls;
  let library;
  function showOffers() {
    document.querySelector('.offers').classList.remove('js-delay');
    video.removeEventListener('timeupdate', onTimeUpdate);
  }
  function onTimeUpdate() {
    if (!video.paused && video.currentTime >= offerAt) showOffers();
  }
  video.addEventListener('timeupdate', onTimeUpdate);

  const preview = new URLSearchParams(location.search).get('bbAt');
  if (preview?.trim() && Number.isFinite(+preview) && +preview >= 0) {
    setTimeout(showOffers, Math.min(+preview, 3600) * 1000);
  }
  function resetPlayer() {
    hls?.destroy();
    hls = null;
    button.disabled = button.hidden = false;
    button.textContent = 'Play video';
  }
  function showError() {
    resetPlayer();
    button.textContent = 'Retry video';
    status.textContent = 'The video could not load. Check your connection and try again.';
    status.hidden = false;
  }
  const play = () => video.play().catch(showError);

  function loadLibrary() {
    if (window.Hls) return Promise.resolve();
    return library ||= new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'assets/hls.js';
      script.onload = resolve;
      script.onerror = () => {
        script.remove();
        library = null;
        reject(new Error('Video library unavailable'));
      };
      document.head.appendChild(script);
    });
  }

  button.addEventListener('click', async () => {
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = 'Loading…';
    status.hidden = true;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = video.dataset.source;
      play();
      return;
    }
    try {
      await loadLibrary();
      const Hls = window.Hls;
      if (!Hls.isSupported()) throw new Error('HLS unsupported');
      hls = new Hls({ enableWorker: true, maxBufferLength: 30 });
      hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(video.dataset.source));
      hls.on(Hls.Events.MANIFEST_PARSED, play);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) showError();
      });
      hls.attachMedia(video);
    } catch {
      showError();
    }
  });
  video.addEventListener('playing', () => { button.hidden = status.hidden = true; });
  video.addEventListener('error', showError);
  window.addEventListener('pagehide', resetPlayer);
})();

