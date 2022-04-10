module.exports = function (app) {
    var  autenticar = require('./../middlewares/autenticador'),
        maps = app.controllers.maps;
    app.get('/maps', maps.index);

};