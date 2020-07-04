const express = require('express');
const router = express.Router();
const ObjectID = require("mongodb").ObjectId;
const fs = require('fs');

const Order = require('../models/order.model');

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

let productId = '';

router.route('/').post(async(req,res) => {
    
    if(!req.body) {
        res.status('400').send('Preencher os campos obriatórios antes de enviar!');
        return;
    }
    
    let order = new Order(req.body);    
            await order.save()
                    .then(ord => {
                        orderId = ord._id;
                        res.status(200).json({order: `${ord._id} adicionado com sucesso!`})
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    })   
});

router.route('/:id').get(async(req,res, next) => {

    if(!req.params.id) {
        res.status(500).send('Id da ordem não informado');
    }

    await Order.findById(req.params.id, (err, order) => {
        if(err) {
            return next(err);
        } else if(!order) {
            return res.status(404).send('order não encontrado')
        } else {
            return res.status(200).send(order);
        }
    })
});

router.route('/:id').put(async(req,res, next) => {
    if(!req.params.id) {
        return res.status(500).send('ID da ordem não encontrado na base de dados');
    }
    
    await Order.findByIdAndUpdate(req.params.id, req.body, (err, order) => {
        if(err) {
            return res.status(404).send(`Error: ${err}`);
        } else if(!order) {
            return res.status(404).send('order não encontrado')
        } else {
            try{
                order.save()
                    .then(order => {
                        res.locals.redirect = `/${userId}`
                        res.status(200).send(`order: ${order._id} alterado com sucesso!`)
                    })
            } catch(err) {
                next(err);
            }
        }
    })   
});

router.route('/:id').delete(async(req,res) => {
    if(!req.body) {
        return res.status(500).send('Not data informed!')
    }
    await Order.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if(err) {
            return res.status(404).send('Order not found in Database');
        } else {
            return res.status(200).send('Order deleted sucessfully!');
        }
    })
});

module.exports = router;