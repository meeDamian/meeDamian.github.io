'use strict';

(() => {
	const updateLocalTime = (() => {
		const tNode = document.getElementById('time');
		const tz = tNode.getAttribute('data-time-zone');
		const fmt = tNode.getAttribute('data-time-format');

		return () => tNode.innerHTML = moment().tz(tz).format(fmt);
	})();

	setTimeout(updateLocalTime, 0);
	setInterval(updateLocalTime, 1e3);
})();


