// Service Worker for Spiritual Tracker PWA
const CACHE_NAME = 'spiritual-tracker-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/static/icons/icon-16x16.png',
  '/static/icons/icon-32x32.png',
  '/static/icons/icon-48x48.png',
  '/static/icons/icon-57x57.png',
  '/static/icons/icon-64x64.png',
  '/static/icons/icon-72x72.png',
  '/static/icons/icon-96x96.png',
  '/static/icons/icon-114x114.png',
  '/static/icons/icon-120x120.png',
  '/static/icons/icon-128x128.png',
  '/static/icons/icon-144x144.png',
  '/static/icons/icon-150x150.png',
  '/static/icons/icon-152x152.png',
  '/static/icons/icon-167x167.png',
  '/static/icons/icon-180x180.png',
  '/static/icons/icon-192x192.png',
  '/static/icons/icon-256x256.png',
  '/static/icons/icon-384x384.png',
  '/static/icons/icon-512x512.png',
  '/static/icons/icon-1024x1024.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
