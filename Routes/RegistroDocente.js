'use strict'

var express = require('express');
var RegistroDocenteController = require('../Controllers/RegistroDocente');
const auth = require('../Middlewares/auth');

var RouterDocente = express.Router();

var path = require('path')
var crypto = require('crypto'); //para encriptar
var multer = require('multer'); //para guardar en la api

const storagePerfil = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './upload/Perfil');
    },
    filename(req, file = {}, cb ){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+Date.now()+path.extname(file.originalname));
        });
    }
});

const storageTitulo = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './upload/Titulo');
    },
    filename(req, file = {}, cb ){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+Date.now()+path.extname(file.originalname));
        });
    }
});

const storagePostgrado = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './upload/Postgrado');
    },
    filename(req, file = {}, cb ){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+Date.now()+path.extname(file.originalname));
        });
    }
});

const storageOtraCarrera = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './upload/OtraCarrera');
    },
    filename(req, file = {}, cb ){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+Date.now()+path.extname(file.originalname));
        });
    }
});

var mul_Perfil = multer({dest: './upload/Perfil', storage: storagePerfil});
var mul_Titulo = multer({dest: './upload/Titulo', storage: storageTitulo});
var mul_Posgrado = multer({dest: './upload/Postgrado', storage: storagePostgrado});
var mul_OtraCarrera = multer({dest: './upload/OtraCarrera', storage: storageOtraCarrera});

RouterDocente.get('/testDocente', RegistroDocenteController.testDocente);
RouterDocente.get('/confirmDUI/:DUI', auth, RegistroDocenteController.confirmDUI);
RouterDocente.post('/SavePerfil', auth, mul_Perfil.single('file0'), RegistroDocenteController.saveImage);
RouterDocente.post('/SaveTitulo', auth, mul_Titulo.single('file0'), RegistroDocenteController.saveImage);
RouterDocente.post('/SavePosgrado', auth, mul_Posgrado.single('file0'), RegistroDocenteController.saveImage);
RouterDocente.post('/SaveOtraCarrera', auth, mul_OtraCarrera.single('file0'), RegistroDocenteController.saveImage);
RouterDocente.post('/newDocente', auth, RegistroDocenteController.NewDocente);
RouterDocente.put('/UpdateDocente', auth, RegistroDocenteController.updateDocente)
RouterDocente.get('/getDocente/:id', auth, RegistroDocenteController.searchDocente);
RouterDocente.get('/getDocentes/:desc?', auth, RegistroDocenteController.searchDocentes);
RouterDocente.put('/updateChatDocente', auth, RegistroDocenteController.updateChatDocente);
RouterDocente.delete('/DeleteDocente/:id', auth, RegistroDocenteController.deleteDocente)

module.exports = RouterDocente;