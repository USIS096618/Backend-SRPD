'use strict'

var express = require('express');
var UniversidadController = require('../Controllers/Universidad');
var router = express.Router();
const auth = require('../Middlewares/auth');

router.post('/newUniversidad', auth, UniversidadController.newUniversidad);
router.post('/newCarrera', auth, UniversidadController.newCarrera);
router.get('/getUniversidades', auth, UniversidadController.getUniversidades);
router.post('/newUniversidadPostgrado', auth, UniversidadController.newUniversidadPostgrado);
router.post('/newPostgrado', auth, UniversidadController.newPostrgado);
router.get('/getUniversidadesPostgrados', auth, UniversidadController.getUniversidadesPostgrado);

module.exports = router;