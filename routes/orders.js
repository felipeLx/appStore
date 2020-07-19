const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');
const Product = require('../models/product.model');
router.route('/').get(async(req,res) => {
    
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

router.route('/').post(async(req,res) => {
    const {userId, productId, quantity, price, name,total} = req.body;
    try{
        let order = new Order({
            total,
            _id: userId,
            product: {
                _id: productId,
                name,
                price,
                quantity,
            }
        });    
        await order.save()
                .then(ord => {
                    res.json(ord);
                });   
        
        await Product.findByIdAndUpdate(productId, {quantity: -quantity}, {new: true})
    } catch(err) {
        return res.json(err);
    }


});

router.route('/:id').get(async(req,res, next) => {

    const {id} = req.params.id;
    try{
        await Order.findById(id, (err, order) => {
        if(err) {
            return next(err);
        } else if(!order) {
            return res.status(500).send('order não encontrado')
        } else {
            return res.json(order);
        }
    })} catch(err) {
        return res.json(err);
    }
});

router.route('/:id').put(async(req,res, next) => {
    const {userId, productId, quantity, price, name, total} = req.body;
    
    try{
        await Order.findByIdAndUpdate(userId, {
            total,
            products: {
                _id: productId,
                quantity,
                name,
                price
            }
        }, (err, order) => {
        if(err) {
            return res.status(404).send(`Error: ${err}`);
        } else if(!order) {
            return res.status(404).send('order não encontrado')
        } else {
                order.save()
                    .then(order => {
                        res.json(order)
                    })
        }
        });
        await Product.findByIdAndUpdate(productId, {quantity: -quantity}, {new: true})
    } catch(err) {
        next(err);
    } 
});

router.route('/:id').delete(async(req,res, next) => {
    const {userId, quantity, productId} = req.body;
    try{
        await Order.findByIdAndRemove(userId, (err, order) => {
        if(err) {
            return next(err);
        } else {
            return res.status(200).send(`${order._id} : deleted sucessfully!'`);
        }
        });

        await Product.findByIdAndUpdate(productId, {quantity: +quantity}, {new: true});
    } catch(err) {
        return res.json(err);
    }
});

module.exports = router;