'use strict'

var express = require('express');
var ChatController = require('../Controllers/Chat');
var router = express.Router();
const auth = require('../Middlewares/auth');

var path = require('path')
var crypto = require('crypto'); //para encriptar
var multer = require('multer'); //para guardar en la api

const storageChat = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './upload/Chat');
    },
    filename(req, file = {}, cb ){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+Date.now()+path.extname(file.originalname));
        });
    }
});

var mul_Chat = multer({dest: './upload/Chat', storage: storageChat});

router.post('/saveImageChat', auth, mul_Chat.single('file0'), ChatController.saveImage);
router.get('/getImageChat/:image', ChatController.getImageChat)

module.exports = router;