module.exports = function (app) {
    var Rules = app.models.regras;
    var Users = app.models.usuario;
    var RegrasController = {
        index: function (req, res) {
            //const MongoClient = require('mongodb').MongoClient;
            var _id = req.session.usuario._id;
            Users.findById(_id, function (erro, usuario) {
                var user = req.session.usuario;

                var dispositivos = usuario.dispositivos;
                var resultado = {dispositivos: dispositivos};
                Rules.find({id_user: {$ne: null}, id_user: _id},function (erro, regras) {
                    console.log(regras);
                    var params = {usuario: user, dispositivos: dispositivos, regras: regras};
                    //console.log(resultado);
                    res.render('regras/index', params);


                });



            });

            //res.render('regras/index', params);
            console.log("regras chamado");

        },
        create: function (req, res) {
            var usuario = req.session.usuario._id
                , params = {usuario: usuario};
            var regras = req.body.regra;
            regras['regra'] = req.body.regra['valor'] + ' ' + req.body.regra['condicao'] + ' ' + req.body.regra['valorRegra'] ;
            Rules.create(regras, function (erro, regras) {
                if (erro){
                    //res.redirect('/create');
                    console.log("erro ao criar:" + erro);
                } else {
                    res.redirect('regras');
                }



            })


        }
    };
    return RegrasController;

}