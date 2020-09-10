'use strict'

var express = require('express');
var PDFController = require('../Controllers/GeneratorPDF');
var router = express.Router();
const auth = require('../Middlewares/auth');

router.get('/generatorPDF', PDFController.getPDF);

module.exports = router;