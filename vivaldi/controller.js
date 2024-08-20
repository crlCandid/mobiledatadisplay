// ==UserScript==
// @name         controller
// @namespace    http://tampermonkey.net/
// @version      2024-08-14
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @exclude      *://192.168.100.209:*/*
// @exclude      *://localhost:*/*
// @exclude      *://accounts.google.com*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const minute = 60000;

    let timer = setTimeout(() => {
            window.open('http://192.168.100.209:3000/display/lower', '_self');
        }, 5000);

    document.addEventListener('mousemove', () => {
        if(timer !== undefined){
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            window.open('http://192.168.100.209:3000/display/lower', '_self');
        }, 5000);
    });
})();