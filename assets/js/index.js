'use strict';

// toggle `className` on all provided `elements`
const classToggle = (className, ...elements) => elements.forEach(({classList}) => classList.toggle(className));

function registerListener(selector, event, fn) {
	document.querySelectorAll(selector).forEach(el => el.addEventListener(event, () => fn(el)));
}

const onClick = (selector, fn) => registerListener(selector, 'click', fn);

function initNavBurger() {
	onClick('.navbar-burger', el => {
		classToggle('is-active', el, document.getElementById(el.dataset.target));
	});
}

function initSomething1() {
	onClick('.card', el => {
		if (!el.hasAttribute('data-target')) {
			return;
		}

		classToggle('is-active', el);
		document.getElementsByTagName('html')[0].classList.add('modal-open');
	});
}

const initLocalTime = () => {
	const tNode = document.getElementById('time');

	const updateLocalTime = () => {
		tNode.innerHTML = (new Date()).toLocaleTimeString([], {
			timeZone: tNode.getAttribute('data-time-zone'),
			hour12: false,
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	setTimeout(updateLocalTime, 0);
	setInterval(updateLocalTime, 1e3);
};

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

document.addEventListener("DOMContentLoaded", () => {
	initNavBurger();
	initSomething1();
	initLocalTime();
	doQR('btc-qr');
	doQR('ln-qr');
});

// $(".modal-close").click(function () {
// 	$($(this).attr("data-target")).removeClass("is-active");
// 	$("html").removeClass("modal-open");
// });
//
// $(document).keypress(e => {
// 	if (e.which !== 0) {
// 		return;
// 	}
//
// 	$(".modal.is-active").removeClass("is-active");
// 	$("html").removeClass("modal-open");
// });
//
//



