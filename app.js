var express = require('express')
    , load = require('express-load')
    , path = require('path')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , expressSession = require('express-session')
    , methodOvirride = require('method-override')
    , error = require('./middlewares/error')
    , app = express()
    , server = require('http').Server(app)
    , io = require('socket.io')(server)
    , mqtt = require('mqtt')
    , mongoose = require('mongoose')
    , fs = require('fs')
    ,sys = require('sys');

var mydb = require('./models/database');
var db = mydb.connect();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(cookieParser('sistema_tcc'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOvirride('_method'));
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

//carregar middlewares de erros
app.use(error.notFound);
app.use(error.serverError);

var PORT = 1883;
var HOST = process.env.CLOUDMQTT_URL || '127.0.0.1';

var options = {
    username: '', 
    password: '',
    port: PORT,
    host: HOST,
    rejectUnauthorized: true,
    requestCert: false,
    protocol: 'mqtts'
};

//clientMqtt = mqtt.connect('mqtt://192.168.31.24:1883', {username: '', password: ''});
client = mqtt.connect('mqtt://127.0.0.1:1883', {options});

var query = `SELECT topico FROM dispositivo`;
var queryInsert = `INSERT INTO dados_coletados('fk_disp_sensor', 'payload') VALUES(?, ?)`;
var arrayTopics = new Array();

client.on('connect', function () {
    console.log("Connected server MQTT!");

    db.all(query, [], function (err, rows) {
        if (err) {
            throw err;
        }
        rows.forEach(function (row) {
            //console.log(row.topico);
            arrayTopics.push(row.topico);
            client.subscribe(row.topico);

        });

    });
});

io.sockets.on('connection', function (socket) {
    //client.subscribe('MQTTFilipeFlopEnvia');
    socket.on('subscribe', function (data) {
        console.log('Subscribing to '+data.topic);
        client.subscribe(data.topic);
    });
    socket.on('sendMessage', function(data){ 
        console.log('Command ' + data.msg);
        client.publish('MQTTFilipeFlopEnvia', data.msg);

        
    });
    
});



client.addListener('message', function(topic, payload){

    arrayTopics.forEach(function (rowTopics) {
        if (topic == rowTopics){
            try {
                var msg = JSON.parse(payload);

                var params, key_c, data_value;
                for (var [key, value] of Object.entries(msg.dado)) {
                    key_c =  key;
                    data_value = value;
                    
                }
                console.log("id_disp:" + msg.id_dispositivo + " " + key_c + " " + data_value);                    
                io.sockets.emit('mqtt',{'topic':String(topic),
                'payload':String(data_value)});

                params = [msg.id_dispositivo, data_value];
                db.run(queryInsert, params);
                
            }catch (e) {
                console.log(e);

            }
	}
        
    });

});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

server.listen(3000, () => {
    console.log('Iniciando Aplica????o..', server.address());
});

// admin@adm.com | 123