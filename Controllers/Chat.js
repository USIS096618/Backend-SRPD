'use strict'

var fs = require('fs');
var path = require('path');
const Global = require('../Service/Global')

const Chat = {
    saveImage: async (req, res) => {
        var fileName = 'No subida';
        if (!req.file) {
            return res.status(404).send({
                status:  'error',
                message: fileName
            });
        }

        var filePath = req.file.path;
        fileName = req.file.filename;

        var fileExtension = req.file.originalname.split('\.');
        var extension = fileExtension[1];

       if (extension != 'png' && extension != 'jpeg' && extension != 'gif' && extension != 'jpg'){
            fs.unlink(filePath, (err) => {
                return res.status(404).send({
                    status: 'error',
                    message: 'El archivo no es una imagen o tiene una extension invalida'
                });
            });
        }
        else{
            const result = await Global.UploadFile(req.file.path)
            return res.status(200).send({
                status: 'success',
                image: result.url
            }); 
        }
    }
}

module.exports = Chat;