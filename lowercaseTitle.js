// ==UserScript==
// @name         Youtube Titles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make video titles lowercase; port from chrome extension
// @author       reysu
// @match      *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(new MutationObserver(check)).observe(document, {childList: true, subtree: true});
function check(changes, observer) {
    if(document.querySelector('#video-title')) {
        observer.disconnect();
        let styleElement = null;
        if (document.getElementsByClassName('style-scope ytd-rich-grid-video-renderer')[1]) {
            function updateCSS(option) {
                let appendingElement = false;
                if (styleElement === null) {
                    appendingElement = true;
                    styleElement = document.createElement('style');
                }
                switch (option) {
                    case 'lowercase':
                        styleElement.innerHTML = '#video-title,.ytp-videowall-still-info-title{text-transform:lowercase;}';
                        break;
                    case 'capitalize_first_letter':
                        styleElement.innerHTML = '#video-title,.ytp-videowall-still-info-title{text-transform:lowercase;display:block!important;}#video-title::first-letter,.ytp-videowall-still-info-title::first-letter{text-transform:uppercase;}';
                        break;
                    case 'default':
                        styleElement.remove();
                        styleElement = null;
                        break;
                }
                if (appendingElement) {
                    document.head.appendChild(styleElement);
                }
            }
            updateCSS('lowercase');
        }
    }
}
