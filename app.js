'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var Login_Admin_Routes = require('./Routes/Auth_Admin');
var Registro_Docente_Routes = require('./Routes/RegistroDocente');
var Login_Docente_Routes = require('./Routes/Auth_Docente');
var Chat_Routes = require('./Routes/Chat');
var Foro_Routes = require('./Routes/Foro');
var Universidad_Routes = require('./Routes/Universidad');
var GeneratorPDF_Routes =require('./Routes/GeneratorPDF');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', Login_Admin_Routes);
app.use('/', Registro_Docente_Routes);
app.use('/', Login_Docente_Routes);
app.use('/', Chat_Routes);
app.use('/', Foro_Routes);
app.use('/', Universidad_Routes);
app.use('/', GeneratorPDF_Routes);

module.exports = app;