'use strict';

// toggle `className` on all provided `elements`
const classToggle = (className, ...elements) => elements.forEach(({classList}) => classList.toggle(className));

function registerListener(selector, event, fn) {
	document.querySelectorAll(selector).forEach(el => {
		el.addEventListener(event, () => fn(el))
	});
}

function initNavBurger() {
	registerListener('.navbar-burger', 'click', el => {
		classToggle('is-active', el, document.getElementById(el.dataset.target));
	});
}

function initSomething1() {
	registerListener('.card', 'click', el => {
		if (!el.hasAttribute('data-target')) {
			return;
		}

		classToggle('is-active', el);
		document.getElementsByTagName('html')[0].classList.add('modal-open');
	});
}

document.addEventListener("DOMContentLoaded", () => {
	initNavBurger();
	initSomething1();
});


$(".modal-close").click(function () {
	$($(this).attr("data-target")).removeClass("is-active");
	$("html").removeClass("modal-open");
});

$(document).keypress(e => {
	if (e.which !== 0) {
		return;
	}

	$(".modal.is-active").removeClass("is-active");
	$("html").removeClass("modal-open");
});

function doQR(id) {
	document.querySelectorAll(`#${id} div`)
		.forEach((el = {}) => {
			const {parentElement} = el;
			const {pre = '', payload = ''} = parentElement.dataset || {};

			const qr = qrcode(0, 'L');
			qr.addData(pre.toUpperCase(), 'Alphanumeric');
			const chunks = payload.split('@');

			qr.addData(chunks[0].toUpperCase(), 'Alphanumeric');

			if (chunks.length > 1) {
				qr.addData('@');
				qr.addData(chunks[1].toUpperCase(), 'Alphanumeric');
			}

			qr.make();

			el.innerHTML = qr.createSvgTag({scalable: true, margin: 2, title: payload});
		});
}

$(() => {
	doQR('btc-qr');
	doQR('ln-qr');
});

