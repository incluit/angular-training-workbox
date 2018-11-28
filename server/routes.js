// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');
// Get mensajes
router.get('/', function (req, res) {
  res.json( [] );
});
// Almacenar la suscripción
router.post('/subscribe', (req, res) => {
  const suscripcion = req.body;
  push.addSubscription( suscripcion );
  res.json('subscribe');
});
// Obtiene la clave publica
router.get('/key', (req, res) => {
  const key = push.getKey();
  res.send(key);
});
/////////////////////BORRAR ESTO, es solo para probar el workflow///////////////////
router.post('/prueba-push', (req, res) => {
  const post = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
  };
  push.sendPush( post );
  res.json( post );
});
//////////////////////////////
module.exports = router;