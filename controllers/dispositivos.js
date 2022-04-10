module.exports = function (app) {
    var Usuario = app.models.usuario;
    var mydb = require('../models/database');
    var db = mydb.connect();

    var DispositivosController = {
        index: function (req, res) {
            var id = "";
            var dt = req.session.usuario;
            dt.forEach(function (line) {
                id = line.id_usuario;

            });
            console.log("idUser: " + id);
            var query = `SELECT * FROM dispositivo WHERE fk_usuario = ?`;
            var querrySensors = `SELECT id_sensor, nome FROM sensor`;
            var sensors = "";

            db.all(querrySensors, [], function(err, rows){
                if(err){
                    console.log(err);
                }
                sensors = rows;


            })

            db.all(query, id, function(err, rows) {
                if (err) {
                    return console.error(err.message);
                }
                var dispositivos = rows;
                var resultado = {dispositivos: dispositivos, idUser:id, sensors: sensors};
                console.log("result:" + rows);
                res.render('dispositivos/index', resultado );

            });


        },
        create: function (req, res) {
            var dispositivo = req.body.dispositivo;
            var rowID = "";
            var nome = dispositivo.nome;
            var sensor = dispositivo.sensor;
            var topico = dispositivo.topico;
            var idUser = dispositivo.idUsuario;
            var data = [nome, topico, idUser];
            var queryDispositivo = `INSERT INTO dispositivo(nome, topico, fk_usuario) VALUES(?, ?, ?)`;
            var querySensor = `INSERT INTO dispositivo_sensor(fk_dispositivo, fk_sensor) VALUES(?, ?)`;

            db.run(queryDispositivo, data, function (err) {
                if (err){
                    console.log(err);
                }
                rowID = this.lastID;
                var ids = [ rowID ,sensor];
                db.run(querySensor, ids, function (err) {
                    if (err){
                        console.log(err);
                    }
                
                });

            });
            
            res.redirect('/dispositivos');


        },
        show: function (req, res) {
            const { _id } = req.session.usuario;
            const dispositivoId = req.params.id;
            console.log(dispositivoId);

            var query = `SELECT * FROM dispositivo WHERE id_dispositivo = ?`;
            db.each(query, dispositivoId, function (err, row) {
                var dispositivo = row;
                var resultado = {dispositivo: dispositivo}
                res.render('dispositivos/show', {dispositivo});

            });

        },

        edit: function (req, res) {
            const { _id } = req.session.usuario;
            const dispositivoId = req.params.id;
            Usuario.findById(_id)
                .then((usuario) => {
                    const { dispositivos } = usuario;
                    //console.log(dispositivos);
                    const dispositivo = dispositivos.find((ct) => {
                        return ct._id.toString() == dispositivoId;
                    });
                    var resultado = {dispositivo: dispositivo}
                    console.log(resultado);
                    res.render('dispositivos/show', {dispositivo});

                })
                .catch(() => res.redirect('/'));

        },
        update: function (req, res) {
            const dispositivoId = req.params.id;
            var disp = req.body.dispositivo;
            console.log("sss:" + req.body.dispositivo);
            var nome = disp.nome, topico = disp.topico, sensor = disp.sensor;
            var set = [nome, topico, sensor, dispositivoId];
            const { usuario } = req.session;
            var query = `UPDATE dispositivo SET nome = ?, sensor = ?, topico = ? WHERE id_dispositivo = ?`;

            db.run(query, set);
            res.redirect('/dispositivos')

        },
        destroy(req, res) {
            const dispositivoId = req.params.id;
            var query = `DELETE FROM dispositivo WHERE id_dispositivo = ?`;

            db.run(query, dispositivoId);
            res.redirect('/dispositivos')

        }
    };
    return DispositivosController;

}
