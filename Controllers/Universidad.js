'use strict'

var fs = require('fs');
var path = require('path');
const UniversidadModule = require('../Models/Universidad');
const CarreraModule = require('../Models/Carrera');
const PostgradoModule = require('../Models/Postgrado')
const Mongoose = require('mongoose');

const Universidad = {

    newUniversidad: (req, res) => {

        const {Universidad, Carrera} = req.body;

        const UniversidadRef = new UniversidadModule();
        UniversidadRef.label = Universidad;
        UniversidadRef.value = Universidad;

        const CarreraRef = new CarreraModule();
        CarreraRef.label = Carrera;
        CarreraRef.value = Carrera;
        CarreraRef.idUniversidad = UniversidadRef._id

        UniversidadRef.save((err) => {

            if (err) {
                return res.status(500).send({
                    err
                })
            }
            else{
                CarreraRef.save((err) => {
                    if (err) {
                        return res.status(500).send({
                            err
                        })
                    }
                    else{
                        return res.status(200).send({
                            status: "Success"
                        })
                    }
                })
            }

        })

    },
    newCarrera: (req, res) => {

        const { Carrera, UniversidadId} = req.body;

        const CarreraRef = new CarreraModule();
        CarreraRef.label = Carrera;
        CarreraRef.value = Carrera;
        CarreraRef.idUniversidad = UniversidadId;

        CarreraRef.save((err) => {
            if (err) {
                return res.status(500).send({
                    err
                })
            }
            else{
                return res.status(200).send({
                    status: 'Success'
                })
            }
        })

    },
    newUniversidadPostgrado: (req, res) => {
        const {Universidad, Postgrado} = req.body;

        const UniversidadRef = new UniversidadModule();
        UniversidadRef.label = Universidad;
        UniversidadRef.value = Universidad;

        const PostgradoRef = new PostgradoModule();
        PostgradoRef.label = Postgrado;
        PostgradoRef.value = Postgrado;
        PostgradoRef.idUniversidad = UniversidadRef._id

        UniversidadRef.save((err) => {

            if (err) {
                return res.status(500).send({
                    err
                })
            }
            else{
                PostgradoRef.save((err) => {
                    if (err) {
                        return res.status(500).send({
                            err
                        })
                    }
                    else{
                        return res.status(200).send({
                            status: "Success"
                        })
                    }
                })
            }

        })
    },
    newPostrgado: (req, res) => {
        const { Postgrado, UniversidadId} = req.body;

        const PostgradoRef = new PostgradoModule();
        PostgradoRef.label = Postgrado;
        PostgradoRef.value = Postgrado;
        PostgradoRef.idUniversidad = UniversidadId;

        PostgradoRef.save((err) => {
            if (err) {
                return res.status(500).send({
                    err
                })
            }
            else{
                return res.status(200).send({
                    status: 'Success'
                })
            }
        })
    },
    getUniversidades: (req, res) => {
        const config = [
            
            {
                $lookup: {
                    from: 'carreras',
                    localField: '_id',
                    foreignField: 'idUniversidad',
                    as: 'Carreras'
                }
            },
            {
                $project: {
                    
                    label: "$label",
                    value: {
                        _id: "$_id",
                        Universidad: "$value",
                        Carreras: "$Carreras"
                    },
                    
                }
            }
        ];

        UniversidadModule.aggregate(config).then((resp => {
            res.status(200).send({
                Universidades: resp
            })
        }))
    },
    getUniversidadesPostgrado: (req, res) => {
        const config = [
            
            {
                $lookup: {
                    from: 'postgrados',
                    localField: '_id',
                    foreignField: 'idUniversidad',
                    as: 'Postgrados'
                }
            },
            {
                $project: {
                    
                    label: "$label",
                    value: {
                        _id: "$_id",
                        Universidad: "$value",
                        Postgrados: "$Postgrados"
                    },
                    
                }
            }
        ];

        UniversidadModule.aggregate(config).then((resp => {
            res.status(200).send({
                Universidades: resp
            })
        }))
    }

}

module.exports = Universidad;