const guarantee = document.querySelectorAll("#guarantee");

// Set guarantee days
const guaranteeDays = "60";

guarantee.forEach(function (e) {

	if (e.classList.contains('custom')) return;

	// Product Name
	let productName = typeof e.dataset.productname !== 'undefined' ? e.dataset.productname : 'SlimRise';

	const isCartpanda = document.body.classList.contains('cartpanda');
	const isDtcPage = /\/dtc(\/|$)/.test(window.location.pathname);
	const cartpandaHideBadges = isCartpanda && !isDtcPage;
	const badgesBlock = cartpandaHideBadges
		? ''
		: `
					<div class="d-flex gap-2 flex-wrap align-items-center justify-content-center mt-4 badges">
						<figure><img src="${assetsPath}assets/gmp-badge.svg" alt="Badge"></figure>
						<figure><img src="${assetsPath}assets/fda-badge.svg" alt="Badge"></figure>
						<figure><img src="${assetsPath}assets/natural-badge.svg" alt="Badge"></figure>
						<figure><img style="display:none;" src="${assetsPath}assets/usa-badge.svg" alt="Badge" onerror="this.style.display='none'"></figure>
						<figure><img src="${assetsPath}assets/gmo-free-badge.svg" alt="Badge"></figure>
					</div>
				`;

	// Content for the guarantee section
	const guaranteeText = {

		"guaranteeTitle": `100% Satisfaction or Your Money Back<br><span class="text-green">${guaranteeDays}-Day Guarantee</span>`,

		"guaranteeContent": `We’re so confident you’ll experience real, life-changing relief that we back ${productName} with a 100% satisfaction guarantee for 60 days. Start using it as soon as it arrives, and within days, you may notice easier movement, greater comfort, and less stiffness in your joints. As you continue your journey, you could start to experience stronger knees, smoother mobility, and lasting flexibility — making it the perfect time to track your progress.<br> If after several weeks or even months you’re not completely satisfied, we’ll refund your money in full. With ${productName}, you’re truly in control of your joint health journey.`,

	}

	let displayContent = guaranteeText.guaranteeContent;
	if (cartpandaHideBadges) {
		displayContent = displayContent
			.replace(/, no questions asked\./gi, '.')
			.replace(/—no questions asked\./g, '.');
	}

	// Build the HTML for the product item
	e.innerHTML = `
		<div class="container position-relative py-5">
			<div class="row align-items-center justify-content-center">
				<div class="col-12 text-center">
					<figure><img src="${assetsPath}assets/money-back-guarantee.svg" alt="Guarantee" class="mb-3"></figure>
					<h2 class="fs-3 mb-3">${guaranteeText.guaranteeTitle}</h2>
					<div class="guarantee-content">
						<p class="m-0">${displayContent}</p>
					</div>
					${badgesBlock}
				</div>
			</div>
		</div>
		`
		;
});