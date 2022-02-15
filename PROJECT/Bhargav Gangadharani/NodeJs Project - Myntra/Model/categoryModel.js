const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const CategoryModel = mongoose.model(
  "categories",
  new mongoose.Schema({
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    sizeOptions: {
      type: Array,
    },
    details: Array,
    activeStatus: {
      type: Boolean,
      default: true,
    },
  }).plugin(autoIncrement.plugin, {
    model: "categories",
    field: "categoryId",
    startAt: 10000,
  })
);

async function createIndexes() {
  await CategoryModel.createIndexes({ activeStatus: 1 }, { categoryId: 1 });
}
// createIndexes();

module.exports = CategoryModel;
