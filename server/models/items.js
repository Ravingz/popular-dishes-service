const db = require('../../database');

module.exports = {
    read: (rest_id, callback) => {
        const sql = `SELECT * from items WHERE items.restaurant_id = ${restid}`
        console.log(`GET/restaurants/${restid}/items/`)
        db.query(sql, (err, items) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, items);
            }
        });
    },

    // create: (item_name, restaurant_id, item_price, callback) => {
    // const sql = `INSERT INTO items (name, restaurant_id, price) values (${item_name}, ${restaurant_id}, ${item_price})`
    //     db.query(sql, (err, item) => {
    //         if (err) {
    //             console.log(err)
    //             return callback(err, null);
    //         } else {
    //             return callback(null, item);
    //         }
    //     });
    // },

    // update: () => {

    // },

    // delete: () => {

    // },

};
