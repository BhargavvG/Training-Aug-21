const mongoose = require("mongoose");
const Joi = require("joi");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

// model
const receiveOrderModel = mongoose.model(
  "receiveOrders",
  new mongoose.Schema({
    seller: {
      type: String,
      required: true,
      ref: "users",
    },
    orderedBy: {
      type: String,
      required: true,
      ref: "users",
    },
    refOrderId: {
      type: Number,
      ref: "orders",
    },
    productId: {
      type: Number,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: new mongoose.Schema({
        name: {
          type: String,
        },
        phone: {
          type: Number,
          min: 0000000001,
          max: 9999999999,
        },
        address: {
          type: String,
        },

        pincode: {
          type: Number,
          match: /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/,
        },
        town: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
      }),
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "InTransit", "Delivered"],
      default: "Pending",
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
  }).plugin(autoIncrement.plugin, {
    model: "receiveOrders",
    field: "receiveOrderId",
    startAt: 10000,
  })
);

async function createIndexes() {
  await receiveOrderModel.createIndexes(
    { activeStatus: 1 },
    { receiveOrderId: 1 }
  );
}
// createIndexes();

module.exports = receiveOrderModel;
