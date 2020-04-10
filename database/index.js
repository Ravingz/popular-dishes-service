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

const connection = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'popularitems',
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