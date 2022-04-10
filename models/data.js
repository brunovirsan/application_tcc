module.exports = function (app) {
    var Schema = require('mongoose').Schema;
    var mongoose = require('mongoose');

    var data = new Schema({

    });

    var models = mongoose.model('datas', data);
    return models;

};