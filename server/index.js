require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Controller = require('./controller.js');
const port = 3000;
const cors = require('cors');
const winston = require('winston'); 

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist/')))

//Loader.io
app.get('/loaderio-763c154849fd67a4d84e63c93297d95d/', (req, res) => {
    res.sendFile(`${__dirname}/loaderio-763c154849fd67a4d84e63c93297d95d.txt`);
  });

// GET restaurant by ID
app.get('/restaurants/:rest_id/', Controller.getRestaurant);

//GET/POST/UPDATE/DELETE popular items for one restaurant

app.get('/restaurants/:rest_id/items', Controller.getItems);

app.post('/restaurants/:rest_id/items', Controller.postItem);

app.patch('/restaurants/:rest_id/items/:item_id', Controller.updateItem);

app.delete('/restaurants/:rest_id/items/:item_id', Controller.deleteItem);

//GET photos and review for items

// app.get('/restaurants/:rest_id/items/:item_id/photos', Controller.getPhotos);
// app.get('/restaurants/:rest_id/items/:item_id/reviews', Controller.getReviews);

app.listen(port, () => {
    console.log('server is running on', + port)
})
