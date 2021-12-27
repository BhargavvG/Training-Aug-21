const express = require('express');
const router = express.Router();
const ProductDomain = require('../Domain/productDomain')
const product = new ProductDomain();
const authlogin = require('../Authentication/loginVerification');
const authseller = require('../Authentication/selleraccess');

router
.get('/getall', product.getAllProducts)
.get('/get/:productId', product.getProductById)
.get('/search/:data', product.search)
.get('/filter/searchBy', product.searchBy)
.use(authlogin)
.use(authseller)
.get('/myproducts', product.getmyProducts)
.post('/add',product.addProduct)
.put('/edit/:productId', product.updateProduct)
.delete('/remove/:productId', product.removeProduct)
.get('/deleted', product.getDeletedProducts)
.put('/restore/:productId', product.restoreProduct)


module.exports= router;