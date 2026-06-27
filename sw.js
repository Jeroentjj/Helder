// Helder Service Worker — offline-first caching
const CACHE = 'helder-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap'
];

// Install — cache core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first for API calls, cache first for assets
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Never cache API calls (Anthropic, Google Health, Fitbit)
  if (url.includes('api.anthropic.com') ||
      url.includes('googleapis.com') ||
      url.includes('fitbit.com') ||
      url.includes('accounts.google.com')) {
    return; // let it go to network directly
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((res) => {
        // Cache new same-origin GET requests
        if (e.request.method === 'GET' && res.status === 200 &&
            (url.startsWith(self.location.origin) || url.includes('fonts.g'))) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
