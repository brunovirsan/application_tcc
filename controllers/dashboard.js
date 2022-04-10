module.exports = function (app) {
    var mydb = require('../models/database');
    var db = mydb.connect();
    
    var DashboardController = {
        index: function (req, res) {
            var usuario = req.session.usuario;
            var params = {};
            var topics = new Array();
                var query = `SELECT * FROM dispositivo`;
                db.all(query, [], function (err, rows) {
                    if (err) {
                        throw err;
                    }else{
                        rows.forEach(function (row) {
                            //console.log('tp: ' + row.topico);
                            topics.push(row);            
                        });
                        //console.log('tr: ' + topics.length);
                        params = {usuario: usuario, topics: topics};
                        res.render('dashboard/index', params);

                    }

                });
                
                    
           

        },
        

    };
    return DashboardController;

};