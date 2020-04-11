const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.route(['/', '/:restid'])
  .get(controllers.restaurants.get)
//   .post(controllers.restaurants.post)
//   .put(controllers.restaurants.put)
//   .delete(controllers.restaurants.delete);

module.exports = router;