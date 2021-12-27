const mongoose = require("mongoose");
const Joi = require("joi");
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // console.log("MongoDB Connected...");
});

autoIncrement.initialize(mongoose.connection);

// model
const itemSchema = new mongoose.Schema({
    productId:{
        type: Number,
        ref: 'products',
        required : true,
    },
    quantity:{
        type: Number,
        required : true,
    },
    price:{
        type: Number,
        required : true,
    }
})
const OrderModel = mongoose.model(
    "orders",
    new mongoose.Schema({
        userName:{
            type : String,
            required : true,
            ref : 'users',
        },
        items:[itemSchema],
        totalPrice:{
            type: Number,
            required:true,
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'orders', field: 'orderId', startAt:  100110110})
);

async function createIndexes(){
    await OrderModel.createIndexes( {'activeStatus': 1},{'userName' : 1}, {'orderId': 1 })
}
// createIndexes(); 

module.exports = OrderModel