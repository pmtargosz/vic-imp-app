importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

workbox.core.setCacheNameDetails({
  prefix: 'vic-imp-cache',
  runtime: 'run-time'
});

// active new service worker as long as it's installed
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

// precahce and route asserts built by webpack
workbox.precaching.precacheAndRoute([
  {
    url: '/vic-imp-app/favicon.ico',
    revision: 'c92b85a5b907c70211f4ec25e29a8c4a'
  },
  {
    url: '/vic-imp-app/index.html',
    revision: '8fe4407cb02f0e95f58ec9cab8f0fc22'
  },
  {
    url: '/vic-imp-app/logo192.png',
    revision: '33dbdd0177549353eeeb785d02c294af'
  },
  {
    url: '/vic-imp-app/logo512.png',
    revision: '917515db74ea8d1aee6a246cfbcc0b45'
  },
  {
    url: '/vic-imp-app/precache-manifest.6594475f580fcf8b60bd36b19033675b.js',
    revision: '6594475f580fcf8b60bd36b19033675b'
  },
  {
    url: '/vic-imp-app/sw.js',
    revision: '0eb4cad020f2215771caaffb18f56a04'
  },
  {
    url: '/vic-imp-app/static/css/main.52d2e9e4.chunk.css',
    revision: '1db9f4c2fec6fb55b2ae4fcbf6d6e7e9'
  },
  {
    url: '/vic-imp-app/static/js/2.7b7c14f8.chunk.js',
    revision: '493c95710176a6cb25a43b5bc8efa5d9'
  },
  {
    url: '/vic-imp-app/static/js/main.eeb2115d.chunk.js',
    revision: '2fabe464f7b0bd24b9679fd2854d85b0'
  },
  {
    url: '/vic-imp-app/static/js/runtime~main.556ea7df.js',
    revision: 'eb765f83e4874da536081457e5220a27'
  },
  {
    url: '/vic-imp-app/static/media/squiz-brushmarks.d34b957a.svg',
    revision: 'd34b957aa38945bd12c4bf66d6d3040e'
  }
]);

// return app shell for all navigation requests
workbox.routing.registerNavigationRoute('/vic-imp-app/index.html');

// API
workbox.routing.registerRoute(
  /^https:\/\/spreadsheets/i,
  workbox.strategies.networkFirst({
    cacheName: 'vic-imp-cache-db'
  })
);
// Images
workbox.routing.registerRoute(
  /^https:\/\/drive\.google\.com/i,
  workbox.strategies.cacheFirst({
    cacheName: 'vic-imp-cache-drive',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  /^https:\/\/.+\.(jpe?g|png|gif|svg|webp|ico)$/i,
  workbox.strategies.cacheFirst({
    cacheName: 'vic-imp-cache-image',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);
