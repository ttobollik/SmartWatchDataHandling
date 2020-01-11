const Product = require('../models/product.model');

//Simple vesion, without validation for now
exports.test = (req, res) => {
    res.send('Greeting from Test controller!');
};

//function to create a new product
exports.product_create = (req, res) => {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save((err)=> {
        if (err) return next(err);
        else res.send('Product Created Successfully ');
    })
};

//function to read a product
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//method for updating a product
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

//method for deleting a product
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};


