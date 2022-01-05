const CartModel = require("../Model/cartModel");
const OrderModel = require("../Model/orderModel");
const ProductModel = require("../Model/ProductModel");
const receiveOrderModel = require("../Model/receiveOrderModel");

class CartDomain {
  async viewCart(req, res) {
    try {
      const cart = await CartModel.aggregate([
        { $match: { userName: req.decoded.userName } },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "productId",
            as: "productDetails",
          },
        },
        {
          $project: {
            "productDetails._id": false,
            "productDetails.__v": false,
            "productDetails.offer": false,
            "productDetails.category": false,
            "productDetails.seller": false,
            "productDetails.stock": false,
          },
        },
      ]);
      // .find({userName: req.decoded.userName});
      res.send(cart);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addToCart(req, res) {
    try {
      const prodDetail = {
        productId: req.body.productId,
        quantity: req.body.quantity,
      };
      let availprod = await CartModel.findOne({
        userName: req.decoded.userName,
        "items.productId": parseInt(req.body.productId),
      });
      if (availprod) {
        let result = await CartModel.findOneAndUpdate(
          {
            userName: req.decoded.userName,
            "items.productId": parseInt(req.body.productId),
          },
          {
            $inc: {
              "items.$.quantity": parseInt(req.body.quantity),
              totalPrice: parseInt(req.body.price),
            },
          }
        );
        return res.send("product Added Successfully");
      }

      let isvalidCart = await CartModel.findOne({
        userName: req.decoded.userName,
      });
      if (isvalidCart) {
        let result = await CartModel.updateOne(
          { userName: req.decoded.userName },
          {
            $push: { items: prodDetail },
            $inc: { totalPrice: parseInt(req.body.price) },
          }
        );
      } else {
        let cartdata = {
          userName: req.decoded.userName,
          items: [
            { productId: req.body.productId, quantity: req.body.quantity },
          ],
          totalPrice: req.body.price,
        };
        const cart = new CartModel(cartdata);

        await cart.save();
      }
      res.send("Product added to Cart");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async removeFromCart(req, res) {
    const productId = parseInt(req.params.productId);
    try {
      const result = await CartModel.updateOne(
        { userName: req.decoded.userName },
        {
          $pull: { items: { productId: productId } },
          $inc: { totalPrice: -parseInt(req.body.price) },
        }
      );
      if (result.modifiedCount == 0) {
        res.send("No such product found in cart");
      } else {
        res.send("Product removed successfully");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateCart(req, res) {
    try {
      const result = await CartModel.updateOne(
        { userName: req.decoded.userName },
        {
          $set: {
            items: req.body.items,
            totalPrice: req.body.totalPrice,
          },
        }
      );
      if (result.modifiedCount == 0) {
        res.send("Cart not found");
      } else {
        res.send("Cart updated successfully");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async clearCart(req, res) {
    try {
      const result = await CartModel.updateOne(
        { userName: req.decoded.userName },
        {
          $set: {
            items: [],
            totalPrice: 0,
          },
        }
      );
      if (result.modifiedCount == 0) {
        res.send("Cart not found");
      } else {
        res.send("Cart updated successfully");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async placeOrder(req, res) {
    try {
      const cart = await CartModel.findOne({ userName: req.decoded.userName });
      const cartItems = [];
      if (cart.items.length > 0) {
        let totalPrice = 0;
        for (let i in cart.items) {
          let product = await ProductModel.findOne({
            productId: cart.items[i].productId,
          });
          cartItems[i] = {
            productId: cart.items[i].productId,
            quantity: cart.items[i].quantity,
            price: product.offeredPrice * cart.items[i].quantity,
            seller: product.seller,
          };
          totalPrice += product.offeredPrice * cart.items[i].quantity
        }
        const orderdata = {
          userName: cart.userName,
          items: cartItems,
          totalPrice: totalPrice,
        };

        const order = new OrderModel(orderdata);
        const orderdetails = await order.save();
        const result = await CartModel.updateOne(
          { userName: req.decoded.userName },
          {
            $set: {
              items: [],
              totalPrice: 0,
            },
          }
        );
        if (result.modifiedCount == 0) {
          res.send("Cart not found");
        } else {
          sendOrder(orderdetails);
          res.send("Order Placed Successfully");
        }
      } else {
        res.send("Cart is Empty");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

async function sendOrder(order) {
  let orderBy = order.userName;
  for (item of order.items) {
    let data = {
      orderedBy: orderBy,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      orderDate: order.orderDate,
      refOrderId: order.orderId,
    };
    let product = await ProductModel.findOne({ productId: item.productId });
    data.seller = product.seller;
    const receiveOrder = new receiveOrderModel(data);
    async function storedata() {
      await receiveOrder.save();
    }
    async function stock() {
      let result = await ProductModel.updateOne(
        { productId: item.productId },
        { $inc: { stock: -parseInt(item.quantity) } }
      );
    }
    storedata();
    stock();
  }
}

module.exports = CartDomain;
