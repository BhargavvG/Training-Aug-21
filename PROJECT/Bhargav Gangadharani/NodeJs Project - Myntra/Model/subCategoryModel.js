const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const SubCategoryModel = mongoose.model(
  "subCategories",
  new mongoose.Schema({
    subCategoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
  }).plugin(autoIncrement.plugin, {
    model: "subCategories",
    field: "subCategoryId",
    startAt: 500,
  })
);

async function createIndexes() {
  await SubCategoryModel.createIndexes(
    { activeStatus: 1 },
    { subCategoryId: 1 }
  );
}
// createIndexes();

module.exports = SubCategoryModel;
