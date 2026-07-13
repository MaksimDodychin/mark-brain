const CACHE = 'brain-40ddcc6642';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./apple-touch-icon.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(resp => { if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return resp; }).catch(() => hit);
    return hit || net;
  }));
});
