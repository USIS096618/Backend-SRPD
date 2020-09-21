'use strict'

const path = require('path')
const global = require('../Service/Global')
const puppeteer = require('puppeteer');
const hbs = require('handlebars')
var helpers = require('handlebars-helpers')();
const fs = require('fs-extra');
const moment = require('moment');
var Docente = require('../Models/RegistroDocente');

async function sendCurriculum (data, req, res) {
    try {

        const info = await convertirData(data);

        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true
        });
        const page = await browser.newPage();

        const content = await global.compile('templateCurriculum', info)
    
        await page.setContent(content);
        await page.emulateMediaType('screen')
        await page.pdf({ path: __dirname + '\\PDF\\Curriculum.pdf', format: "A4", printBackground: true});
        await browser.close();
    
        res.download(__dirname + '\\PDF\\Curriculum.pdf', 'Curriculum', (err) => {
            if (err) {
                console.log(err);
            }
        })
        
    } catch (error) {
        res.status(200).send({
            status: 'error',
            error
        })
    }
}

const convertirData = (data) => {
    // Sacamos la informacion a modificar
    var {FechaNac, Academica, PerfilImage} = data
    var {Egreso} = Academica

    // Convertimos a JSON la informacion para insertar
    data = JSON.parse(JSON.stringify(data))

    // Sacamos la ruta de su perfil
    PerfilImage= 'http://localhost:3900/getImagePerfil/' + PerfilImage;

    // Sacamos la edad
    var edad = moment(FechaNac, "YYYYMMDD").locale('es').fromNow();
    edad = edad.replace('hace ', '');

    // Sacamos la Fecha de Nacimiento
    var date = new Date(FechaNac)
    FechaNac = `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`

    // Sacamos la Fecha de Egreso
    var egreso = new Date(Egreso);
    Egreso = `${egreso.getDate() + 1}/${egreso.getMonth() + 1}/${egreso.getFullYear()}`

    // Insertamos los datos al JSON
    data.PerfilImage = PerfilImage
    data.FechaNac = FechaNac;
    data.edad = edad
    data.Academica.Egreso = Egreso


    return data;
}

const PDFS = {
    getPDF: async (req, res) => {

        const {id} = req.params

        Docente.find({_id: id}, async (err, InformacionUsuario) => {
            if (err) {
                return res.status(500).send({message: 'No existe el usuario'});
            }

            if (!InformacionUsuario.length) {
                return res.status(500).send({message: 'No existe el usuario'});
            }

            sendCurriculum(InformacionUsuario[0], req, res)

        })
        
    }
}

module.exports = PDFS