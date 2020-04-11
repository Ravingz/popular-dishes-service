const models = require('../models');

module.exports = {
    get: (req, res) => {
        const restid = req.params.restid;
        console.log(`GET/restaurants/${restid}`);
        models.restaurants.read(restid, (err, restaurant) => {
            if (err) {
                res.status(401).send({}, 'RESTAURANT NOT FOUND');
            } else { 
                res.status(200).send(restaurant);
            };
    });
},
}

