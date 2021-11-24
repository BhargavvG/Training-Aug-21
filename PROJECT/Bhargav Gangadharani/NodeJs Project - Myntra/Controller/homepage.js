const express = require('express');
const router = express.Router();
const authlogin = require('../Authentication/loginVerification');
const ElementDomain = require('../Domain/indexDomain')
const element = new ElementDomain();
const ProductDomain = require('../Domain/productDomain')
const product = new ProductDomain();

router
.get('/home', element.getAllElements)
.get('/searchBy', product.searchBy)
.get('/product', product.getAllProducts)
.get('/product/:productId', product.getProductById)

module.exports= router;
