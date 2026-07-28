/* ==========================================================================
   Soda Slim — script único
   Substitui: jquery.js, bootstrap.js, new-quiz.js, purchase-notifications.js,
              utm-transfer.js e todos os <script> inline do index.html
   ========================================================================== */
(() => {
'use strict';

/* ==========================================================================
   ⚙️  CONFIGURAÇÃO — EDITE SÓ ESTE BLOCO
   ========================================================================== */
const CHECKOUT_LINKS = {
  2: 'https://www.yourlink.com/2bottles',   // kit 2 potes
  3: 'https://www.yourlink.com/3bottles',   // kit 2+1 potes
  6: 'https://www.yourlink.com/6bottles'    // kit 3+3 potes
};
const VSL_DELAY   = 3;    // segundos de vídeo antes de liberar o quiz
const FALLBACK    = 0;    // segurança: libera o quiz sozinho após N segundos se o
                          // player não carregar (0 = desligado, igual ao original)
const STOCK_START = 218;  // estoque inicial exibido
const STOCK_FLOOR = 48;   // estoque mínimo
/* ========================================================================== */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const scrollTo_ = s => $(s)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* --- 1. Blocos repetidos: clona os <template> nos slots [data-tpl] -------- */
$$('[data-tpl]').forEach(slot => {
  const tpl = $('#tpl-' + slot.dataset.tpl);
  if (!tpl) return;
  const frag = tpl.content.cloneNode(true);
  if (slot.dataset.title) frag.querySelector('.title-claim').textContent = slot.dataset.title;
  if ('dark' in slot.dataset) frag.querySelector('.cta-strip').classList.add('dark');
  slot.replaceWith(frag);
});

/* --- 2. Links de checkout + propagação dos parâmetros da URL -------------- */
const qs = location.search.slice(1);
$$('a.buylink').forEach(a => {
  const base = CHECKOUT_LINKS[a.dataset.kit];
  if (!base) return;
  a.href = qs ? base + (base.includes('?') ? '&' : '?') + qs : base;
});

/* --- 3. Quiz ------------------------------------------------------------- */
const TOTAL = 5;
const answers = { goals: [], age: '', currentWeight: '', weight: '', symptoms: [] };
let step = 1;

const stepEl = n => $('#step-' + n);
const label  = b => b.querySelector('.opt-label').childNodes[0].textContent.trim();

function setProgress(n, txt) {
  const pct = txt ? (txt === 'Complete!' ? 100 : 90) : Math.round(n / TOTAL * 100);
  $('#progress-fill').style.width = pct + '%';
  $('#step-label').textContent = txt || `Step ${n} of ${TOTAL}`;
  $('#pct-label').textContent  = pct + '%';
}

function show(el) {
  el.classList.add('active');
  void el.offsetWidth;
  el.classList.add('step-enter');
}

function goTo(n) {
  if (n < 1 || n > TOTAL) return;
  stepEl(step).classList.remove('active', 'step-enter');
  step = n;
  show(stepEl(n));
  setProgress(n);
  scrollTo_('#quiz-wrapper');
}

$('#perguntas').addEventListener('click', e => {
  const opt = e.target.closest('.option-btn');
  if (opt) return opt.classList.contains('multi') ? toggleMulti(opt) : pickOne(opt);
  if (e.target.closest('.back-btn')) return goTo(step - 1);
  if (e.target.closest('.next-btn')) return step === TOTAL ? showResult() : goTo(step + 1);
});

function toggleMulti(btn) {
  btn.classList.toggle('selected');
  const box = btn.closest('.step');
  const n   = +box.id.slice(5);
  const sel = $$('.option-btn.selected', box).map(label);
  answers[n === 1 ? 'goals' : 'symptoms'] = sel;
  $('#next-' + n)?.classList.toggle('visible', sel.length > 0);
}

function pickOne(btn) {
  $$('.option-btn', btn.closest('.step')).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  answers[btn.dataset.field] = btn.dataset.value;
  setTimeout(() => goTo(step + 1), 360);
}

function showResult() {
  stepEl(step).classList.remove('active', 'step-enter');
  const loading = $('#loading');
  show(loading);
  setProgress(0, 'Almost there...');
  scrollTo_('#quiz-wrapper');

  const msgs = ['Reviewing your profile...', 'Calculating your dosage...', 'Preparing your personalized formula...'];
  const text = $('#loading-text');
  let i = 0;
  const cycle = setInterval(() => {
    if (++i >= msgs.length) return;
    text.style.animation = 'none';
    void text.offsetWidth;
    text.style.animation = 'fadeSwap .4s ease both';
    text.textContent = msgs[i];
  }, 2000);

  setTimeout(() => {
    clearInterval(cycle);
    loading.classList.remove('active', 'step-enter');
    buildResult();
    finalize();
  }, 6500);
}

function buildResult() {
  const { goals, age, currentWeight, weight, symptoms } = answers;
  const symptomStr = symptoms.filter(s => s !== 'None of the above').join(', ');

  $('#profile-rows').innerHTML =
    `<div class="profile-line">🎯 <strong>Goal:</strong> ${goals.join(', ') || 'General wellness'}</div>
     <div class="profile-line">👤 <strong>Age:</strong> ${age} years old</div>
     <div class="profile-line">⚖️ <strong>Current weight:</strong> ${currentWeight}</div>
     <div class="profile-line">📉 <strong>Weight to lose:</strong> ${weight}</div>` +
    (symptomStr ? `<div class="profile-line">⚠️ <strong>Symptoms:</strong> ${symptomStr}</div>` : '');

  $('#projection-content').innerHTML =
    `<span class="projection-number">18–29 lbs in the first 30 days</span>
     <div class="projection-body">That's just month one. Women with your profile and commitment to the full 6-month treatment have lost 65+ lbs — and kept it off for good.</div>`;

  show($('#result'));
}

function finalize() {
  setProgress(0, 'Complete!');
  $('#perguntas').style.display = 'none';
  const box = $('#quizStatus');
  box.hidden = false;
  requestAnimationFrame(() => box.classList.add('show'));
  scrollTo_('#quizStatus');
}

$('#redo-quiz').addEventListener('click', () => {
  $('#quizStatus').hidden = true;
  $('#quizStatus').classList.remove('show');
  $('#result').classList.remove('active', 'step-enter');
  $('#perguntas').style.display = '';
  $$('.option-btn.selected').forEach(b => b.classList.remove('selected'));
  $$('.next-btn').forEach(b => b.classList.remove('visible'));
  Object.assign(answers, { goals: [], age: '', currentWeight: '', weight: '', symptoms: [] });
  $$('.step').forEach(s => s.classList.remove('active', 'step-enter'));
  step = 1;
  stepEl(1).classList.add('active');
  setProgress(1);
  scrollTo_('#quiz-wrapper');
});

$('#go-offer').addEventListener('click', e => {
  e.preventDefault();
  $('.esconder').style.display = 'none';
  const offer = $('.after-quiz');
  offer.style.display = 'block';
  startCountdown();
  offer.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* --- 4. Contador de estoque --------------------------------------------- */
let countdownRunning = false;
function startCountdown() {
  if (countdownRunning) return;
  countdownRunning = true;
  let v = STOCK_START;
  const els = $$('.countdown');
  const t = setInterval(() => {
    if (v <= STOCK_FLOOR) return clearInterval(t);
    v = Math.max(v - 6, STOCK_FLOOR);
    els.forEach(el => el.textContent = v);
  }, 8000);
}

/* --- 5. Acordeão do FAQ (substitui o collapse do Bootstrap) -------------- */
$$('.accordion').forEach(acc => acc.addEventListener('click', e => {
  const btn = e.target.closest('.accordion-button');
  if (!btn) return;
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  $$('.accordion-item.open', acc).forEach(i => {
    i.classList.remove('open');
    i.querySelector('.accordion-collapse').style.maxHeight = '';
    i.querySelector('.accordion-button').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    const body = item.querySelector('.accordion-collapse');
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
    btn.setAttribute('aria-expanded', 'true');
  }
}));

addEventListener('resize', () => $$('.accordion-item.open .accordion-collapse')
  .forEach(el => el.style.maxHeight = el.scrollHeight + 'px'));

/* --- 6. Liberação do quiz pelo player VTurb ------------------------------ */
const quizBox = $('.esconder');
let revealed = false;
function revealQuiz() {
  if (revealed) return;
  revealed = true;
  quizBox.style.display = 'block';
  $('#fb-comments').style.display = 'none';
  scrollTo_('#quiz-wrapper');
}

const player = $('vturb-smartplayer');
player?.addEventListener('player:ready', () => {
  player.displayHiddenElements(VSL_DELAY, ['.esconder'], { persist: true });
  const watch = setInterval(() => {
    if (getComputedStyle(quizBox).display === 'none') return;
    clearInterval(watch);
    revealQuiz();
  }, 300);
});
if (FALLBACK > 0) setTimeout(revealQuiz, FALLBACK * 1000);

})();
