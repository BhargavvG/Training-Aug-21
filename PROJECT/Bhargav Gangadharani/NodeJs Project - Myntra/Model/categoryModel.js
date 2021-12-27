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

const CategoryModel = mongoose.model(
    "categories",
    new mongoose.Schema({
        categoryName:{
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        details: Array,
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'categories', field: 'categoryId', startAt:  10000})
);


async function createIndexes(){
    await CategoryModel.createIndexes( {'activeStatus': 1}, {'categoryId': 1 })
}
// createIndexes(); 

module.exports= CategoryModel