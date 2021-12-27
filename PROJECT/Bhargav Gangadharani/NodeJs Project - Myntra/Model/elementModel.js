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
const ElementModel = mongoose.model(
    "elements",
    new mongoose.Schema({
        offer:{
            type : Number,
            ref: 'offers',
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
        elementType:{
            type : String,
            required: true,
            enum: ['carousel', 'banner', 'category']
        },
        titleImg:{
            type: String,
        },
        content: [
            {
            type: new mongoose.Schema({
                img : String,
                brand :{
                    type: Number,
                    ref:'brands'
                }, 
                category : String,
                details : String,
            }),
            }
        ],
        activeStatus:{
            type: Boolean,
            default: true,
        }
    }).plugin(autoIncrement.plugin, { model: 'elements', field: 'elementId', startAt:  100})
);


async function createIndexes(){
    await ElementModel.createIndexes( [{'activeStatus': 1}, {'elementId': 1 }, {'endDate' : 1}])
}
// createIndexes();

module.exports = ElementModel;