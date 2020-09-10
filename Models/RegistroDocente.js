'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocenteRegistroSchema = Schema({
    Nombre: String,//
    Genero: String,//
    Estatus: String,//
    FechaNac: Date,//
    DUI: String,//
    Departamento: String,//
    Municipio: String,//
    Zona: String,//
    Celular: String,//
    Correo: String,//,
    PerfilImage: String,//
    Academica: {
        Egreso: Date,//
        Universidad: String,//
        Carrera: String,//
        NivelDocente: String,//
        CategoriaDocente: String,//
        CUM: Number,//
        TituloImage: String,
        Postgrado: {
            Universidad: String,//
            Postgrado: String,//
            TituloImage: String
        },
        OtraCarrera: {
            Universidad: String,
            Carrera: String,//
            TituloImage: String
        }
    },
    Opcional: {
        Ciencia: [],//
        Lenguaje: [],//
        Matematica: [],//
        Sociales: [],//
        Informatica: [],//
        Idiomas: [],//
        Reconocimientos: []//
    },
    User: String,
    Password: String,
    latestChatTime: {type: Date, default: Date.now},
    latestChatMessage: {type: String, default: ""}
});

module.exports = mongoose.model('Docente', DocenteRegistroSchema);