const db = require('../database/index.js');

const getRestaurantById = (rest_id, callback) => {
    const sql = `SELECT * from restaurants WHERE restaurants.id = ${rest_id}`
    db.query(sql, (err, restaurant) => {
        if (err) {
            console.log(err, 'Cannpt get restaurant');
            return callback(err, null)
        } else {
            return callback(null, restaurant);
        }
    })
}

const getItemsByRestaurant = (rest_id, callback) => {
    const sql = `SELECT * from items WHERE items.restaurant_id = ${rest_id}`
    db.query(sql, (err, items) => {
        if (err) {
            console.log(err, 'Cannot get items');
            return callback(err, null);
        } else {
            return callback(null, items)
        }
    })
};

const postItem = (item, rest_id, callback) => {
    const sql = `INSERT INTO items (name, restaurant_id, price) values (${item.name}, ${rest_id}, ${item.price})`
    db.query(sql, (err, item) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, item);
        }
    })
};

const updateItem = (rest_id, item_id, item, callback) => {
    const sql = `UPDATE items SET name=${item.name}, price=${item.price} WHERE id=${item_id}`;
    db.query(sql, (err, item) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, item);
        }
    })
}

const deleteItem = (rest_id, item_id, callback) => {
    const sql = `DELETE FROM items WHERE items.id=${item_id}`;
    db.query(sql, (err, item) => {
        if (err) {
            return callback(err, null); 
        } else {
            return callback(null, item);
        }
    });
};

const getItemPhotos = (item_id, callback) => {
    const sql = `SELECT items.name, items.price, photos.url, photos.caption FROM photos INNER JOIN items ON (photos.item_id = items.id) where items.id = ${item_id};`
    db.query(sql, (err, photos) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, photos);
        }
    });
};

module.exports = { getRestaurantById, getItemsByRestaurant, postItem, updateItem, deleteItem, getItemPhotos };
