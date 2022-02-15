const express = require("express");
const router = express.Router();
const { OrderDomain } = require("../Domain/orderDomain");
const order = new OrderDomain();
const { ReceiveOrder } = require("../Domain/orderDomain");
const receivedOrder = new ReceiveOrder();
const authseller = require("../Authentication/selleraccess");

router
  .get("/getall", order.viewAllOrder)
  .get("/get/:orderId", order.viewOrderById)
  .delete("/remove/:orderId", order.cancelOrder)
  .put("/update/:orderId", order.updateOrder)
  .use(authseller)
  .get("/receivedorder", receivedOrder.getOrders)
  .put("/updatestatus/:id", receivedOrder.updateOrderStatus);

module.exports = router;
