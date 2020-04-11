const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

router
    .route('/:restid/items')
    .get(controllers.items.get)
    // .post(controllers.items.post)
    // .put(controllers.items.put)
    // .delete(controllers.items.delete);


module.exports = router;