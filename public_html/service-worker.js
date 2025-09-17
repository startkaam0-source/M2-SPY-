self.addEventListener('install', evt => {
  self.skipWaiting();
});
self.addEventListener('activate', evt => {
  evt.waitUntil(clients.claim());
});
self.addEventListener('fetch', evt => {
  // passthrough
});

