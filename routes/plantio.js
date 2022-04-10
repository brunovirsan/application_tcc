module.exports = function (app) {
    var  autenticar = require('./../middlewares/autenticador')
        ,plantio = app.controllers.plantio;
    app.get('/plantio', plantio.index);
    app.post('/plantCreate', plantio.create);
    app.get('/plantio/variaveis-monit', plantio.variaveis);
    app.post('/plantio/variaveis/cadastrar_variaveis', plantio.cadVariaveis);
    app.get('/variaveis-monit/dispositivos', plantio.variaveis_disp);
    /*app.get('/dispositivos/:id', dispositivos.show);
    app.post('/dispositivo', dispositivos.create);
    app.get('/dispositivo/:id/editar', dispositivos.edit);
    app.put('/dispositivo/:id',  dispositivos.update);
    app.delete('/dispositivo/:id',  dispositivos.destroy);*/

};