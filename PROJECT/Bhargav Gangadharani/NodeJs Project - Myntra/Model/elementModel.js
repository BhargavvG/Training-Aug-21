const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

// model
const ElementModel = mongoose.model(
  "elements",
  new mongoose.Schema({
    elementName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    elementType: {
      type: String,
      required: true,
      enum: ["carousel", "banner", "category"],
    },
    titleImg: {
      type: String,
    },
    precedence: {
      type: Number,
      default: 20,
    },
    content: [
      {
        type: new mongoose.Schema({
          img: {
            type: String,
          },
          brand: [
            {
              type: new mongoose.Schema({
                brandId: {
                  type: Number,
                },
                brandName: {
                  type: String,
                },
              }),
            },
          ],
          category: [
            {
              type: new mongoose.Schema({
                categoryId: {
                  type: Number,
                },
                categoryName: {
                  type: String,
                },
              }),
            },
          ],
          subCategory: [
            {
              type: new mongoose.Schema({
                subCategoryId: {
                  type: Number,
                },
                subCategoryName: {
                  type: String,
                },
              }),
            },
          ],
        }),
      },
    ],
    activeStatus: {
      type: Boolean,
      default: true,
    },
  }).plugin(autoIncrement.plugin, {
    model: "elements",
    field: "elementId",
    startAt: 100,
  })
);

async function createIndexes() {
  await ElementModel.createIndexes([
    { activeStatus: 1 },
    { elementId: 1 },
    { endDate: 1 },
  ]);
}
// createIndexes();

module.exports = ElementModel;
