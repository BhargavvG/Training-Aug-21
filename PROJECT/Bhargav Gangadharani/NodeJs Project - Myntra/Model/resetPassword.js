const mongoose = require("mongoose");
const database = 'mongodb://localhost/Myntra';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // console.log("MongoDB Connected...");
});

const resetPasswordModel = mongoose.model(
    "reset",
    new mongoose.Schema({
        otp : {
            type: Number,
            required: true,
            trim: true   
        },
        email: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        },
        token : {
            type: String,
            required: true,
            trim: true
        },
        activeStatus: {
            type: Boolean,
            default: true,
        }
    }
    ));

module.exports = resetPasswordModel;