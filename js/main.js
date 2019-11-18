'use strict';

const mee = 'meeDamian';

console.info(`It's a lot easier to see the source code here: https://github.com/${mee}/${mee}.github.io`);

// Github stuff
(doc => {
    function getApiUrl(endpoint, fn) {
        let url = `https://api.github.com/repos/${mee}/${mee}.github.io`;

        if (endpoint) {
            url += `/${endpoint}`;
        }

        return `${url}?callback=${mee}.${fn}`
    }

    const getEl = doc.getElementById;
    const setText = (elId, text) => getEl(elId).textContent = text;

    function showWhenReady(elId, ready = false) {
        return cb => {
            return data => {
                cb(data);

                if (ready) {
                    getEl(elId).style.display = 'block';
                }

                ready = true;
            };
        };
    }


    const showInfoBox = showWhenReady('github-repo-info');

    if (!window[mee]) {
        window[mee] = {};
    }

    function setupNode(endpoint, cbFn, processFn) {
        loadScript(getApiUrl(endpoint, cbFn));

        window[mee][cbFn] = showInfoBox(processFn);
    }

    setupNode(undefined, 'processStars', ({data}) => {
        setText('stargazers', data['stargazers_count']);
    });

    setupNode('contributors', 'processCommits', ({data}) => {
        setText('history',
            Object.values(data).filter(({login}) => login === mee)[0]['contributions'] || 0
        );
    });
})(document);

window.newTab = (url, delay = 300) => {
    if (url === 'refresh') {
        location.reload();
        return;
    }

    setTimeout(() => {
        window.open(url, '_blank').focus();
    }, delay);
};

window.properShare = (url, height, width) => {
    if (!height || !width) {
        newTab(url, 0);
        return;
    }

    window.open(url, '', `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=${height},width=${width}`);
};

const ref = document.getElementsByTagName('video');
for (let i = 0; i < ref.length; i++) {
    const v = ref[i];

    // v.addEventListener('play', v.play, false);

    v.onclick = () => {
        v.paused ? v.play() : v.pause();
        return false;
    };
}
