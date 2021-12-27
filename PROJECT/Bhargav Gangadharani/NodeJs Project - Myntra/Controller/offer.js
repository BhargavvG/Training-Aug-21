const express = require('express');
const router = express.Router();
const OfferDomain = require('../Domain/offerDomain')
const offer = new OfferDomain();
const authlogin = require('../Authentication/loginVerification');
const authadmin = require('../Authentication/adminaccess');

router
.get('/getall', offer.getAllOffers)
.get('/get/:offerId', offer.getOfferById)
.use(authlogin)
.use(authadmin)
.post('/add',offer.addOffer)
.put('/edit/:offerId', offer.updateOffer)
.delete('/remove/:offerId', offer.removeOffer)
.get('/deleted', offer.getDeletedOffers)
.put('/restore/:offerId', offer.restoreOffer)

module.exports = router

