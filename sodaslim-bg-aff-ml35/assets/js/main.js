/* =========================================================
   CONFIG — edite aqui
   ========================================================= */


var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
var scrollToEl = function (el) { if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

/* ---------- Back-redirect ---------- */
if (CONFIG.backRedirect) {
  history.pushState({}, '', location.href);
  history.pushState({}, '', location.href);
  window.addEventListener('popstate', function () { location.href = CONFIG.backRedirect; });
}

/* ---------- VTurb: revela o quiz no pitch ---------- */
(function () {
  var player = $('vturb-smartplayer');
  if (player) {
    player.addEventListener('player:ready', function () {
      player.displayHiddenElements(player.config.pitchTime, ['.esconder'], { persist: true });
    });
  }
  // Quando o quiz aparecer: esconde comentários e rola até ele
  var wrap = $('.esconder');
  var timer = setInterval(function () {
    if (getComputedStyle(wrap).display === 'none') return;
    clearInterval(timer);
    $('#fb-comments').style.display = 'none';
    scrollToEl($('#quiz-wrapper'));
  }, 500);
})();

/* =========================================================
   QUIZ
   ========================================================= */
var TOTAL_STEPS = 5;
var currentStep = 1;
var answers = { goals: [], age: '', currentWeight: '', weight: '', symptoms: [] };

function setProgress(pct, label) {
  $('#progress-fill').style.width = pct + '%';
  $('#step-label').textContent = label;
  $('#pct-label').textContent = pct + '%';
}

function showStep(id) {
  $$('#perguntas .step.active, #result.active').forEach(function (s) { s.classList.remove('active'); });
  var el = document.getElementById(id);
  el.classList.add('active');
  void el.offsetWidth;
  el.classList.add('step-enter');
}

function selectedLabels(stepEl) {
  return $$('.option-btn.selected', stepEl).map(function (b) {
    return $('.opt-label', b).childNodes[0].textContent.trim();
  });
}

function toggleMulti(btn, n) {
  btn.classList.toggle('selected');
  var stepEl = $('#step-' + n);
  var list = selectedLabels(stepEl);
  var next = $('#next-' + n);
  if (next) next.classList.toggle('visible', list.length > 0);
  if (n === 1) answers.goals = list;
  if (n === 5) answers.symptoms = list;
}

function autoAdvance(btn, n, field, value, next) {
  $$('.option-btn', $('#step-' + n)).forEach(function (b) { b.classList.remove('selected'); });
  btn.classList.add('selected');
  answers[field] = value;
  setTimeout(function () { goTo(next); }, 360);
}

function goTo(n) {
  currentStep = n;
  showStep('step-' + n);
  var pct = Math.round(n / TOTAL_STEPS * 100);
  setProgress(pct, 'Step ' + n + ' of ' + TOTAL_STEPS);
  scrollToEl($('#quiz-wrapper'));
}

function showResult() {
  showStep('loading');
  setProgress(90, 'Almost there...');
  scrollToEl($('#quiz-wrapper'));

  var msgs = ['Reviewing your profile...', 'Calculating your dosage...', 'Preparing your personalized formula...'];
  var textEl = $('#loading-text');
  var i = 0;
  var iv = setInterval(function () {
    if (++i >= msgs.length) return;
    textEl.style.animation = 'none';
    void textEl.offsetWidth;
    textEl.style.animation = 'fadeSwap 0.4s ease both';
    textEl.textContent = msgs[i];
  }, 2000);

  setTimeout(function () {
    clearInterval(iv);
    buildResult();
    setProgress(100, 'Complete!');
    $('#loading').classList.remove('active');
    $('#perguntas').style.display = 'none';
    $('#result-col').style.display = 'block';
    $('#quizStatus').classList.add('show');
    showStep('result');
    scrollToEl($('#quizStatus'));
  }, 6500);
}

function buildResult() {
  var ages = { '18–24': '18–24 years old', '25–34': '25–34 years old', '35–44': '35–44 years old', '45–54': '45–54 years old', '55+': '55+ years old' };
  var goals = answers.goals.length ? answers.goals.join(', ') : 'General wellness';
  var symptoms = answers.symptoms.filter(function (s) { return s !== 'None of the above'; }).join(', ');
  $('#profile-rows').innerHTML =
    '<div class="profile-line">🎯 <strong>Goal:</strong> ' + goals + '</div>' +
    '<div class="profile-line">👤 <strong>Age:</strong> ' + (ages[answers.age] || answers.age) + '</div>' +
    '<div class="profile-line">⚖️ <strong>Current weight:</strong> ' + answers.currentWeight + '</div>' +
    '<div class="profile-line">📉 <strong>Weight to lose:</strong> ' + answers.weight + '</div>' +
    (symptoms ? '<div class="profile-line">⚠️ <strong>Symptoms:</strong> ' + symptoms + '</div>' : '');
}

function restartQuiz() {
  $('#quiz-wrapper').style.display = 'block';
  $('#perguntas').style.display = 'block';
  $('#quizStatus').classList.remove('show');
  $('#result-col').style.display = 'none';
  $$('#perguntas .selected, #perguntas .next-btn.visible').forEach(function (el) { el.classList.remove('selected', 'visible'); });
  answers = { goals: [], age: '', currentWeight: '', weight: '', symptoms: [] };
  goTo(1);
}

function showAfterQuiz() {
  $('#quizStatus').style.display = 'none';
  $('#quiz-wrapper').style.display = 'none';
  var after = $('.after-quiz');
  after.style.display = 'block';
  scrollToEl(after);
}
