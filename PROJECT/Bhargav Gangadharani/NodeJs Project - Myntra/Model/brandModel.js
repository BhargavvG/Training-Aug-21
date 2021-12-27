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
    await BrandModel.createIndexes( {'activeStatus': 1}, {'brandId': 1 })
}
// createIndexes(); 

module.exports = BrandModel