const express = require('express');
const router = express.Router();
const passport = require('passport');
const utils = require('../lib/utils');

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

router.post("/", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const {_id, rating, isertTime, name, brand, quantity, price, picture, description, category} = req.body.product[0];
    const { userId, qty, total } = req.body;
    try{
        let order = new Order({
            total,
            userId,
            products: {
                _id,
                name,
                price,
                qty,
            }
        });
        order.save();  
        
        Product.findByIdAndUpdate(_id, {quantity: -qty}, {new: true});
    } catch(err) {
        return res.status(400).json(err);
    }
});

router.get("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {

    const id = req.params.id;
    try{
        Order.find({userId: id}, (err, order) => {
        if(err) {
            return next(err);
        } else if(!order) {
            return res.status(500).send('order não encontrado');
        } else {
            return res.status(200).json({success: true, order: order });
        }
    })} catch(err) {
        return res.status(400).json(err);
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