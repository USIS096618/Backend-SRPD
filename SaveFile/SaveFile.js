'use strict'

const crypto = require('crypto');
const multer = require('multer');

const Files = {

    savePerfil: (req, res, next) => {
        const storage = multer.diskStorage({
            destination(req, file, cb){
                cb(null, './upload/Perfil');
            },
            filename(req, file = {}, cb ){
                const {originalname} = file;
                const fileExtension = (originalname.match(/\.+[\S]+$/)||[])[0];
                crypto.pseudoRandomBytes(16, function(err, raw){
                    cb(null, raw.toString('hex')+Date.now()+fileExtension);
                });
            }
        });
        return multer({dest: './upload/Perfil', storage});
    }
}

module.exports = Files;