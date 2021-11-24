const express = require('express');
const router = express.Router();
const ElementDomain = require('../Domain/indexDomain')
const element = new ElementDomain();
const CategoryDomain = require('../Domain/categoryDomain')
const category = new CategoryDomain();
const OfferDomain = require('../Domain/offerDomain')
const offer = new OfferDomain();
const BrandDomain = require('../Domain/brandDomain')
const brand = new BrandDomain();

router
.get('/element', element.getAllElements)
.post('/element',element.addElement)
.get('/element/:elementId', element.getElementById)
.put('/element/:elementId', element.updateElement)
.delete('/element/:elementId', element.removeElement)
.get('/element/deleted', element.getDeletedElements)
.put('/element/restore', element.restoreElement)
.get('/optimization', element.optimization)

.get('/category', category.getAllCategories)
.post('/category',category.addCategory)
.get('/category/:categoryId', category.getCategoryById)
.put('/category/:categoryId', category.updateCategory)
.delete('/category/:categoryId', category.removeCategory)
.get('/category', category.getDeletedCategories)
.put('/category/restore', category.restoreCategory)

.get('/offer', offer.getAllOffers)
.post('/offer',offer.addOffer)
.get('/offer/:offerId', offer.getOfferById)
.put('/offer/:offerId', offer.updateOffer)
.delete('/offer/:offerId', offer.removeOffer)
.get('/offer/deleted', offer.getDeletedOffers)
.put('/offer/restore', offer.restoreOffer)

.get('/brand', brand.getAllBrands)
.post('/brand',brand.addBrand)
.get('/brand/:brandId', brand.getBrandById)
.put('/brand/:brandId', brand.updateBrand)
.delete('/brand/:brandId', brand.removeBrand)
.get('/brand/deleted', brand.getDeletedBrands)
.put('/brand/restore', brand.restoreBrand)

module.exports = router

