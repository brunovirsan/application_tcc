module.exports = function (app) {
    var autenticar = require('./../middlewares/autenticador');
    var relatorios = app.controllers.relatorio;
    app.get('/relatorio', relatorios.index);
    app.post('/getrelatorio', relatorios.getRelatorio);
    app.get('/getSensores/:id', relatorios.getSensors);

};