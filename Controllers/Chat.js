'use strict'

var fs = require('fs');
var path = require('path');

const Chat = {
    saveImage: (req, res) => {
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
            return res.status(200).send({
                status: 'success',
                image: fileName
            }); 
        }
    },
    getImageChat: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/Chat/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe !!!'
                });
            }
        });
    }
}

module.exports = Chat;