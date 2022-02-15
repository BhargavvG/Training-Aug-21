const mongoose = require("mongoose");
const Joi = require("joi");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

// model
const ProductModel = mongoose.model(
  "products",
  new mongoose.Schema({
    productName: {
      type: "string",
      required: true,
      trim: true,
    },
    category: {
      type: Number,
      required: true,
      ref: "categories",
    },
    subCategory: {
      type: Number,
      required: true,
      ref: "subcategories",
    },
    details: {
      type: Object,
    },
    offer: {
      type: Number,
      ref: "offers",
      required: true,
    },
    brand: {
      type: Number,
      ref: "brands",
      required: true,
    },
    actualPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    offeredPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    seller: {
      type: String,
      ref: "users",
      required: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    img: {
      type: Array,
      required: true,
    },
    sizes: [{ size: String, stock: Number, measurement: String }],
    specifications: [{ title: String, value: String }],
    description: {
      type: String,
      trim: true,
    },
    features: [],
    activeStatus: {
      type: Boolean,
      default: true,
    },
  }).plugin(autoIncrement.plugin, {
    model: "products",
    field: "productId",
    startAt: 100,
  })
);

async function createIndexes() {
  await ProductModel.createIndexes(
    { activeStatus: 1 },
    { ProductId: 1 },
    { brand: 1 },
    { category: 1 }
  );
}
// createIndexes();

module.exports = ProductModel;
