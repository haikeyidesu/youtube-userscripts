// ==UserScript==
// @name         Youtube Thumbnails
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hides clickbait thumbnails; Port from Chrome Extension
// @author       reysu
// @match      *://www.youtube.com/*
// @grant        none
// ==/UserScript==

new MutationObserver(function(mutations) {
    // check at least two H1 exist using the extremely fast getElementsByTagName
    // which is faster than enumerating all the added nodes in mutations
    let styleElement = null;
    if (document.getElementsByClassName('style-scope yt-img-shadow')[1]) {
       function updateThumbnails(newImage) {
       let imgElements = document.getElementsByTagName('img');
       for (let i = 0; i < imgElements.length; i++) {
           if (imgElements[i].src.match('https://i.ytimg.com/vi/.*/(hq1|hq2|hq3|hqdefault|mqdefault|hq720).jpg?.*')) {
               let url = imgElements[i].src.replace(/(hq1|hq2|hq3|hqdefault|mqdefault|hq720).jpg/, `${newImage}.jpg`);
               if (!url.match('.*stringtokillcache')) {
                   url += '?stringtokillcache'
               }
               imgElements[i].src = url;
           }
       }
       let backgroundImgElements = document.querySelectorAll('.ytp-videowall-still-image, .iv-card-image');
       for (let i = 0; i < backgroundImgElements.length; i++) {
           let styleAttribute = backgroundImgElements[i].getAttribute('style');
           if (styleAttribute.match('.*https://i.ytimg.com/vi/.*/(hq1|hq2|hq3|hqdefault|mqdefault|hq720).jpg?.*')) {
               let newStyleAttribute = styleAttribute.replace(/(hq1|hq2|hq3|hqdefault|mqdefault|hq720).jpg/, `${newImage}.jpg`);
               if (!newStyleAttribute.match('.*stringtokillcache.*')) {
                   // messes up existing query parameters that might be there, but that's ok.
                   newStyleAttribute = newStyleAttribute.replace(/"\);$/, '?stringtokillcache");')
               }
               backgroundImgElements[i].style = newStyleAttribute;
           }
       }
   }
    updateThumbnails('hq2');
   }
}).observe(document, {childList: true, subtree: true});
