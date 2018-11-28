//////////////////////////////////////////////////////////////////////////
//////////////////////// Let's have it locally. /////////////////////////
//  Run "workbox copyLibraries third_party/"
//////////////////////////////////////////////////////////////////////////
importScripts('workbox-v3.6.3/workbox-sw.js')

// SETTINGS

// Use local version of Workbox libraries
workbox.setConfig({ modulePathPrefix: 'workbox-v3.6.3/' })

// Verbose logging even for the production
workbox.setConfig({ debug: true })
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

// Modify SW update cycle
workbox.skipWaiting() // prevents the waiting, meaning the service worker activates as soon as it's finished installing.
workbox.clientsClaim() // When a service worker is initially registered, pages won't use it until they next load. 
                       // The claim() method causes those pages to be controlled immediately.

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([])

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// You might want to use a stale-while-revalidate 
// strategy for CSS and JavaScript files that aren't precached.
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// fallback to network
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 15 * 24 * 60 * 60, // 15 Days
      }),
    ]
  })
);

// test:
// API with networkFirst strategy
workbox.routing.registerRoute(
  new RegExp(/.*\/jokes\/random\/3$/, 'i'),
  workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
  new RegExp(/.*\/jokes\/random\/5$/, 'i'),
  workbox.strategies.cacheFirst({
    cacheName: 'joke5',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 5 * 24 * 60 * 1000, // 5 Days
      }),
    ]
  })
)


// BACKGROUND SYNC

workbox.routing.registerRoute(
  new RegExp('^https://reqres.in/api/users'),
  workbox.strategies.networkOnly({
    plugins: [
      new workbox.backgroundSync.Plugin('userQueue', {
        maxRetentionTime: 1 * 60 // Retry for max of 1 Hour
      })
    ]
  }),
  'POST'
)

/*
// Ciclo de vida del SW
// SW: Instalacion: Descarga los asset, creamos la cache. Uan vez instalado, si recargo 
// la pagina, no se ejecuta de nuevo. Siempre se ejecutara si exite una nueva version del SW
self.addEventListener('install', event => {
    console.log('hook: install', 'Instalando SW', event);
    const instalacion = new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('Instalaciones terminadas, debemos envolverlo en un promise, pq la instalacion puede tardar.');
           self.skipWaiting(); // hace la instalacion sin esperar que el usuario lo haga manualmente.
           resolve();
        }, 1);
    });
    event.waitUntil( instalacion ); // hold the service worker in the installing phase until tasks complete
});


// Cuando el SW toma el control de la aplicación
// Borrar cache viejo, por ej borrar los caches viejos.
self.addEventListener('activate', event => {
  console.log('hook: activate','SW ejecutandose, ahora se puede contralar el site');
  // const promiseChain = caches.keys().then((cacheNames) => {
  //   return Promise.all(
  //     cacheNames.map((cacheName) => caches.delete(cacheName))
  //   );
  // });
  // event.waitUntil(promiseChain); 
});

// FETCH: Manejo de peticiones HTTP
// Aplicar estrategias: cacheFirst, networkFirst, staleWhileRevalidate
self.addEventListener('fetch', event => {
    console.log('hook: fetch', 'SW:', event.request.url );
    // event.respondWith(event.request);
    // if ( event.request.url.includes('https://reqres.in/') ) {
    //     event.respondWith( new Response(`{ ok: false, mensaje: 'incluIT'}`) );
    // }
});

// SYNC: Recuperamos la conexión a internet
// aca usamos la base de datos
self.addEventListener('sync', event => {
  console.log('hook: sync', 'Tenemos conexión!');
  console.log(event);
  console.log(event.tag);
});


// PUSH: Manejar las push notifications
self.addEventListener('push', event => {
    console.log('hook: push', 'Notificacion recibida');
    const data = JSON.parse( event.data.text() );
    const title = data.titulo;
    const options = {
        body: data.cuerpo,
        icon: `assets/icons/icon-72x72.png`,
        badge: 'favicon.ico',
        image: 'https://picsum.photos/200/300',
        vibrate: [125,75,125,275,200,275,125,75,125,275,200,600,200,600],
        openUrl: '/',
        data: {
            url: '/',
        },
        actions: [
            {
                action: 'ejemplo.',
                title: 'Una accion',
            },
        ]
    };
    event.waitUntil( self.registration.showNotification( title, options) );
});

// Cierra la notificacion
self.addEventListener('notificationclose', e => {
  console.log('Notificación cerrada', e);
});
*/