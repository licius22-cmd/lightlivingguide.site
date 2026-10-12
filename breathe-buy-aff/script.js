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
document.querySelector('.comments').insertAdjacentHTML('beforeend', comments.map(([name,text,time,likes,reply]) => fill(commentTemplate, {name,text,time,likes,reply,image:name.toLowerCase().replaceAll(' ','-')+'.webp'})).join(''));
