'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UniversidadSchema = Schema({
    label: String,
    value: String
});

module.exports = mongoose.model('universidade', UniversidadSchema);