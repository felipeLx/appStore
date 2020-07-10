const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

router.route('/user').get(async(req,res) => {
    
    await User.find({}, (err, users) => {
        if(users.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(users);
        }
    })
});

router.route('/api').get(async(req,res) => {
    
    await Product.find({}, (err, products) => {
        if(products.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(products);
        }
    })
});

router.route('/order').get(async(req,res) => {
    
    await Order.find({}, (err, orders) => {
        if(orders.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(orders);
        }
    })
});

module.exports = router;