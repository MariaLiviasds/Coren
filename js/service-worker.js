const CACHE_NAME = 'coren-pe-cache-v4';
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/cadastro.html',
    '/login.css',
    '/cadastro.css',
    '/login.js',
    '/cadastro.js',
    '/img/Coren.webp',
    '/img/servicos.webp',
    '/img/icons/icon-192x192.webp',
    '/img/icons/icon-512x512.webp',
    '/manifest.json',
    '/sitemap.xml',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
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
            .then(response => response || fetch(event.request))
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