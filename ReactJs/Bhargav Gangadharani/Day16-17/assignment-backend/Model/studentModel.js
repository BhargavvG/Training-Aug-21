const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  });

// model
const StudentModel = mongoose.model(
  "students",
  new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      Enum: ["male", "female"],
    },
    image: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    collegeAddress: {
      type: String,
      required: true,
      trim: true,
    },
    collegeCountry: {
      type: String,
      required: true,
      trim: true,
    },
    collegeLogo: {
      type: String,
      required: true,
    },
    isAvail: {
      type: Boolean,
      default: true,
    },
  })
);

module.exports = StudentModel;
