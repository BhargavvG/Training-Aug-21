const express = require('express');
const router = express.Router();
const BrandDomain = require('../Domain/brandDomain')
const brand = new BrandDomain();
const authlogin = require('../Authentication/loginVerification');
const authadmin = require('../Authentication/adminaccess');

router
.get('/getall', brand.getAllBrands)
.get('/get/:brandId', brand.getBrandById)
.use(authlogin)
.use(authadmin)
.post('/add',brand.addBrand)
.put('/edit/:brandId', brand.updateBrand)
.delete('/remove/:brandId', brand.removeBrand)
.get('/deleted', brand.getDeletedBrands)
.put('/restore/:brandId', brand.restoreBrand)

module.exports = router

