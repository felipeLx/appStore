const express = require('express');
const router = express.Router();

let Products = require('../models/product.model');

router.route('/').get(async(req,res) => {
    await Products.find((err, products) => {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    })
});

module.exports = router;