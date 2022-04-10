module.exports = function (app) {
    var Usuario = app.models.usuario;
    var mydb = require('../models/database');
    var db = mydb.connect();

    const SensorController = {
        index: function(req, res) {
            var query = `SELECT * from sensor`;
            var sensor = "";
            db.all(query, [], function(err, row){
                if(err){
                    console.log(err);
                }
                sensores = row;
                result = {sensores: sensores};
                res.render('sensor/index', result);
                console.log("pag sensors selected");


            });
            

        },

        create: function (req, res) {
            var sensor = req.body.sensor;
            var nome = sensor.nome;
            var sg = sensor.sigla_ident;
            var desc = sensor.descricao;
            console.log("RRRR:" + nome);
            var params = [nome, sg, desc];
            var insert = `INSERT INTO sensor(nome, sigla_ident, descricao) VALUES(?, ?, ?)`;
            

            db.run(insert, params, function(err){
                if(err){
                    console.log(err);
                }

            });

            res.redirect('/sensores');






        }
    };
    return SensorController;
};