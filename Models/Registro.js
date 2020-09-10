'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistroSchema = Schema({
    Nombre: String,
    Apellido: String,
    // date: { type: Date, default: Date.now },
    Genero: String,
    Estatus: String,
    FechaNac: Date,
    DUI: String,
    NIT: String,
    Correo: String,
    User: String,
    Password: String
});

module.exports = mongoose.model('User', RegistroSchema);