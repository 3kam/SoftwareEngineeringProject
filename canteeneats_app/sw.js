// sw.js - Root Service Worker
const CACHE_NAME = 'canteen-eats-v1';

// All the HTML routes and static assets to store for offline/instant loading
const ASSETS_TO_CACHE = [
    '/',
    '/login',
    '/register',
    '/about',
    '/menu',
    '/my_orders',
    '/edit_account',
    '/manage_orders'
];

// 1. INSTALL EVENT: Creates the cache storage and downloads the asset shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching application routes');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    // Forces the waiting service worker to become the active service worker immediately
    self.skipWaiting();
});

// 2. ACTIVATE EVENT: Cleans up older cache versions when you update your app
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting obsolete cache store:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    // Allows the service worker to claim control over all open pages immediately
    self.clients.claim();
});

// 3. FETCH EVENT: Intercepts network requests to serve assets instantly
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // CRITICAL SECURITY BYPASS: Never cache database API queries, login or registration routes
    if (url.pathname.includes('/auth/') || url.pathname.includes('/api/')) {
        return; 
    }

    // STRATEGY: Network-First for HTML pages (navigation)
    // Ensures students see live stock/balances when online, but the app still opens when offline
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Check for a valid network response before updating the cache snapshot
                    if (response && response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Offline fallback: Serve the cached page or redirect to main menu
                    return caches.match(event.request) || caches.match('/menu');
                })
        );
        return;
    }

    // STRATEGY: Cache-First for assets (Images, CSS, scripts, fonts)
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; // Return from local cache instantly
            }
            return fetch(event.request); // Fallback to live server fetch
        })
    );
});