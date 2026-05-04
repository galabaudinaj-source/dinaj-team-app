// ============================================================
// SERVICE WORKER – Dinaj Tagesbericht-App
// Bei Änderungen an der App: CACHE_NAME-Version erhöhen!
// z.B. 'dinaj-tagesbericht-v2', 'v3' …
// ============================================================
const CACHE_NAME = 'dinaj-tagesbericht-v1';

// Dateien, die beim ersten Start gecacht werden (offline verfügbar)
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

// ── Installation: App-Shell in den Cache laden ───────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Aktivierung: veraltete Caches löschen ───────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('Alter Cache gelöscht:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch-Strategie ──────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Externe CDN-Ressourcen (Fonts, jsPDF): Network-First mit Cache-Fallback
  // → online immer aktuell, offline trotzdem nutzbar
  const isExternal =
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com');

  if (isExternal) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Eigene Dateien (index.html, manifest, icons): Cache-First
  // → blitzschnell offline, kein Netz nötig
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
