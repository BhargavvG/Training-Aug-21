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
const receiveOrderModel = mongoose.model(
    "receiveOrders",
    new mongoose.Schema({
        seller:{
            type : String,
            required : true,
            ref : 'users',
        },
        orderedBy:{
            type : String,
            required : true,
            ref : 'users',
        },
        refOrderId:{
            type: Number,
            ref : 'orders',
        },
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
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'receiveOrders', field: 'receiveOrderId', startAt:  10000})
);

async function createIndexes(){
    await receiveOrderModel.createIndexes( {'activeStatus': 1}, {'receiveOrderId': 1 })
}
// createIndexes(); 

module.exports = receiveOrderModel