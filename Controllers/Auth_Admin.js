'use strict'
const xoauth2 = require('xoauth2');
const smtp = require('nodemailer-smtp-transport');
const fs = require('fs-extra');
const moment = require('moment');
var path = require('path');
const { default: validator } = require('validator');
var Registro = require('../Models/Registro');
var Docente = require('../Models/RegistroDocente');
const service = require('../Service/Login')
const nodemailer = require('nodemailer')
const global = require('../Service/Global')
const puppeteer = require('puppeteer');
const hbs = require('handlebars')
var helpers = require('handlebars-helpers')();

async function sendEmail (data, req, res, type) {

    try {
        const {_id, Nombre, Correo} = JSON.parse(data)
        const content = await global.compile('forgetEmail', {
            link: 'https://srpd.herokuapp.com/Recuperar/' + _id + '/' + type,
            Nombre
        })
<<<<<<< HEAD
    
=======

>>>>>>> ba62dfb85199f8c7a987be1c8d73b500125b492e
        const generator = xoauth2.createXOAuth2Generator({
            user: "srpd.ingsw2@gmail.com",
            clientId: "1052328052346-e40iisa2nsr3lfamha0h247gn1ibk9ds.apps.googleusercontent.com",
            clientSecret: "4OMvSqbjWtkFjljWSxzZTgCk",
            refreshToken: "1//04y7G-3Qj_qJ2CgYIARAAGAQSNwF-L9IrsHTf9g67xfWzM6s14LQ4XOgGzdE5CdA7zSi_hg0Ype0EzDtPyseVivEdpCTYqQ2ZkyQ",
            accessToken: ''
        });

        generator.on('token', function(token){
            console.info('new token', token.accessToken);
            // maybe you want to store this token
        });



        const transporter = nodemailer.createTransport(smtp({
            name: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            ignoreTLS: false,
            tls: { rejectUnauthorized: true },
            debug: false,
            auth: { xoauth2: generator }
        }));

        const options = {
            from: '"SRPD" <srpd.ingsw2@gmail.com>', // sender address
            to: Correo, // list of receivers
            subject: "Cambio de contraseña", // Subject line
            text: "Prueba de texto", // plain text body
            html: content, // html body
        }

        transporter.sendMail(options, (err, info) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    err
                })
            }
            else{
                return res.status(200).send({
                    status: 'success',
                    info
                })
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: 'error'
        })
    }
}
 
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
    forgetPassword: async (req, res) => {
        Registro.find({User: req.body.User}, {_id: true, Nombre: true, Correo: true}, (err, InformacionUsuario) => {
            
            if (err) {
                return res.status(500).send({ messageR: err});
            }
            else if(InformacionUsuario == null || InformacionUsuario.length == 0){
                Docente.find({User: req.body.User}, {_id: true, Nombre: true, Correo: true}, (error, InformacionUsuarioD) => {
                    if (error) {
                        return res.status(500).send({ messageD: error});
                    }
        
                    if (InformacionUsuarioD.length == 0) {
                        return res.status(500).send({message: 'No existe el usuario'});
                    }
                    sendEmail(JSON.stringify(InformacionUsuarioD[0]), req, res, 1)
                })
            }
            else{
                sendEmail(JSON.stringify(InformacionUsuario[0]), req, res, 0)
            }
        })
        
        
    },
    putPassword0: (req, res) => {

        const {id, password} = req.body

        Registro.updateOne({_id: id}, {Password: password}, (err, raw) => {

            if (err) {
                return res.status(200).send({
                    title: 'Error',
                    body: 'A surgido un error en el servidor, pruebe mas tarde',
                    icon: 'error'
                })
            }

            return res.status(200).send({
                title: 'Actualizado',
                body: 'Su contraseña fue actualizada correctamente',
                icon: 'success'
            })
        })
    },
    putPassword1: (req, res) => {

        const {id, password} = req.body

        Docente.updateOne({_id: id}, {Password: password}, (err, raw) => {

            if (err) {
                return res.status(200).send({
                    title: 'Error',
                    body: 'A surgido un error en el servidor, pruebe mas tarde',
                    icon: 'error'
                })
            }

            return res.status(200).send({
                title: 'Actualizado',
                body: 'Su contraseña fue actualizada correctamente',
                icon: 'success'
            })
        })
    }
};

module.exports = Auth_Admin_Controller;