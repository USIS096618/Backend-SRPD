'use strict'

var fs = require('fs');
var path = require('path');
const { default: validator } = require('validator');
var Registro = require('../Models/Registro');
const service = require('../Service/Login')
const nodemailer = require('nodemailer')

var Auth_Admin_Controller = {

    test: (req, res) => {
        return res.status(200).send({
            autor: 'CODE MASTER'
        });
    },
    Login: (req, res) => {
        Registro.find({User: req.body.User, Password: req.body.Password}, (err, InformacionUsuario) => {
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
    },
    Registro: (req, res) => {

        var {Nombre, Apellido, Genero, Estatus, FechaNac, DUI, NIT, Correo, User, Password} = req.body;

        try{
            var V_Nombre = !validator.isEmpty(Nombre);
            var V_Apellido = !validator.isEmpty(Apellido);
            var V_Genero = !validator.isEmpty(Genero);
            var V_Estatus = !validator.isEmpty(Estatus);
            var V_FechaNac = !validator.isEmpty(FechaNac);
            var V_DUI = !validator.isEmpty(DUI);
            var V_NIT = !validator.isEmpty(NIT);
            var V_Correo = !validator.isEmpty(Correo);
            var V_User = !validator.isEmpty(User);
            var V_Password = !validator.isEmpty(Password);

        }catch(err){
            return res.status(500).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (V_Nombre && V_Apellido && V_Genero && V_Estatus && V_FechaNac && V_DUI && V_NIT && V_Correo && V_User && V_Password) {

            const Registrar = new Registro();

            Registrar.Nombre = Nombre;
            Registrar.Apellido = Apellido;
            Registrar.Genero = Genero;
            Registrar.Estatus = Estatus;
            Registrar.FechaNac = FechaNac;
            Registrar.DUI = DUI;
            Registrar.NIT = NIT;
            Registrar.Correo = Correo;
            Registrar.User = User;
            Registrar.Password = Password;

            Registrar.save((err) => {
                if (err) res.status(500).send({menssage: `Error al crear el usuario ${err}`});

                return res.status(200).send({token: service.createToken(User)});
            })
            
        }

    },
    forgetPassword: (req, res) => {
        console.log("entre");
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'srpd.ingsw2@gmail.com', // generated ethereal user
                pass: 'srpd1234', // generated ethereal password
            },
        })

        const options = {
            from: '"SRPD" <srpd.ingsw2@gmail.com>', // sender address
            to: "johanssonr638@gmail.com", // list of receivers
            subject: "Cambio de contraseña", // Subject line
            text: "Prueba de texto", // plain text body
            html: "<b>Prueba 2</b>", // html body
        }

        transporter.sendMail(options, (err, info) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    err
                })
            }
            else{
                return res.status(500).send({
                    status: 'error',
                    info
                })
            }
        });
    }
};

module.exports = Auth_Admin_Controller;