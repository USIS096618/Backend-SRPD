'use strict'

var fs = require('fs');
var path = require('path');
const Model = require('../Models/Foro')
const {default: validator} = require('validator');
const Mongoose = require('mongoose');

const Foro = {

    newForo: (req, res) => {

        const { titulo, descripcion, imagen, DocenteId } = req.body;

        const Foro = new Model();

        Foro.idDocente = DocenteId;
        Foro.titulo = titulo;
        Foro.descripcion = descripcion;

        if (!validator.isEmpty(imagen)) {
            Foro.imagen = imagen;
        }

        Foro.save((err) => {
            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    error: err
                });
            }

            return res.status(200).send({
                Foro
            })
        })


    },
    updateForo: (req, res) => {

        const toUpdate = req.body;
        Model.updateOne({_id: Mongoose.Types.ObjectId(toUpdate.id)}, toUpdate.data, (err, raw) => {
            if (err) {
                return res.status(200).send({
                    status: 'error'
                })
            }

            return res.status(200).send({
                status: 'success'
            })
        })
    },
    deleteForo: (req, res) => {

        Model.deleteOne({_id: Mongoose.Types.ObjectId(req.params.id)}, (err) => {
            if (err) {
                res.status(200).send({
                    status: 'error',
                })
            } else {
                res.status(200).send({
                    status: 'success',
                })
            }
        })
    },
    getForos: (req, res) => {

        const config = [
            {
                $lookup: {
                    from: 'docentes',
                    localField: 'idDocente',
                    foreignField: '_id',
                    as: 'Docente'
                }
            },
            {
                $project: {
                    _id: "$_id",
                    imagen: "$imagen",
                    titulo: "$titulo",
                    descripcion: "$descripcion",
                    datePublish: "$datePublish",
                    comentarios: "$comentarios",
                    idDocente: "$Docente._id",
                    Nombre: "$Docente.Nombre",
                    PerfilImage: "$Docente.PerfilImage"
                }
            },
            {
                $sort: {datePublish: -1}
            }
        ];

        Model.aggregate(config).then((resp) => {
            res.status(200).send({
                Foros: resp
            })
        });

    },
    getForo: (req, res) => {
        var id = req.params.id

        const config = [
            {
                $match : {_id : Mongoose.Types.ObjectId(id)}
            },
            {
                $lookup: {
                    from: 'docentes',
                    localField: 'idDocente',
                    foreignField: '_id',
                    as: 'Docente'
                }
            },
            {
                $project: {
                    _id: "$_id",
                    imagen: "$imagen",
                    titulo: "$titulo",
                    descripcion: "$descripcion",
                    datePublish: "$datePublish",
                    comentarios: "$comentarios",
                    Nombre: "$Docente.Nombre",
                    PerfilImage: "$Docente.PerfilImage"
                }
            },
            {
                $limit: 1
            }
        ];

        Model.aggregate(config).then((resp) => {
            res.status(200).send({
                Foros: resp
            })
        });

    },
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
    getImageForo: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/Foro/'+file;

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
    },
    getImageForoComment: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/Comment/'+file;

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

module.exports = Foro;