module.exports = function (app) {
    var autenticar = require('./../middlewares/autenticador');
    var dashboard = app.controllers.dashboard;
    app.get('/dashboard', dashboard.index);

};