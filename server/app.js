'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const routes = require('./routes');
// const photos = require('./routes/photos');
// const reviews = require('./routes/reviews');

/****************MIDDLEWARE**********************/
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist/')))

/*****ENDPOINTS*****/

// app.use('/restaurants', routes.restaurants);
app.use('restaurants/:restid/items', routes.items);
app.use('/restaurants', routes.restaurants);

app.listen(port, () => {
    console.log('server is running on', + port)
})
