const db = require('../../database');

module.exports = {
    read: (restid, callback) => {
        const sql = `SELECT name from restaurants WHERE id = ${restid}`
        // console.log('I am not getting called')
        db.query(sql, (err, restaurant) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, restaurant);
            }
        });
    },
};