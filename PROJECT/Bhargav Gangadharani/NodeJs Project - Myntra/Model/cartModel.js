const mongoose = require("mongoose");
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
const CartModel = mongoose.model(
    "carts",
    new mongoose.Schema({
        userName:{
            type : String,
            required : true,
            unique : true,
            ref : 'users',
        },
        items:[
            {
                productId:{
                    type: Number,
                    ref: 'products',
                },
                quantity:{
                    type: Number,
                    required : true,
                }
            }
        ],
        totalPrice:{
            type: Number,
            required:true,
        }
    }).plugin(autoIncrement.plugin, { model: 'carts', field: 'cartId', startAt: 111000})
);

async function createIndexes(){
    await CartModel.createIndexes( {'activeStatus': 1},{'userName' : 1}, {'cartId': 1 })
}
// createIndexes(); 

module.exports = CartModel