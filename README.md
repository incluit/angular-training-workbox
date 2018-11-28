# AngularWorkbox
Este es un proyecto generado a los fines de explicar los conceptos basicos de PWA con workbox.
Vamos a ir mejorando de poco este repo con informacion que vayamos ingresando.

## Tabla de contenidos
- [Slides de la charla](#Slides)
- [Conceptos](#Conceptos)
- [Entorno](#Entorno)
- [Instalacion](#Instalacion)
- [Building](#building)

## Slides

Slides de la charla: https://slides.com/marcos-5/pwa/live#/

## Conceptos

### PWA que es:
PWA son básicamente páginas web, pero mediante el uso de Service Workers y otras tecnologías se comportan y nos brinda una expericia de usabilidad como si fuera una aplicacion nativa, en nuestros dispositivos.

Es una aplicacion web que progresivamente incorpora:
- Push notification
- Se actualiza constantemente (no necesitamos un market para hacerlo)
- Pesa muy poco (Lightweight)
- Es confiable 
- Funcionan sin conexion


Casos de estudio para leer: https://www.stonetemple.com/mobile-vs-desktop-usage-study/


### Service Worker
Los Service workers actúan esencialmente como proxy servers asentados entre las aplicaciones web, el navegador y la red (cuando está accesible). https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API

Caracteristicas:
- Corre en el background, es independiente del hilo de web.
- Se compone de muchos eventListeners:
      
      self.addEventListener(install|activate|fetch..., event => { })
Compatibilidad: https://caniuse.com/#search=service%20worker

### Ciclo de vida: 

- Install:

    Descarga los asset, creamos la cache. Una vez instalado, si recargo la pagina, no se ejecuta de nuevo. Siempre se ejecutara si existe una nueva versión del SW

- Activate:
    Cuando el serviceWorker toma el control. Se puede borrar la cache aqui.

- Fetch:

    Manejo de peticiones HTTP. Aplicar estrategias: cacheFirst, networkFirst, staleWhileRevalidate

- Sync:

    Recuperamos la conexión a internet. Aqui aca usamos la base de datos, por para generar un post que quedo almacendo en una queue.

- Push:

    Manejar las push notifications.


![tslint](./docs/sw-lifecycle.png)  https://developers.google.com/web/fundamentals/primers/service-workers/



## Entorno

  - [nodejs](https://nodejs.org/) (testeado con 8.12.0)
  - [npm](https://www.npmjs.com) (version 5.4 o superior)
  - [workbox](https://developers.google.com/web/tools/workbox/) (version 3 o superior)


## Instalacion
Luego de ser clonado el repo. Ir a la carpeta y ejecutar en la linea de comandos:

```bash
$ npm install
```
## Building

Para generar un build + workbox: 

```bash
$ npm run build:sw
```

Para levantar la demo con http-server (hacer el paso anterior):

```bash
$ npm run serve:sw
```
 
Para levantar server web-push para probar las notificaciones: 

```bash
$ npm run serve:node  -->(recuerde generar unos vapid nuevos)
```
    
Para generar vapid nuevos:
```bash
$ npm run generate-vapid
```

