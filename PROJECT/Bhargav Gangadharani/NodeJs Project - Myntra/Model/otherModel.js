const mongoose = require("mongoose");
const Joi = require("joi");
const database = 'mongodb://localhost/Myntra';
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // console.log("MongoDB Connected...");
});

autoIncrement.initialize(mongoose.connection);

// model
const OfferModel = mongoose.model(
    "offers",
    new mongoose.Schema({
        offerName:{
            type: String,
            required: true,
            trim: true
        },
        details: Array,
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'offers', field: 'offerId', startAt:  1000})
);

const CategoryModel = mongoose.model(
    "categories",
    new mongoose.Schema({
        categoryName:{
            type: String,
            required: true,
            trim: true
        },
        details: Array,
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'categories', field: 'categoryId', startAt:  10000})
);

const BrandModel = mongoose.model(
    "brands",
    new mongoose.Schema({
        brandName:{
            type: String,
            required: true,
            trim: true
        },
        details: Array,
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'brands', field: 'brandId', startAt:  001})
);

async function createIndexes(){
    await OfferModel.createIndexes( {'activeStatus': 1}, {'offerId': 1 })
    await CategoryModel.createIndexes( {'activeStatus': 1}, {'categoryId': 1 })
    await BrandModel.createIndexes( {'activeStatus': 1}, {'brandId': 1 })
}
// createIndexes(); 

module.exports.OfferModel = OfferModel
module.exports.CategoryModel = CategoryModel
module.exports.BrandModel = BrandModel