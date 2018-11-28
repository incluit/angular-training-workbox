
const fs = require('fs');
const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:d3xi.cba@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);

let suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
  return urlsafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion);
  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
};


module.exports.sendPush = (post) => {
  const notificacionesEnviadas = [];
  suscripciones.forEach((suscripcion, i) => {
    console.log('Mandando PUSHES');
    const pushMessage = webpush.sendNotification(suscripcion, JSON.stringify(post))
      .then(console.log('Notificacion enviada al cliente'))
      .catch(err => {
        console.log('Notificación falló');
        if (err.statusCode === 410) { // GONE, ya no existe
          suscripciones[i].borrar = true;
        }
      });
    notificacionesEnviadas.push(pushMessage);
  });

  Promise.all(notificacionesEnviadas).then(() => {
    suscripciones = suscripciones.filter(subs => !subs.borrar);
    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
  });
}

