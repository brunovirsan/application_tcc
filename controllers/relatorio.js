module.exports = function (app) {
    var mydb = require('../models/database');
    var db = mydb.connect();
    var RelatorioController = {
        index: function (req, res) {
            var id = "";
            var dt = req.session.usuario;
            dt.forEach(function (line) {
                id = line.id_usuario;

            });
            
            var query = `SELECT * FROM dispositivo WHERE fk_usuario = ?`;

            db.all(query, id, function(err, rows) {
                if (err) {
                    return console.error(err.message);
                }
                var dispositivos = rows;
                var params = {dispositivos: dispositivos};
                console.log("result:" + params);
                res.render('relatorios/index', params);

            });


        },
        //Metodo para retornar 
        sendRelatorio: function(req, res){
            //console.log("Chamada relatorio dados");
            res.send();

        },
        //Metodo para consultar os do disp e sensor fornecido
        getRelatorio: function (req, res) { 
            var query = `SELECT fk_disp_sensor, id_dado, payload, data_captura, dispositivo.nome, sensor.nome, sensor.sigla_ident FROM dados_coletados, dispositivo_sensor, dispositivo, sensor 
            WHERE dados_coletados.fk_disp_sensor = dispositivo_sensor.id_disp_sensor AND dispositivo_sensor.fk_dispositivo = dispositivo.id_dispositivo
            AND dispositivo_sensor.fk_sensor = sensor.id_sensor AND dispositivo.id_dispositivo = ? AND sensor.id_sensor = ?
            AND strftime('%Y-%m-%d %H:%M:%S', data_captura) 
            BETWEEN ? AND ?`;
            var dataI = req.body.dataInicio;
            var dataF = req.body.dataFinal;
            dataI = dataI.replace(/T/g, " ");
            dataF = dataF.replace(/T/g, " ");
            var idDisp = req.body.id_Disp;
            var idSensor = req.body.id_Sensor;
            var params = [idDisp, idSensor, dataI, dataF];

            db.all(query, params, function (err, row) {
                if(err){
                    console.log(err);
                }
                var data = row;
                console.log(data);
                res.json(data);
  
            });
            

         },

         getSensors: function(req, res){  
            const dispositivoId = req.params.id;

            var query = `SELECT sensor.nome, sensor.id_sensor FROM sensor INNER JOIN dispositivo_sensor ON  sensor.id_sensor = dispositivo_sensor.fk_sensor 
            WHERE dispositivo_sensor.fk_dispositivo = ?`;
            console.log("R1:" + dispositivoId);
            db.all(query, dispositivoId, function (err, row) {
                if(err){
                    console.log(err);
                }
                var sensors = row;
                console.log(sensors);
                res.json(sensors);
  
            });

         }


        

    };
    return RelatorioController;

};