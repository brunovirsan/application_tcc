module.exports = function (app) {
    var Schema = require('mongoose').Schema;
    var mongoose = require('mongoose');

    var data = new Schema({
        sensor: {type: String},
        time: {type: String},
        //valor: {type: Number}

    });

    var dispositivo = new Schema({
        nome: {type: String, required: true},
        plataforma: {type: String, required: false},
        grupo: {type: String, required: false},
        sensor: {type: String, required: false},
        topic: {type: String},
        datasensors: {type: Object}
    });


    var usuario = new Schema({
       nome: {type: String, required: true},
       email: {type: String, required: true},
       password: {type: String, required: true},
        dispositivos: [dispositivo]
    });

    var models = mongoose.model('usuarios', usuario);
    return models;

};