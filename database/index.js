const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "allaboutdb",
        database: "PopularDishesList",
        port: 3306
    }    
);


connection.connect(() => {
    console.log('Connected to the root at PopularDishesList Database')
})


module.exports = connection;
