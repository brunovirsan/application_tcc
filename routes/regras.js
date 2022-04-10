module.exports = function (app) {
    var  autenticar = require('./../middlewares/autenticador'),
        regras = app.controllers.regras;
    app.get('/regras', autenticar, regras.index);
    app.post('/createregras', autenticar, regras.create);

};