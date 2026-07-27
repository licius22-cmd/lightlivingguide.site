function renderProducts() {
	const product = document.querySelectorAll("section.products a");

	product.forEach(function(e) {
	// Só processa <a> que têm dados de produto (evita alterar outros links dentro da section)
	if (!e.dataset.offer && !e.dataset.bottles) return;

	let offer = e.dataset.offer;
	let headline = e.dataset.headline;
	let description = e.dataset.description;
	let bottles = parseFloat(e.dataset.bottles);
	let supply = typeof e.dataset.supply !== 'undefined' ? e.dataset.supply : bottles * 30;
	let name = typeof e.dataset.name !== 'undefined' ? e.dataset.name : bottles;
	let guarantee = e.dataset.guarantee;
	let image = e.dataset.image;
	let total = parseFloat(e.dataset.total);
	let full = typeof e.dataset.full !== 'undefined' ? parseFloat(e.dataset.full) : 179 * bottles;
	let valueRound = (e.dataset.valueRound || 'no').toLowerCase() === 'yes';
	let pricePerBottle = total / bottles;
	let price;
	if (typeof e.dataset.price !== 'undefined') {
		price = e.dataset.price;
	} else if (valueRound) {
		// Abaixo de 50 centavos arredonda para baixo; 50 ou mais arredonda para cima
		price = Math.round(pricePerBottle).toString();
	} else {
		price = formatPrice(pricePerBottle);
	}
	let shippingVal = e.dataset.shipping;
	let shippingClass = (shippingVal && String(shippingVal).toLowerCase() === 'free') ? 'shipping free' : 'shipping';
	let shipping = typeof shippingVal !== 'undefined' ? `<div class="${shippingClass}">+&nbsp;<span>${shippingVal}</span> ${document.body.classList.contains('digistore24') ? 'US SHIPPING' : 'SHIPPING'}</div>` : "";
	let cards = "";
	let savings = full - total;
	// data-button-text → dataset.buttonText; data-aux → dataset.aux (texto abaixo do botão)
	let buttonText = e.dataset.buttonText ?? e.getAttribute("data-button-text") ?? "BUY NOW";
	let buttonTextAux = e.dataset.aux ?? e.getAttribute("data-aux") ?? "";
	if (!buttonTextAux && e.getAttribute("data-button-text-aux")) {
		buttonTextAux = e.getAttribute("data-button-text-aux");
	}

	// Format price to 2 decimal places if it is not an integer
	function formatPrice(p) {
		if (p % 1 === 0) {
			return p.toString();
		} else {
			const [intPart, decimalPart] = p.toFixed(2).split('.');
			return `${intPart}<sup class="decimal">.${decimalPart}</sup>`;
		}
	}

	// Change buy button text for upsells
	if (['upsell1', 'upsell2', 'upsell3', 'downsell1', 'downsell2'].includes(document.body.id)) {
		buttonText = document.body.classList.contains('digistore24') ? "ADD TO MY ORDER" : "UPGRADE MY ORDER";
		buttonTextAux = document.body.classList.contains('digistore24') ? "ADD TO MY ORDER" : "UPGRADE MY ORDER";
	}

	// Show singular text for 1 bottle
	if (typeof e.dataset.name == 'undefined') {
		if ( bottles == 1 ) name += ' Bottle';
		else name += ' Bottles';
	}

	// Show different cards for promo and regular offers
	if ( offer == 'promo') cards = "assets/cards-dark.webp";
	else cards = "assets/cards.webp";

	// Render only when attribute exists (avoid "undefined" in output)
	const headerDescription = typeof description !== 'undefined' && description !== ''
		? `<div class="item-header-description">${description}</div>` : '';
	const headerHeadline = typeof headline !== 'undefined' && headline !== ''
		? `<div class="item-header">${headline}</div>` : '';
	// Mobile: "6 Bottles" + "180 Day Supply" (visível só no mobile)
	const itemMobileTitle = `<div class="item-mobile-title"><span class="line1">${name}</span><span class="line2">${supply} Day Supply</span></div>`;
	const cardHeaderBlock = (headerHeadline || headerDescription || itemMobileTitle)
		? `<div class="card-header">${headerHeadline}${headerDescription}${itemMobileTitle}</div>` : '';
	const imgBlock = typeof image !== 'undefined' && image !== ''
		? `<img src="${assetsPath}assets/${image}" alt="${bottles}">` : '';
	const guaranteeBlock = typeof guarantee !== 'undefined' && guarantee !== ''
		? `<div><span>${guarantee} DAYS GUARANTEE</span></div>` : '';
	const itemClass = typeof offer !== 'undefined' && offer !== '' ? offer : '';

	// Build the HTML for the product item
	e.innerHTML = `
		<div class="item ${itemClass}">
			<div class="wrapper">
				${cardHeaderBlock}
				<div class="item-img">
					${imgBlock}
					<img src="${assetsPath}assets/guarantee-badge.png" alt="100% Money Back Guaranteed" class="guarantee-badge" onerror="this.style.display='none'">
				</div>
				<div class="item-info">
					<div class="price">
						<b><sup>$</sup>${price}</b><span>Per<br>Bottle</span>
					</div>
					<div class="savings">
						<div><span>YOU SAVE $${savings}!</span></div>
						<div><span>BIGGEST DISCOUNT</span></div>
						<div class="guarantee">${guaranteeBlock}</div>
					</div>
				</div>
				<div class="item-buy">
					<div class="button">
						<div><span class="button-text">${buttonText}</span></div>
						<div><span class="button-text-aux">${buttonTextAux}</span></div>
					</div>
					<img src="${assetsPath}${cards}" alt="Cards" class="card-flags">
				</div>
				<div class="item-totals">
					<div class="totals"><span class="totals-label-mobile">Total: </span><s class="full-price">$${full}</s> <b class="total-price">$${total}</b></div>
					${shipping}
				</div>
			</div>
		</div>
		`
	;
	});
}

// Executa quando o DOM estiver pronto (garante que data-* foram parseados)
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", renderProducts);
} else {
	renderProducts();
}

// Hide Totals
window.addEventListener('DOMContentLoaded', () => {
	const pageParam = new URLSearchParams(window.location.search).get('pg');

	if ( document.body.classList.contains("clickbank") && !(pageParam || document.body.id === 'vsl' || document.body.id === 'dtc' || document.body.id === 'ecom') ) {
		document.querySelectorAll(".totals s").forEach(e => e.style.display = "none");
		document.querySelectorAll(".savings").forEach(e => e.style.display = "none");
		document.querySelectorAll(".totals").forEach(e => e.style.fontSize = "1.6em");
	}
});