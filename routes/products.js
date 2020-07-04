const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.route('/').get(async(req,res) => {
    
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

router.route('/').post(async(req,res) => {
    
    if(!req.body) {
        res.status('400').send('Preencher os campos obriatórios antes de enviar!');
        return;
    }
    console.log(req.body);
    
    let product = new Product(req.body);    
            await product.save()
                    .then(prod => {
                        res.status(200).send(prod);
                        window.alert('Product save successfully!');
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    })   
});

router.route('/:id').get(async(req,res, next) => {

    if(!req.params.id) {
        res.status(500).send('Id do produto não informado');
    }

    await Product.findById(req.params.id, (err, product) => {
        if(err) {
            return next(err);
        } else if(!product) {
            return res.status(404).send('produto não encontrado')
        } else {
            return res.status(200).send(product);
        }
    })
});

router.route('/:id').put(async(req,res, next) => {
    if(!req.params.id) {
        return res.status(500).send('ID do producto não encontrado na base de dados');
    }
    
    await Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        if(err) {
            return res.status(500).send('Product not found in Database');
        } else if(!product) {
            return res.status(404).send('Producto não encontrado');
        }else {
            product.save()
                    .then(prod => {
                        res.status(200).send(prod);
                    })
                    .catch(err => {
                        next(err);
                    }) 
    }})   
});

router.route('/:id').delete(async(req,res) => {
    if(!req.body) {
        return res.status(500).send('Not data informed!')
    }
    await Product.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if(err) {
            return res.status(404).send('Product not found in Database');
        } else {
            return res.status(200).send('Product deleted sucessfully!');
        }
    })
});

router.post('/photo',(req,res) => {
    console.log('photo upload');
    
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.contentType = 'image/png';
    newItem.save();
   });

module.exports = router;