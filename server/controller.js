const Model = require('./model.js');

const getRestaurant = (req, res) => {
    const {rest_id }= req.params;
    Model.getRestaurantById(rest_id, (err, restaurant) => {
        if (err) {
            res.status(401).send(err, 'NOT FOUND')
        } else {
            res.send(restaurant);
        }
    });
};

const getItems = (req, res) => {
    const {rest_id} = req.params;
    Model.getItemsByRestaurant(rest_id, (err, items) => {
        if (err) {
            res.status(401).send(err, 'NOT FOUND')
        } else {
            res.send(items);
        }
    });
};

const postItem = (req, res) => {
    const { rest_id } = req.params;
    const item = req.body;
    console.log(req.body, 'req.body')
    Model.postItem(item, rest_id, (err, item) => {
        if (err) {
            res.status(400).send(err, 'NOT POSTED')
        } else {
            res.send(item);
        }
    });
};

const updateItem = (req, res) => {
    const { rest_id, item_id } = req.params;
    const item = req.body;
    Model.updateItem(rest_id, item_id, item, (err, item) => {
        if (err) {
            res.status(400).send('CANNOT UPDATE')
        } else {
            res.send(item);
        }
    });
};

const deleteItem = (req, res) => {
    const { rest_id, item_id } = req.params;
    Model.deleteItem(rest_id, item_id, (err, item) => {
        if (err) {
            res.status(400).send('CANNOT DELETE')
        } else {
            res.send(item);
        }
    });
};

const getItemPhotos = (req, res) => {
    const { item_id} = req.params;
    Model.getItemPhotos(item_id, (err, photos) => {
        if (err) {
            res.status(400).send('CANNOT GET PHOTOS')
        } else {
            res.send(photos);
        }
    })
}

module.exports = { getRestaurant, getItems, postItem, updateItem, deleteItem, getItemPhotos }