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
const ProductModel = mongoose.model(
    "products",
    new mongoose.Schema({
        productName:{
            type:"string",
            required: true,
            trim : true
        },
        category:{
            type: Number,
            required: true,
            ref: 'categories'
        },
        details:{
            type: Object
        },
        offer:{
            type : Number,
            ref: 'offers',
            required: true,
        },
        brand:{
            type : Number,
            ref:'brands',
            required: true,
        },
        actualPrice:{
            type: String,
            required: true,
            trim: true
        },
        offeredPrice:{
            type: String,
            required: true,
            trim: true
        },
        seller:{
            type : String,
            ref: 'users',
            required: true,
        },
        stock:{
            type: Number,
            required: true,
            trim: true
        },
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'products', field: 'productId', startAt:  100})
);


async function createIndexes(){
    await ProductModel.createIndexes( {'activeStatus': 1}, {'ProductId': 1 }, {'brand' : 1}, {'category' : 1})
}
// createIndexes();

module.exports = ProductModel