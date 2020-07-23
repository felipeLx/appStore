const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order = require('../models/order.model');
const Product = require('../models/product.model');

router.get("/", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    
    Order.find({}, (err, orders) => {
        if(orders.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(orders);
        }
    })
});

router.post("/", passport.authenticate('jwt', {session: false}), (req,res) => {
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
        order.save()
                .then(ord => {
                    res.json(ord);
                });   
        
        Product.findByIdAndUpdate(productId, {quantity: -quantity}, {new: true})
    } catch(err) {
        return res.json(err);
    }


});

router.get("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {

    const {id} = req.params.id;
    try{
        Order.findById(id, (err, order) => {
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

router.put("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const {userId, productId, quantity, price, name, total} = req.body;
    
    try{
        Order.findByIdAndUpdate(userId, {
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
        Product.findByIdAndUpdate(productId, {quantity: -quantity}, {new: true})
    } catch(err) {
        next(err);
    } 
});

router.delete("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const {userId, quantity, productId} = req.body;
    try{
        Order.findByIdAndRemove(userId, (err, order) => {
        if(err) {
            return next(err);
        } else {
            return res.status(200).send(`${order._id} : deleted sucessfully!'`);
        }
        });

        Product.findByIdAndUpdate(productId, {quantity: +quantity}, {new: true});
    } catch(err) {
        return res.json(err);
    }
});

module.exports = router;