// ============================================================
// SERVICE WORKER – Dinaj Besichtigungs-App
// Version: erhöhen bei jeder Änderung, damit der Cache
// automatisch erneuert wird (z.B. 'v2', 'v3', …)
// ============================================================
const CACHE_NAME = 'dinaj-besichtigung-v1';

// Alle Dateien, die offline verfügbar sein sollen
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// ── Installation: Dateien in den Cache laden ────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())   // neuen SW sofort aktivieren
  );
});

// ── Aktivierung: alten Cache löschen ────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())  // sofort Kontrolle übernehmen
  );
});

// ── Fetch: Cache-First für App-Dateien, Network-First für CDN
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // CDN-Anfragen (Fonts, jsPDF) immer aus dem Netz – mit Cache-Fallback
  const isCDN = url.hostname.includes('cdnjs') ||
                url.hostname.includes('fonts.googleapis') ||
                url.hostname.includes('fonts.gstatic');

  if (isCDN) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Erfolgreiche CDN-Antwort auch cachen für Offline-Nutzung
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))  // Fallback: Cache
    );
    return;
  }

  // Eigene App-Dateien: Cache-First
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        // Nicht im Cache: aus Netz laden und cachen
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
