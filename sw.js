/* Offline-Speicher: legt alle Dateien der App im Browser ab, damit sie ohne Internet läuft.
   Bei Änderungen an Dateien VERSION erhöhen. */
const VERSION = 'ap1-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'ap1/app.js', 'ap1/lf1.js', 'ap1/lf2.js', 'ap1/lf3.js', 'ap1/lf4.js', 'ap1/lf5.js', 'ap1/lf6.js', 'ap1/arbeitsblaetter.js', 'schaltwand.html', 'magnetlabor.html', 'arbeitsblaetter.html'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok && new URL(e.request.url).origin === location.origin) { const c = r.clone(); caches.open(VERSION).then(ca => ca.put(e.request, c)); } return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
