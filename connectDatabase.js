

module.exports = function connect () {
    const sqlite3 = require('sqlite3').verbose();
    // Abre conexão com o Banco  de Dados
    let db = new sqlite3.Database('../database/datasensors.db', (err) => {
        if (err) {
            console.error(err.message);
        }

    });

    return db;

};