const CACHE_NAME = 'coren-pe-v17';
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/cadastro.html',
    '/css/styles.css',
    '/css/login.css',
    '/css/cadastro.css',
    '/js/login.js',
    '/js/cadastro.js',
    '/js/sw-register.js',
    '/img/Coren.webp',
    '/img/servicos.webp',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-512x512.png',
    '/img/icons/icon-192x192.webp',
    '/img/icons/icon-512x512.webp',
    '/manifest.json',
    '/offline.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).catch(() => {
                    return caches.match('/offline.html');
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});