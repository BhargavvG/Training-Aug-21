const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

// model
const OfferModel = mongoose.model(
  "offers",
  new mongoose.Schema({
    offerName: {
      type: String,
      required: true,
      trim: true,
    },
    details: Array,
    activeStatus: {
      type: Boolean,
      default: true,
    },
  }).plugin(autoIncrement.plugin, {
    model: "offers",
    field: "offerId",
    startAt: 1000,
  })
);

async function createIndexes() {
  await OfferModel.createIndexes({ activeStatus: 1 }, { offerId: 1 });
}
// createIndexes();

module.exports = OfferModel;
