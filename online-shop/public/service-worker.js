const CACHE_NAME = 'app-shell-cache-v1';
const API_CACHE_NAME = 'api-cache-v1';

const APP_SHELL_FILES = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css', 
  '/icon-192x192.png', 
  '/icon-512x512.png',
  '/favicon.ico', 
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache opened');
      return cache.addAll(APP_SHELL_FILES); 
    })
  );
});


self.addEventListener('fetch', (event) => {
  console.log(`Intercepting request: ${event.request.url}`);

  if (event.request.url.includes('https://dummyjson.com/products')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            return cache.match(event.request);
          });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((response) => {
          if (event.request.url.includes('/static/js/')) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone()); 
            });
          }

          if (event.request.url.includes('/static/css/')) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone()); 
            });
          }

          return response;
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
