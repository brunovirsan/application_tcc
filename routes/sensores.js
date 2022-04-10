module.exports = function (app) {
    var sensores = app.controllers.sensor;
    app.get('/sensores', sensores.index);
    app.post('/sensor', sensores.create);

};