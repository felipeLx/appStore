const express = require('express');
const router = express.Router();

let Product = require('../models/product.model');

router.route('/').get(async(req,res) => {
    await Product.find((err, products) => {
        if(err) {
            console.log(err);
        } else {
            res.json(products);
        }
    })
});

module.exports = router;