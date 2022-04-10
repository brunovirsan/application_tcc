module.exports = function (app) {
    var Usuario = app.models.usuario;
    var mydb = require('../models/database');
    var db = mydb.connect();

    const HomeController = {
        index: function(req, res) {
            var title = "TCC";
            res.render('home/index', {title: title});
            console.log("login home chamado")

        },

        login: function (req, res) {
            var params = {email: req.body.usuario.email, password: req.body.usuario.password};
            var data = [params.email, params.password];
            var query = `SELECT id_usuario, name, email, password FROM usuario WHERE email = ? AND password = ?`;

            db.all(query, data, function(err, rows) {
                console.log(rows.length);

                if (rows.length === 1){
                    req.session.usuario = rows;
                    console.log(req.session.usuario);
                    console.log("logado");
                    res.redirect('/dashboard');

                }else{
                    console.log("não encontrado.");
                    res.redirect('/');

                }
                if (err) {
                    return console.error(err.message);
                    res.redirect('/');
                }

            });

        },

        logout: function (req, res) {
            req.session.destroy();
            res.redirect('/');

        },

        criar: function(req, res){
            res.render('home/criarconta');
        },

        create: function (req, res) {
            var usuario = req.body.usuario;
            var sql = `INSERT INTO usuario(name, email, password) VALUES(?, ?, ?)`;
            var data = [usuario.nome, usuario.email, usuario.password];

            db.run(sql, data, function (err) {
                if (err){
                    console.log(err);
                }
                res.redirect('/');

            });



        }
    };
    return HomeController;
};