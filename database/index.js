// const mysql = require('mysql');

// const connection = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "allaboutdb",
//         database: "PopularDishesList",
//         port: 3306
//     }    
// );


// connection.connect(() => {
//     console.log('Connected to the root at PopularDishesList Database')
// })


// module.exports = connection;

const pg = require('pg');
const config = require('../config.js');

const connection = new pg.Pool({
  host: `${hostname}`,
  user: `${user}`,
  password: `${password}`,
  database: `${databaseName}`,
  port: 5432,
});

connection.connect((err) => {
  if (err) {
    console.error('Connection Error');
  } else {
    console.log('Connected to Postgres DB');
  }
});

module.exports = connection;