'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostgradoSchema = Schema({
    idUniversidad: Schema.Types.ObjectId,
    label: String,
    value: String
});

module.exports = mongoose.model('postgrado', PostgradoSchema);