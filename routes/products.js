const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.route('/').get(async(req,res) => {
    
    try {
        const products = await Product.find({}, (err, products) => {
        if(products.length === 0) {
            return res.json('Good request, but don`t have data to show');
        } else if(err) {
            res.json('Not possible to access your data in the database, verify the request! ' + err);
        } else {
            return res.status(200).send(products);
        }
    })} catch(err) {
        return res.json('Not possible to access the database ' + err);
    }
});

router.route('/').post(async(req,res) => {
    const { name, brand, quantity, price, description, picture, category  } = req.body;
    
        let newProduct = await Product.findOne({name: name}, (err, prdMatch) => {
            if (prdMatch) {
                return res.json({
                    error: "Product already registered!"
                });
            }
        })
        newProduct = new Product({
            name: name,
            brand: brand,
            quantity: quantity,
            price: price,
            picture: picture,
            description: description, 
            category: category,
        });    
            newProduct.save()
            return res.status(200).send(newProduct);

});

router.route('/:id').get(async(req,res, next) => {

    try {
        const product = await Product.findById(req.params.id, (err, product) => {
            if(err) {
            return next(err);
            } else if(!product) {
                res.json('Not possible to access your data in the database, verify the request! ' + err);
        } else {
            return res.json(product);
        }
    })} catch(err) {
        return res.json('Not possible to access the database ' + err);
    }
});

router.route('/:id').put(async(req,res, next) => {

    try {
        await Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        if(err) {
            return res.status(500).send('Product not found in Database');
        } else if(!product) {
            return res.status(404).send('Producto não encontrado');
        }else {
            product.save()
                    .then(prod => {
                        return res.json(prod);
                    })
                    .catch(err => {
                        next(err);
                    }) 
    }}) } catch(err) {
        return res.json('Not possible to access the database ' + err);
    }
});

router.route('/:id').delete(async(req,res) => {
   
    try {
        await Product.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if(err) {
            return res.json('Product not found in Database');
        } else {
            return res.json('Product deleted sucessfully!');
        }
    })} catch(err)  {
        return res.json('Not possible to access the database ' + err);
    }
});

router.post('/photo',(req,res) => {
    console.log('photo upload');
    
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.contentType = 'image/png';
    newItem.save();
   });

module.exports = router;