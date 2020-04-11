const models = require('../models')

module.exports = {
    get: (req, res) => {
        console.log(req.params)
        const restid = req.params.restid;
        models.items.read(restid, (err, items) => {
            if (err) {
                    console.log(err)
                // res.status(404).send('NOT FOUND');
            } else {
                res.send(items);
            };
        });
    },

//     post: (req, res) => {
//         const { rest_id } = req.params;
//         models.items.create(item_name, rest_id, item_price, (err, item) => {
//             if (err) {
//                 res.status(401).send('NOT AUTHORIZED')
//             } else {
//                 res.send(item)
//             }
//         });
//     },

//     update: (req, res) => {
//     },

//     delete: (req, res) => {

//     },
};
