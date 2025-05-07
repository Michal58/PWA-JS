window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then(() => console.log('Service Worker registered successfully.'))
            .catch((error) => console.error('Service Worker registration failed:', error));
    }
};