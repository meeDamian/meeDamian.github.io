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

// Import face tracker
// Note: In Hugo, we'll need to include this via baseof.html instead
// This is a placeholder for the initialization logic

const initFaceTracker = () => {
	const avatarImg = document.getElementById('face-tracker-avatar');
	const aboutSection = document.getElementById('about');
	
	if (!avatarImg || !aboutSection) {
		return;
	}

	// Grid configuration (must match image generation parameters)
	const P_MIN = -15;
	const P_MAX = 15;
	const STEP = 2;
	const SIZE = 256;
	
	// Center gaze image (closest to 0,0 which is 1,1 in our odd-numbered grid)
	const centerImage = '/faces/gaze_px1p0_py1p0_256.webp';

	const quantizeToGrid = (val) => {
		const raw = P_MIN + (val + 1) * (P_MAX - P_MIN) / 2; // [-1,1] -> [-15,15]
		// Round to nearest STEP, but ensure we land on the actual grid (odd numbers)
		let snapped = Math.round(raw / STEP) * STEP;
		// Since P_MIN=-15 is odd and STEP=2, all valid values are odd
		// If snapped is even, adjust to nearest odd
		if (snapped % 2 === 0) {
			// Choose nearest odd number
			snapped = raw > snapped ? snapped + 1 : snapped - 1;
		}
		return Math.max(P_MIN, Math.min(P_MAX, snapped));
	};

	const gridToFilename = (px, py) => {
		const sanitize = (val) => {
			// Ensure we have a decimal point (add .0 if integer)
			let str = val.toString();
			if (!str.includes('.')) {
				str += '.0';
			}
			// Replace minus with 'm', then replace decimal point with 'p'
			return str.replace('-', 'm').replace('.', 'p');
		};
		return `gaze_px${sanitize(px)}_py${sanitize(py)}_${SIZE}.webp`;
	};

	const updateGaze = (clientX, clientY) => {
		const rect = avatarImg.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const nx = (clientX - centerX) / (rect.width / 2);
		const ny = (clientY - centerY) / (rect.height / 2);

		const clampedX = Math.max(-1, Math.min(1, nx));
		const clampedY = Math.max(-1, Math.min(1, -ny)); // Invert Y-axis

		const px = quantizeToGrid(clampedX);
		const py = quantizeToGrid(clampedY);

		const filename = gridToFilename(px, py);
		const imagePath = `/faces/${filename}`;

		// Debug logging (remove after testing)
		// console.log(`Mouse: (${clientX}, ${clientY}) -> Normalized: (${nx.toFixed(2)}, ${ny.toFixed(2)}) -> Grid: (${px}, ${py}) -> ${filename}`);

		if (!avatarImg.src.endsWith(imagePath)) {
			avatarImg.src = imagePath;
		}
	};

	const handleMouseMove = (e) => updateGaze(e.clientX, e.clientY);
	const handleTouchMove = (e) => {
		if (e.touches.length > 0) {
			updateGaze(e.touches[0].clientX, e.touches[0].clientY);
		}
	};

	const handleMouseLeave = () => {
		// Return to center gaze when leaving the about section
		avatarImg.src = centerImage;
	};

	// Add listeners to the about section only
	aboutSection.addEventListener('mousemove', handleMouseMove);
	aboutSection.addEventListener('touchmove', handleTouchMove, { passive: true });
	aboutSection.addEventListener('mouseleave', handleMouseLeave);

	// Initial state: set to center gaze
	avatarImg.src = centerImage;
};

const initProjectsCarousel = () => {
	const carousel = document.querySelector('.projects-carousel');
	const scrollHint = document.querySelector('.scroll-hint');
	
	if (!carousel || !scrollHint) {
		return;
	}

	// Hide scroll hint after user scrolls
	let hasScrolled = false;
	carousel.addEventListener('scroll', () => {
		if (!hasScrolled && carousel.scrollLeft > 50) {
			hasScrolled = true;
			scrollHint.style.opacity = '0';
			scrollHint.style.transition = 'opacity 0.5s ease';
		}
	});

	// Also hide on touch/mouse interaction
	carousel.addEventListener('touchstart', () => {
		scrollHint.style.opacity = '0';
	}, { once: true });
};

const initVideoModal = () => {
	const modal = document.getElementById('video-modal');
	const videoPlayer = document.getElementById('video-player');
	const videoSource = videoPlayer.querySelector('source');
	const closeBtn = document.querySelector('.video-modal-close');
	const overlay = document.querySelector('.video-modal-overlay');
	
	if (!modal || !videoPlayer) {
		return;
	}

	// Open video modal when clicking cards with video
	document.addEventListener('click', (e) => {
		const card = e.target.closest('.project-card.has-video');
		if (card) {
			const videoUrl = card.dataset.video;
			if (videoUrl) {
				videoSource.src = videoUrl;
				videoPlayer.load();
				modal.classList.add('active');
				document.body.style.overflow = 'hidden';
				videoPlayer.play();
			}
		}
	});

	// Close modal
	const closeModal = () => {
		modal.classList.remove('active');
		document.body.style.overflow = '';
		videoPlayer.pause();
		videoPlayer.currentTime = 0;
	};

	closeBtn.addEventListener('click', closeModal);
	overlay.addEventListener('click', closeModal);
	
	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			closeModal();
		}
	});
};

document.addEventListener("DOMContentLoaded", () => {
	initNavBurger();
	initSomething1();
	initLocalTime();
	initFaceTracker();
	initProjectsCarousel();
	initVideoModal();
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



