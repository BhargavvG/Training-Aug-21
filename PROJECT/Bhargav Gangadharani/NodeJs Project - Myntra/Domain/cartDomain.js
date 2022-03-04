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
          $lookup: {
            from: "brands",
            localField: "productDetails.brand",
            foreignField: "brandId",
            as: "brands",
          },
        },
        {
          $project: {
            "productDetails._id": false,
            "productDetails.__v": false,
            "productDetails.offer": false,
            "productDetails.category": false,
          },
        },
      ]);
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
      const avail = CartModel.findOne({
        userName: req.decoded.userName,
      });
      if (avail) {
        const result = await CartModel.updateOne(
          { userName: req.decoded.userName },
          {
            $set: {
              items: req.body.items,
              totalPrice: req.body.totalPrice,
            },
          }
        );
        res.send("Cart updated successfully");
      } else {
        let cartdata = {
          userName: req.decoded.userName,
          items: req.body.items,
          totalPrice: req.body.totalPrice,
        };
        const cart = new CartModel(cartdata);

        await cart.save();
      }
    } catch (err) {
      // console.log(err);
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
      let status = true;
      if (cart.items.length > 0) {
        let totalPrice = 0;
        for (let i in cart.items) {
          let product = await ProductModel.findOne({
            productId: cart.items[i].productId,
          });
          let size = product.sizes.find((s) => s.size == cart.items[i].size);
          if (size.stock < cart.items[i].quantity) {
            status = false;
          }
          cartItems[i] = {
            productId: cart.items[i].productId,
            quantity: cart.items[i].quantity,
            size: cart.items[i].size,
            price: product.offeredPrice * cart.items[i].quantity,
            seller: product.seller,
          };
          totalPrice += product.offeredPrice * cart.items[i].quantity;
        }
        if (status) {
          const orderdata = {
            userName: cart.userName,
            items: cartItems,
            totalPrice: totalPrice,
            address: req.body.address,
            paymentStatus: req.body.paymentStatus,
            paymentMode: req.body.paymentMode,
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
          // console.log(result);

          sendOrder(orderdetails);
          res.send({ id: orderdetails.orderId });
        } else {
          res.status(210).send("Stock error");
        }
      } else {
        res.status(205).send("Cart is Empty");
      }
    } catch (err) {
      console.log(err);
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
      size: item.size,
      price: item.price,
      orderDate: order.orderDate,
      refOrderId: order.orderId,
      address: order.address,
    };
    let product = await ProductModel.findOne({ productId: item.productId });
    data.seller = product.seller;
    const receiveOrder = new receiveOrderModel(data);
    async function storedata() {
      await receiveOrder.save();
    }
    async function stock() {
      let result = await ProductModel.updateOne(
        { productId: item.productId, "sizes.size": item.size },
        { $inc: { "sizes.$.stock": -parseInt(item.quantity) } }
      );
    }
    storedata();
    stock();
  }
}

// async function getProductDetails(productId) {
//   try {
//     const product = await ProductModel.aggregate([
//       {
//         $match: {
//           activeStatus: true,
//           productId: parseInt(productId),
//         },
//       },
//       {
//         $lookup: {
//           from: "categories",
//           localField: "category",
//           foreignField: "categoryId",
//           as: "category",
//         },
//       },
//       { $unwind: "$category" },
//       {
//         $lookup: {
//           from: "subcategories",
//           localField: "subCategory",
//           foreignField: "subCategoryId",
//           as: "subCategory",
//         },
//       },
//       { $unwind: "$subCategory" },
//       {
//         $lookup: {
//           from: "offers",
//           localField: "offer",
//           foreignField: "offerId",
//           as: "offer",
//         },
//       },
//       { $unwind: "$offer" },
//       {
//         $lookup: {
//           from: "brands",
//           localField: "brand",
//           foreignField: "brandId",
//           as: "brand",
//         },
//       },
//       { $unwind: "$brand" },
//       {
//         $project: {
//           "category._id": false,
//           "category.details": false,
//           "category.__v": false,
//           "category.activeStatus": false,
//           "subCategory._id": false,
//           "subCategory.__v": false,
//           "subCategory.activeStatus": false,
//           "offer._id": false,
//           "offer.details": false,
//           "offer.__v": false,
//           "offer.activeStatus": false,
//           "brand._id": false,
//           "brand.details": false,
//           "brand.__v": false,
//           "brand.activeStatus": false,
//         },
//       },
//     ]);
//     return product[0];
//   } catch (err) {
//     return err.message;
//   }
// }

module.exports = CartDomain;
