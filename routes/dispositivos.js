module.exports = function (app) {
    var  autenticar = require('./../middlewares/autenticador')
        ,dispositivos = app.controllers.dispositivos;
    app.get('/dispositivos', dispositivos.index);
    app.get('/dispositivos/:id', dispositivos.show);
    app.post('/dispositivo', dispositivos.create);
    app.get('/dispositivo/:id/editar', dispositivos.edit);
    app.put('/dispositivo/:id',  dispositivos.update);
    app.delete('/dispositivo/:id',  dispositivos.destroy);

};