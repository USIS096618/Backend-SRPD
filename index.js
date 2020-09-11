'use strict'

var mongoose = require('mongoose');
var app = require('./app');
const config = require('./Config')

mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

mongoose.connect(config.db, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})
        .then(() => {
            app.listen(config.port, () => {
                console.log('Servidor corriendo en http://localhost:'+config.port);
            });

        })
        .catch((err) => {
            console.log(err);
        });