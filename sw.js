const cacheName = 'piac-pwa-v1';
const filesToCache = [
    '/PWA-JS/',
    '/PWA-JS/index.html',
    '/PWA-JS/style.css',
    '/PWA-JS/js/main.js',
    '/PWA-JS/images/favicon.svg',
    '/PWA-JS/images/favicon.ico',
    '/PWA-JS/subsites',
    '/PWA-JS/subsites/index.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request);
//         })
//     );
// });

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
}); 



self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                if (event.request.method === 'GET') {
                    return caches.open(cacheName).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                }
                return fetchResponse;
            });
        }).catch(() => {
            if (event.request.mode === 'navigate') {
                return caches.match('/PWA-JS/index.html');
            }
        })
    );
});

