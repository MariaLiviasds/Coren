// Versão do cache
const CACHE_NAME = 'coren-pe-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/login.html',
    '/cadastro.html',
    '/offline.html',
    '/css/styles.css',
    '/css/login.css',
    '/css/cadastro.css',
    '/css/offline.css',
    '/img/Coren.webp',
    '/img/servicos.webp',
    '/img/icons/icon-192x192.webp',
    '/img/icons/icon-512x512.webp',
    '/img/icons/icon-192x192.webp',
    '/img/icons/icon-512x512.webp',
    '/js/login.js',
    '/js/cadastro.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting(); // Força o Service Worker a ativar imediatamente
});

// Ativação do Service Worker
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
    self.clients.claim(); // Toma controle imediato das páginas
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Estratégia: Cache-first para recursos estáticos
    if (STATIC_ASSETS.includes(url.pathname) || url.pathname.startsWith('/img/') || url.pathname.startsWith('/css/') || url.pathname.startsWith('/js/')) {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request).then(fetchResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
    // Estratégia: Network-first para navegação
    else {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match('/offline.html');
            })
        );
    }
});