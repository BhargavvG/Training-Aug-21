const express = require('express');
const router = express.Router();
const ProductDomain = require('../Domain/productDomain');
const product = new ProductDomain();


router
.get('/product', product.getmyProducts)
.post('/product',product.addProduct)
.get('/product/:productId', product.getmyProductById)
.put('/product/:productId', product.updateProduct)
.delete('/product/:productId', product.removeProduct)
.get('/product/deleted', product.getDeletedProducts)
.put('/product/restore', product.restoreProduct)

module.exports = router