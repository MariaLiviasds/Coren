const CACHE_NAME = 'coren-pe-v6';
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
    '/img/Coren.webp',
    '/img/servicos.webp',
    '/img/icons/icon-192x192.webp',
    '/img/icons/icon-512x512.webp',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-512x512.png',
    '/manifest.json',
    '/offline.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
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