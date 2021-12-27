const express = require('express');
const router = express.Router();
const {OrderDomain} = require('../Domain/orderDomain')
const order = new OrderDomain();
const {ReceiveOrder} = require('../Domain/orderDomain');
const receivedOrder = new ReceiveOrder();
const authseller = require('../Authentication/selleraccess');

router
.get('/getall', order.viewAllOrder)
.get('/get/:orderId', order.viewOrderById)
.delete('/remove/:orderId', order.cancelOrder)
.use(authseller)
.get('/receivedorder', receivedOrder.getOrders)

module.exports= router;