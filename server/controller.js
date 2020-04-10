const db = require('../database/index.js');

const getDishes = (request, response) => {
    var restaurant_id = request.query.restaurant_id;
    var query = `SELECT * FROM restaurants WHERE id=${restaurant_id}`;
    db.query(query, (err, data) => {
        if (err) {
            response.status(400).send('Cannot get dishes', {});
        } else {
            response.send(data);
        }
    });
}

const getPhotos = (request, response) => {
    var dish_id = request.query.dish_id;
    var query = 'SELECT * FROM photos WHERE popular_dish =' + dish_id;
    db.query(query, (err, data) => {
        if (err) {
            response.status(400).send('Cannot get photos');
        } else {
            response.send(data);
        }
    });
}

const getCompany = (companyNumber, response) => {
    // console.log('req', req.param)
    var query = `SELECT * FROM restaurants WHERE id=${companyNumber}`;
    db.query(query, (err,data) => {
        if (err) {
            // console.log(err);
            response.status(400).send('bad request');
        } else {
            response.send(data);
        }
    })
}

const getReviews = (request, response) => {
    // var dish_id = request.query.dish_id;
    var query = 'SELECT a.*, b.* FROM reviews a INNER JOIN users b ON a.userid = b.userid';
    db.query(query, (err, data) => {
        if (err) {
            response.status(400).send('bad request');
        } else {
            response.send(data.slice(0, request.query.numberOfReviews));
        }
    })
}


module.exports = { getDishes, getPhotos, getCompany, getReviews }