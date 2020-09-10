'use strict'

var express = require('express');
var LoginDocenteController = require('../Controllers/Auth_Docente');
var router = express.Router();

router.get('/testDocentesAuth', LoginDocenteController.test);
router.post('/LoginDocente', LoginDocenteController.Login);

module.exports = router;