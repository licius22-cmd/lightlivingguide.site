/* AlkalineBurn VSL — JS puro, sem jQuery/Bootstrap */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const scrollTo = (el, off = 0) => el && window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - off, behavior: 'smooth' });

  /* ---------- Blocos repetidos (oferta + garantia) ---------- */
  const tplOffer = $('#tpl-offer'), tplGtee = $('#tpl-guarantee');
  $$('[data-offer]').forEach(el => {
    el.append(tplOffer.content.cloneNode(true));
    if (el.dataset.offer) $('.claim h2', el).textContent = el.dataset.offer;
  });
  $$('[data-guarantee]').forEach(el => el.append(tplGtee.content.cloneNode(true)));

  /* Repassa os parâmetros da URL para os links de checkout */
  const qs = new URLSearchParams(location.search);
  if ([...qs].length) $$('a[href^="http"]').forEach(a => {
    const u = new URL(a.href);
    qs.forEach((v, k) => u.searchParams.get(k) || u.searchParams.set(k, v));
    a.href = u;
  });

  /* CTA da garantia rola até o próximo bloco de pacotes */
  document.addEventListener('click', e => {
    const cta = e.target.closest('.gtee-cta');
    if (!cta) return;
    let n = cta.closest('[data-guarantee]').nextElementSibling;
    while (n && !n.matches('[data-offer]')) n = n.nextElementSibling;
    const target = n ? $('.products', n) : $('.products');
    if (target) { e.preventDefault(); scrollTo(target, 20); }
  });

  /* ---------- VTurb: libera o quiz no tempo do pitch ---------- */
  const player = $('vturb-smartplayer');
  const hidden = $('.esconder');
  let revealed = false;
  const reveal = () => {
    if (revealed || getComputedStyle(hidden).display === 'none') return;
    revealed = true;
    $('#fb-comments').hidden = true;
    scrollTo($('#quiz-wrapper'));
    $$('.countdown').forEach(el => {
      let n = +el.textContent;
      const t = setInterval(() => { n = Math.max(n - 6, 48); el.textContent = n; if (n <= 48) clearInterval(t); }, 8000);
    });
  };
  new MutationObserver(reveal).observe(hidden, { attributes: true });
  player.addEventListener('player:ready', () => {
    player.displayHiddenElements(2445, ['.esconder'], { persist: true });
    reveal();
  });
  const s = document.createElement('script');
  s.src = 'https://scripts.converteai.net/b5e8472d-3421-4675-a219-1ae1b636b21f/players/6aa9f881ce08d54b425b20a3/v4/player.js';
  s.async = true;
  document.head.append(s);

  /* ---------- Quiz ---------- */
  const quiz = $('#quiz-wrapper'), card = $('#perguntas'), status = $('#quizStatus');
  const answers = { goals: [], age: '', currentWeight: '', weight: '', symptoms: [] };
  const progress = (pct, label) => {
    $('#progress-fill').style.width = pct + '%';
    $('#pct-label').textContent = pct + '%';
    $('#step-label').textContent = label;
  };
  const show = id => {
    $$('.step.active').forEach(el => el.classList.remove('active', 'step-enter'));
    const el = $('#' + id);
    el.classList.add('active');
    void el.offsetWidth;
    el.classList.add('step-enter');
  };
  const go = n => { show('step-' + n); progress(n * 20, `Step ${n} of 5`); quiz.scrollIntoView({ behavior: 'smooth' }); };

  const finish = () => {
    const age = answers.age && answers.age + ' years old';
    const sym = answers.symptoms.filter(s => s !== 'None of the above').join(', ');
    $('#profile-rows').innerHTML =
      `<div>🎯 <strong>Goal:</strong> ${answers.goals.join(', ') || 'General wellness'}</div>
       <div>👤 <strong>Age:</strong> ${age}</div>
       <div>⚖️ <strong>Current weight:</strong> ${answers.currentWeight}</div>
       <div>📉 <strong>Weight to lose:</strong> ${answers.weight}</div>` +
      (sym ? `<div>⚠️ <strong>Symptoms:</strong> ${sym}</div>` : '');
    progress(100, 'Complete!');
    card.hidden = true;
    status.hidden = false;
    show('result');
    void status.offsetWidth;
    status.classList.add('show');
    scrollTo(status);
  };

  const loading = () => {
    show('loading');
    progress(90, 'Almost there...');
    quiz.scrollIntoView({ behavior: 'smooth' });
    const msgs = ['Reviewing your profile...', 'Calculating your dosage...', 'Preparing your personalized formula...'];
    const txt = $('#loading-text');
    let i = 0;
    txt.textContent = msgs[0];
    const t = setInterval(() => {
      if (++i >= msgs.length) return;
      txt.style.animation = 'none'; void txt.offsetWidth; txt.style.animation = '';
      txt.textContent = msgs[i];
    }, 2000);
    setTimeout(() => { clearInterval(t); finish(); }, 6500);
  };

  card.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const step = btn.closest('.step');
    if (btn.dataset.go) return btn.dataset.go === 'result' ? loading() : go(+btn.dataset.go);
    if (step.dataset.multi) {
      btn.classList.toggle('selected');
      const sel = $$('.opt.selected', step);
      answers[step.dataset.multi] = sel.map(b => $('span', b).firstChild.textContent.trim());
      $('.next-btn', step).classList.toggle('visible', sel.length > 0);
    } else {
      $$('.opt', step).forEach(b => b.classList.toggle('selected', b === btn));
      answers[step.dataset.field] = btn.dataset.v;
      setTimeout(() => go(+step.id.slice(5) + 1), 360);
    }
  });

  $('#redo').addEventListener('click', () => {
    status.hidden = true;
    status.classList.remove('show');
    card.hidden = false;
    go(1);
  });

  $('#cta-quiz').addEventListener('click', () => {
    quiz.hidden = status.hidden = true;
    const after = $('.after-quiz');
    after.hidden = false;
    after.scrollIntoView({ behavior: 'smooth' });
  });
})();
