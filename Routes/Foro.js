'use strict'

var express = require('express');
var ForoController = require('../Controllers/Foro');
var router = express.Router();
const auth = require('../Middlewares/auth');

var path = require('path')
var crypto = require('crypto'); //para encriptar
var multer = require('multer'); //para guardar en la api

const storageForo = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './upload/Foro');
    },
    filename(req, file = {}, cb ){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+Date.now()+path.extname(file.originalname));
        });
    }
});

const storageForoComment = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './upload/Comment');
    },
    filename(req, file = {}, cb ){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+Date.now()+path.extname(file.originalname));
        });
    }
});

var mul_Foro = multer({dest: './upload/Foro', storage: storageForo});
var mul_ForoComment = multer({dest: './upload/Comment', storage: storageForoComment});

router.post('/newForo', auth, ForoController.newForo);
router.put('/updateForo', auth, ForoController.updateForo);
router.delete("/deleteForo/:id", auth, ForoController.deleteForo);
router.get('/getForos', auth, ForoController.getForos);
router.get('/getForo/:id', auth, ForoController.getForo);
router.post('/saveImageForo', auth, mul_Foro.single('file0'), ForoController.saveImage);
router.post('/saveImageForoComment', auth, mul_ForoComment.single('file0'), ForoController.saveImage);
router.get('/getImageForoComment/:image', ForoController.getImageForoComment)
router.get('/getImageForo/:image', ForoController.getImageForo)

module.exports = router;