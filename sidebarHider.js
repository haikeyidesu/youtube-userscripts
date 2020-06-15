// ==UserScript==
// @name         Youtube SideBar Hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hides youtube sidebar in video mode
// @author       reysu
// @match      *://www.youtube.com/*
// @grant        none
// ==/UserScript==

new MutationObserver(function(mutations) {
    let styleElement = null;
    if (document.getElementsByTagName('ytd-watch-next-secondary-results-renderer')[0]) {
        var sideBar = document.querySelector("ytd-watch-next-secondary-results-renderer");
        sideBar.innerHTML = "";
   }
}).observe(document, {childList: true, subtree: true});
