const CACHE_NAME = 'yemen4g-ultimate-v1';
const OFFLINE_URL = 'index.html', 'https://ptc.gov.ye/?page_id=9017', 'manifest.json', 'icon-512.png', 'icon-192.png';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([OFFLINE_URL, 'manifest.json', 'icon-512.png']);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL);
            })
        );
    } else {

        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});