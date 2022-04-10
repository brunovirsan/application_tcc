module.exports = function (app) {
    var home = app.controllers.home;
    app.get('/', home.index);
    app.get('/criar', home.criar);
    app.post('/create', home.create);
    app.post('/entrar', home.login);
    app.get('/sair', home.logout);
};