'use strict'

var fs = require('fs');
var path = require('path');
const { default: validator } = require('validator');
const ModeloDocente = require('../Models/RegistroDocente');
const ModeloMined = require('../Models/Registro'); 
const Mongoose = require('mongoose');

const RegistroDocente = {

    testDocente: (req, res) => {
        console.log(req);
        return res.status(200).send({
            info: 'Ruta funcionando'
        })
    },
    NewDocente: (req, res) => {

        const data = req.body;

        var Docente = new ModeloDocente();

        Docente.Nombre = data.Nombre;
        Docente.Genero = data.Genero;
        Docente.Estatus = data.Estatus;
        Docente.FechaNac = data.FechaNac;
        Docente.DUI = data.DUI;
        Docente.Departamento = data.Departamento;
        Docente.Municipio = data.Municipio;
        Docente.Zona = data.Zona;
        Docente.Celular = data.Celular;
        Docente.Correo = data.Correo;
        Docente.PerfilImage = data.PerfilImage;
        Docente.Academica = data.Academica;
        Docente.Opcional = data.Opcional;
        Docente.User = data.User;
        Docente.Password = data.Password;

        if (Object.keys(Docente).length == 6) {
            Docente.save((err) => {
                if (err) {
                    return res.status(200).send({
                        status: 'error',
                        error
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    Docente
                });
            })
        }
        else{
            return res.status(200).send({
                status: 'Error',
                Docente: 'Faltan datos por enviar'
            });
        }
    },
    updateDocente: (req, res) => {
        const {_id, data} = req.body;

        ModeloDocente.updateOne({_id: Mongoose.Types.ObjectId(_id)}, data, (err) => {
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
    confirmDUI: (req, res) => {
        const DUI = req.params.DUI;

        ModeloDocente.findOne({DUI},(err, resp) => {
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al buscar DUI !!!'
                });
            }

            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    DUI: true
                });
            }
            else{
                ModeloMined.findOne({DUI},(err, resp) => {
                    if(err){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al buscar DUI !!!'
                        });
                    }
                    if (resp) {
                        return res.status(200).send({
                            status: 'success',
                            DUI: true
                        });
                    }
                    else{
                        return res.status(200).send({
                            status: 'success',
                            DUI: false
                        });
                    }
                })
            }
        })
    },
    updateChatDocente: (req, res) => {
        const data = req.body
        ModeloDocente.findOneAndUpdate({_id: data.id},{latestChatMessage: data.latestChatMessage, latestChatTime: data.latestChatTime}, (err, response) => {
            if(err || !response){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al guardar la imagen de articulo !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                docente: response
            });
        })
    },
    searchDocentes: (req, res) => {
        ModeloDocente.find({},{Nombre:1,Academica:{Carrera: 1, Egreso: 1, NivelDocente: 1, CategoriaDocente: 1},FechaNac: 1, PerfilImage: 1, latestChatTime: 1, latestChatMessage: 1},(err, result) => {
            if (err) { return res.status(200).send({
                status: 'error',
                err
            })}

            return res.status(200).send({
                status: 'success',
                Docentes: result
            })
        })
    },
    searchDocente: (req, res) => {
        const {id} = req.params
        ModeloDocente.find({_id: id}, {_id : 0, __v: 0}, (err, result) => {
            if (err) {
                return res.status(200).send({
                    status: 'warning',
                })
            }

            return res.status(200).send({
                status: 'success',
                result
            })
        })
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
    getImagePerfil: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/Perfil/'+file;

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
    getImageTitulo: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/Titulo/'+file;

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
    getImagePostgrado: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/Postgrado/'+file;

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
    getImageCarrera: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/OtraCarrera/'+file;

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
    deleteDocente: (req, res) => {
        const {id} = req.params
        
        ModeloDocente.deleteOne({_id: id}, (err) => {
            if (err) {
                return res.status(404).send({
                    status: 'err'
                })
            }

            return res.status(200).send({
                status: 'success'
            })
        })
    }
}

module.exports = RegistroDocente;