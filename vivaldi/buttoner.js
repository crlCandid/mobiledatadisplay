// ==UserScript==
// @name         buttoner
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a custom button to the webpage
// @match        *://*/*
// @exclude      *://192.168.100.209:*/*
// @exclude      *://localhost:*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create a new button element
    const button = document.createElement('button');
    button.innerHTML = 'Volver a Inicio';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#dc004e';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.zIndex = '9999';
    button.style.cursor = 'pointer';

    // Add an event listener to the button
    button.addEventListener('click', () => {
        window.open('http://192.168.100.209:3000/display/lower', '_self');
    });

    // Append the button to the body
    document.body.appendChild(button);
})();
