'use strict'

var express = require('express');
var LoginAdminController = require('../Controllers/Auth_Admin');
const auth = require('../Middlewares/auth');

var router = express.Router();

router.get('/test', LoginAdminController.test);
router.post('/Login', LoginAdminController.Login);
router.post('/Registro', LoginAdminController.Registro);
router.post('/forgetPassword', LoginAdminController.forgetPassword);
router.get('/private', auth, function (req, res) {
    res.status(200).send({ message:'Tienes acceso'});
});

module.exports = router;