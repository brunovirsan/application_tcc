module.exports = function (app) {

    var MapsController = {
        index: function (req, res) {
            var usuario = req.session.usuario
                , params = {usuario: usuario};
            res.render('maps/index', params);
            console.log("maps chamado");

        },

    };
    return MapsController;

}