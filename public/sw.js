// Service worker do app do painel: só recebe e mostra notificações.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let d = {};
  try {
    d = event.data ? event.data.json() : {};
  } catch {
    d = { titulo: 'Revolux', corpo: event.data ? event.data.text() : '' };
  }
  event.waitUntil(
    self.registration.showNotification(d.titulo || 'Revolux', {
      body: d.corpo || '',
      tag: d.tag,
      icon: '/icons/painel-180.png',
      badge: '/icons/painel-180.png',
      data: { url: d.url || '/painel' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/painel';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((lista) => {
      for (const c of lista) {
        if ('focus' in c) {
          c.navigate(url);
          return c.focus();
        }
      }
      return self.clients.openWindow(url);
    }),
  );
});
