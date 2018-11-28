import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => registerServiceWorker())
  .catch(err => console.error(err));

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registro => { // registro de la instalacion

        // Objecto Sync Manager
        /* if ((<any>window).SyncManager) {
          setTimeout(() => registro.sync.register('prueba-db') , 3000);
        } */

        /* Notification.requestPermission().then((permiso) => {
          console.log('Concedio permisos para recibir notificaciones? ', permiso);
          getPublicKey().then((key) => {
            registro.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: key
            })
            .then(res => res.toJSON())
            .then(suscripcion => {
              console.log(suscripcion);
              //
              fetch('http://localhost:3000/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(suscripcion)
              })
                .catch(() => {
                  registro.pushManager.getSubscription().then( subs => {
                    subs.unsubscribe();
                  });
                });
            });
          });
        }); */
      })
      .catch(e => console.error('Error during service worker registration:', e));
  } else {
    console.warn('Service Worker is not supported');
  }
}

// Get Key
 // returnar arreglo, pero como un Uint8array
function getPublicKey() {
  return fetch('http://localhost:3000/api/key').then(res => res.arrayBuffer()).then(key => new Uint8Array(key));
}
