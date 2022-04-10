module.exports = function (app) {
    var mydb = require('../models/database');
    var db = mydb.connect();

    var PlantioController = {
        index: function (req, res) {
            var id = "";
            var dt = req.session.usuario;
            dt.forEach(function (line) {
                id = line.id_usuario;

            });
            var usuario = req.session.usuario;
            var params = {};
            var query = `SELECT * FROM cultura WHERE fk_usuario = ?`;

            db.all(query, id, function (err, rows) {
                if (err) {
                    throw err;
                }
                var plantio = rows;
                var resultado = { plantio: plantio };
                console.log("result:" + resultado);
                res.render('plantio/index', resultado);

            });
            //res.render('plantio/index', params);

        },

        create: function (req, res) {
            var id = "";
            var dt = req.session.usuario;
            dt.forEach(function (line) {
                id = line.id_usuario;

            });
            console.log("idUser: " + id);
            var usuario = req.session.usuario;
            var params = {};
            var plantio = req.body.plantio;
            var nome = plantio.nome,
                variedade = plantio.variedade,
                dt_inicio = plantio.dt_inicio,
                dt_final = plantio.dt_final,
                descricao = plantio.descricao;
            var data = [nome, variedade, dt_inicio, dt_final, descricao, id];

            var queryPlantio = `INSERT INTO cultura(nome_cultura, nome_variedade, safra, periodo_ini, periodo_fin, descricao, fk_usuario) VALUES(?, ?, '', ?, ?, ?, ?)`;
            db.run(queryPlantio, data, function (err) {
                if (err) {
                    console.log(err);
                }
            });

            res.render('plantio/index');

        },

        variaveis: function (req, res) {

            //console.log(req.query.id);
            var id = req.query.id;

            var query = `SELECT * FROM variaveis_monitoradas WHERE fk_cultura = ?`;

            db.all(query, id, function (err, rows) {
                if (err) {
                    throw err;
                }
                var variavel = rows;
                var resultado = { variavel: variavel, id: id };
                console.log("result:" + resultado);
                res.render('plantio/variaveis', { variavel: variavel, id: id});

            });
            //res.render('plantio/variaveis', { id: id });

        },

        cadVariaveis: function (req, res) {
            var variavel = req.body.variavel;
            var nome = variavel.nome,
                descricao = variavel.descricao,
                id_var = variavel.id;
            console.log('var: ' + variavel.id);
            var data = [nome, descricao, id_var];

            var queryVariavel = `INSERT INTO variaveis_monitoradas(nome, descricao, fk_cultura) VALUES(?, ?, ?)`;
            db.run(queryVariavel, data, function (err) {
                if (err) {
                    console.log(err);
                }

            });
            res.redirect('/plantio/variaveis-monit');

        },

        variaveis_disp: function (req, res) {

            var id = req.query.id;
            var query = `SELECT * FROM dispositivo WHERE fk_usuario = ?`;
            res.render('plantio/variaveis_dispositivos', {id: id});
        }




    };
    return PlantioController;

};