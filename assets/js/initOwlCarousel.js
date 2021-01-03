'use strict';

document.querySelectorAll('.own-carousel')
	.forEach(el => {
		el.owlCarousel({
			autoHeight: true,
			loop: true,
			nav: true,
			margin: 10,
			items: 1
		});
	});

