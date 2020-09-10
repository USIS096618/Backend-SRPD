'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarreraSchema = Schema({
    idUniversidad: Schema.Types.ObjectId,
    label: String,
    value: String
});

module.exports = mongoose.model('carrera', CarreraSchema);