const express = require('express');
const router = express.Router();
const CartDomain = require('../Domain/cartDomain')
const cart = new CartDomain();


router
.get('/get', cart.viewCart)
.post('/add', cart.addToCart)
.put('/edit', cart.updateCart)
.delete('/remove', cart.clearCart)
.delete('/remove/:productId', cart.removeFromCart)
.post('/order', cart.placeOrder)

module.exports= router;