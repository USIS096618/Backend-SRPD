'use strict'

var fs = require('fs');
var path = require('path');
const { default: validator } = require('validator');
var Docente = require('../Models/RegistroDocente');
const service = require('../Service/Login')

var Auth_Admin_Controller = {

    test: (req, res) => {
        return res.status(200).send({
            autor: 'CODE MASTER'
        });
    },
    Login: (req, res) => {
        
        Docente.find({User: req.body.User, Password: req.body.Password}, (err, InformacionUsuario) => {
            if (err) {
                return res.status(500).send({ message: err});
            }

            if (!InformacionUsuario.length) {
                return res.status(500).send({message: 'No existe el usuario'});
            }
            req.user = InformacionUsuario;

            return res.status(200).send({
                message: 'Te has logeado correctamente',
                user: InformacionUsuario,
                token: service.createToken(InformacionUsuario)
            })
        })
    }
};

module.exports = Auth_Admin_Controller;