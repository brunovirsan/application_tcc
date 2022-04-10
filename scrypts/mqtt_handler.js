/*
const mqtt = require('../node_modules/mqtt');

class MqttHandler {

    constructor() {
        this.mqttClient = null;
        this.options = {
            port: 1883,
            host: '192.168.31.101',
            rejectUnauthorized: false,
            requestCert: false,
            protocol: 'mqtts'
        };


    }

    connect() {
        console.log("sdasa");
        this.mqttClient = mqtt.connect(this.options);

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log("err");
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });


    }

}

module.exports = MqttHandler;*/
