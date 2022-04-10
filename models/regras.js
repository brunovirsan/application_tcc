module.exports = function (app) {
    var Schema = require('mongoose').Schema;
    var mongoose = require('mongoose');

    var regras = new Schema({
        id_user: Schema.Types.ObjectId,
        nome: {type: String},
        dispositivo: {type: Object},
        topicIn: {type: String},
        status: {type: Boolean, default: true},
        regra: {type: String},
        topicOut: {type: String},
        acao: {type: String}
    });

    var models = mongoose.model('regras', regras);
    return models;

};