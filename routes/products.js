const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateProductInput = require('../utils/validation/product');

// Load Model
const Product = require('../models/Product');

// create product
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProductInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newProduct = new Product(req.body);

    newProduct.save()
            .then(product => {
                return res.json(product);
            })
            .catch(err => console.log(err));
});

// get all products
router.get('/', (req, res) => {
    Product.find({})
            .populate('category')
            .limit(100)
            .exec((err, products) => {
                if(err) return res.status(400).send(err);

                return res.json(products);
            })
})

// get product by id



module.exports = router;