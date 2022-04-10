const path = require('path')
const dbPath = path.resolve(__dirname, '../database/database_tcc.db')
const sqlite3 = require('sqlite3').verbose();
module.exports =  {
    
    connect: function () {
        let db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error(err.message);
            }

        });

        return db;
        
    },
    
    close: function () {
        
    },
    
    insert: function () {
        
    },
    
    update: function () {
        
    },
    
    delete: function () {
        
    }
    


};