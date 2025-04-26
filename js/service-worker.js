const CACHE_NAME = 'coren-pe-cache-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/login.css',
  '/css/cadastro.css',
  '/css/offline.css',
  '/js/cadastro.js',
  '/js/login.js',
  '/img/icons/icon-192x192.webp',
  '/img/icons/icon-512x512.webp',
  '/img/banner-cadastro.webp',
  '/img/banner-login.webp',
  '/img/Coren.webp',
  '/login.html',
  '/cadastro.html',
  '/offline.html',
  '/js/service-worker.js',
  '/manifest.json',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(err => {
      console.error('Erro ao cachear recursos:', err);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        return caches.match('/offline.html'); // Fallback para offline
      });
    })
  );
});