const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('./controller.js');
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist/')))

// GET restaurant by ID
app.get('/restaurants/:rest_id/', (req, res) => {
    controller.getRestaurantById(req, res);
})

//GET/POST/UPDATE/DELETE popular items for one restaurant

app.get('/restaurants/:rest_id/items', (req, res) => {
    const { rest_id } = req.body;
    controller.getItems(req, res);
})

app.post('/restaurants/:rest_id/items', (req, res) => {
    controller.postItem(req, res);
})
app.patch('/restaurants/:rest_id/items', (req, res) => {
    controller.updateItem(req, res);
})

app.delete('/restaurants/:rest_id/items/:item_id', (req, res) => {
    controller.deleteItem(req, res);
})

app.listen(port, () => {
    console.log('server is running on', + port)
})
