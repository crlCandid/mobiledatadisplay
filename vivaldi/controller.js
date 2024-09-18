// ==UserScript==
// @name         controller
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @exclude      *://192.168.100.209:*/*
// @exclude      *://localhost:*/*
// @exclude      *://internaltools.ddns.nets*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let active = false;

    function handleTouch(event) {
        const numberOfTouches = event.touches.length;
        if(numberOfTouches == 3 && !active)
        {
            active = true;
            setTimeout(confirmation, 500);
        }
    }

    function confirmation(){
        const res = confirm('Desea volver al inicio de Mob2?');
        if(res){
            window.open('https://internaltools.ddns.net/display/lower', '_self');
        }

        active = false;
    }

    document.addEventListener('touchstart', handleTouch);
    document.addEventListener('touchend', handleTouch);
})();