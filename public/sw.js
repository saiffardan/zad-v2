// Self-destruct: clear all caches and unregister
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
    .then(() => {
      // Tell all clients to reload
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      });
      // Unregister self
      self.registration.unregister();
    })
  );
});
