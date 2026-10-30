/* AlkaMelt VSL — single script, vanilla JS, no dependencies */
(() => {
	const $ = (s, c = document) => c.querySelector(s);
	const $$ = (s, c = document) => [...c.querySelectorAll(s)];

	/* ---------- Config ---------- */
	const REVEAL_AT = 2530;          // seconds into the VSL when the quiz appears (VTurb)
	const STOCK_MIN = 48;            // "bottles remaining" floor
	const scrollTo = el => el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });

	/* ---------- Reusable blocks (offer + guarantee) ---------- */
	$$('[data-tpl]').forEach(slot => slot.replaceWith($('#' + slot.dataset.tpl).content.cloneNode(true)));

	/* ---------- Forward URL params (utm_*, subids…) to checkout links ---------- */
	if (location.search) {
		const params = new URLSearchParams(location.search);
		$$('a.buylink').forEach(a => {
			const has = new URL(a.href).searchParams, extra = [];
			params.forEach((v, k) => has.has(k) || extra.push(encodeURIComponent(k) + '=' + encodeURIComponent(v)));
			if (extra.length) a.href += (a.href.includes('?') ? '&' : '?') + extra.join('&');
		});
	}

	/* ---------- VTurb: reveal quiz at REVEAL_AT ---------- */
	const hidden = $('.esconder');
	const player = $('vturb-smartplayer');
	player?.addEventListener('player:ready', () => player.displayHiddenElements(REVEAL_AT, ['.esconder'], { persist: true }));

	new MutationObserver((_, obs) => {
		if (getComputedStyle(hidden).display === 'none') return;
		obs.disconnect();
		$('#fb-comments').hidden = true;
		scrollTo($('#quiz-box'));
	}).observe(hidden, { attributes: true });

	/* ---------- Quiz ---------- */
	// option: [icon, label, sub, value, fullWidth]
	const STEPS = [
		{ key: 'goals', multi: true, title: 'Your Goals', q: 'What are your main goals right now?', hint: 'Select all that apply — then hit Continue.',
			opts: [['🔥', 'Faster fat burning'], ['🍽️', 'Control appetite & cravings'], ['😌', 'Reduce bloating'], ['⚡', 'More daily energy'], ['✨', 'Younger-looking skin'], ['🧠', 'Better focus & mood']] },
		{ key: 'age', cols: 2, title: 'About You', q: 'What is your age range?', hint: 'This helps us calibrate your formula.',
			opts: [['', '18 – 24 years', '', '18–24 years old'], ['', '25 – 34 years', '', '25–34 years old'], ['', '35 – 44 years', '', '35–44 years old'], ['', '45 – 54 years', '', '45–54 years old'], ['', '55 years or older', '', '55+ years old', 1]] },
		{ key: 'currentWeight', title: 'Your Body', q: 'What is your current weight range?', hint: 'Your formula is calibrated to your body.',
			opts: [['', 'Under 140 lbs', 'Under 63 kg'], ['', '140–169 lbs', '63–76 kg'], ['', '170–199 lbs', '77–90 kg'], ['', '200–229 lbs', '91–103 kg'], ['', '230 lbs or more', '104+ kg']] },
		{ key: 'weight', cols: 2, title: 'Your Goal', q: 'How much weight would you like to lose?', hint: 'Choose your primary goal.',
			opts: [['🎯', '1–25 lbs', 'Light cut'], ['🔥', '26–50 lbs', 'Moderate loss'], ['💎', '51–80 lbs', 'Significant loss'], ['🚀', '80+ lbs', 'Major transformation']] },
		{ key: 'symptoms', multi: true, cols: 2, title: 'Symptoms', q: 'Which of these do you currently experience?', hint: 'Select all that apply — then hit Continue.',
			opts: [['😴', 'Fatigue & low energy'], ['🫃', 'Belly bloating'], ['🍫', 'Sugar cravings'], ['🌡️', 'Slow metabolism'], ['😟', 'Mood swings'], ['🔁', 'Weight keeps coming back'], ['✅', 'None of the above', '', '', 1]] }
	];
	const TOTAL = STEPS.length;
	const LOADING_MSGS = ['Reviewing your profile...', 'Calculating your dosage...', 'Preparing your personalized formula...'];

	const box = $('#quiz-box'), card = $('#perguntas'), status = $('#quizStatus'), offer = $('.after-quiz');
	let answers = {};

	card.innerHTML = STEPS.map((s, i) => `
		<div class="step" data-step="${i + 1}">
			<div class="step-eyebrow">Step ${i + 1} — ${s.title}</div>
			<div class="step-question">${s.q}</div>
			<div class="step-hint">${s.hint}</div>
			<div class="options${s.cols ? ' cols-2' : ''}">${s.opts.map(([icon, label, sub, value, full]) =>
				`<button type="button" class="option-btn${full ? ' full' : ''}" data-v="${value || label}">${icon ? `<span class="opt-icon">${icon}</span>` : ''}<span class="opt-label">${label}${sub ? `<span class="opt-sub">${sub}</span>` : ''}</span></button>`).join('')}</div>
			<div class="btn-row">${i ? `<button type="button" class="back-btn" data-go="${i}">← Back</button>` : ''}${s.multi ? `<button type="button" class="next-btn">${i === TOTAL - 1 ? 'See My Plan →' : 'Continue →'}</button>` : ''}</div>
		</div>`).join('') + `
		<div class="step" data-step="loading"><div class="loading"><div class="spinner"></div><div id="loading-text">${LOADING_MSGS[0]}</div><div class="loading-sub">Please wait</div></div></div>`;

	const setProgress = (pct, label) => {
		$('#progress-fill').style.width = pct + '%';
		$('#pct-label').textContent = pct + '%';
		$('#step-label').textContent = label;
	};

	const show = (n, scroll = true) => {
		$$('.step', card).forEach(s => s.classList.toggle('active', s.dataset.step == n));
		if (n !== 'loading') setProgress(Math.round(n / TOTAL * 100), `Step ${n} of ${TOTAL}`);
		if (scroll) scrollTo(box);
	};

	card.addEventListener('click', e => {
		const btn = e.target.closest('button');
		if (!btn) return;
		const stepEl = btn.closest('.step'), n = +stepEl.dataset.step, step = STEPS[n - 1];

		if (btn.dataset.go) return show(+btn.dataset.go);
		if (btn.classList.contains('next-btn')) return n === TOTAL ? showResult() : show(n + 1);

		if (step.multi) {
			btn.classList.toggle('selected');
			answers[step.key] = $$('.selected', stepEl).map(b => b.dataset.v);
			$('.next-btn', stepEl).classList.toggle('visible', answers[step.key].length > 0);
		} else {
			$$('.option-btn', stepEl).forEach(b => b.classList.toggle('selected', b === btn));
			answers[step.key] = btn.dataset.v;
			setTimeout(() => show(n + 1), 360);
		}
	});

	function showResult() {
		show('loading');
		setProgress(90, 'Almost there...');
		const text = $('#loading-text');
		let i = 0;
		const timer = setInterval(() => {
			if (++i >= LOADING_MSGS.length) return;
			text.textContent = LOADING_MSGS[i];
			text.style.animation = 'none'; void text.offsetWidth; text.style.animation = '';
		}, 2000);

		setTimeout(() => {
			clearInterval(timer);
			const a = answers, symptoms = (a.symptoms || []).filter(s => s !== 'None of the above');
			const rows = [['🎯', 'Goal', (a.goals || []).join(', ') || 'General wellness'], ['👤', 'Age', a.age], ['⚖️', 'Current weight', a.currentWeight], ['📉', 'Weight to lose', a.weight]];
			if (symptoms.length) rows.push(['⚠️', 'Symptoms', symptoms.join(', ')]);
			$('#profile-rows').innerHTML = rows.map(([i, k, v]) => `<div class="profile-line">${i} <strong>${k}:</strong> ${v || ''}</div>`).join('');

			setProgress(100, 'Complete!');
			card.hidden = true;
			status.hidden = false;
			scrollTo(status);
		}, 6500);
	}

	$('#redo').addEventListener('click', () => {
		answers = {};
		$$('.selected', card).forEach(b => b.classList.remove('selected'));
		$$('.next-btn', card).forEach(b => b.classList.remove('visible'));
		status.hidden = true;
		card.hidden = false;
		show(1);
	});

	$('#cta').addEventListener('click', () => {
		box.hidden = status.hidden = true;
		offer.hidden = false;
		scrollTo(offer);
		startStock();
	});

	/* ---------- "Bottles remaining" countdown ---------- */
	function startStock() {
		const els = $$('.countdown');
		let n = parseInt(els[0].textContent, 10);
		const t = setInterval(() => {
			n = Math.max(n - 6, STOCK_MIN);
			els.forEach(el => el.textContent = n);
			if (n === STOCK_MIN) clearInterval(t);
		}, 8000);
	}

	show(1, false);
})();
