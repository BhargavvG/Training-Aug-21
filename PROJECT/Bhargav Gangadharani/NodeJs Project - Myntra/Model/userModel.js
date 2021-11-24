const mongoose = require("mongoose");
const Joi = require("joi");
const database = 'mongodb://localhost/Myntra';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected...");
});

// model
const UserModel = mongoose.model(
  "users",
  new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    },
    contactNumber: {
      type: Number,
      required: true,
      min: 0000000001,
      max: 9999999999,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      uppercase: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024,
    },
    role : {
        type : String,
        required: true,
        enum: ['admin', 'user', 'seller']
    },
    address: {
      type: new mongoose.Schema({
        addressLine1: {
          type: String,
          required: true,
        },
        addressLine2: {
          type: String,
        },
        pincode: {
          type: Number,
          required: true,
          match: /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      }),
      required: true,
    },
    activeStatus: {
      type: Boolean,
      default: true,
  }
  })
);

// validating using joi
function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string()
      .regex(new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
      .required(),
    contactNumber: Joi.string().min(10).required(),
    dob: Joi.date().required(),
    gender: Joi.string().required(),
    password: Joi.string()
      .regex(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
        )
      )
      .required(),
    role: Joi.string().required(),
    address: Joi.object()
      .keys({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string(),
        pincode: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
      })
      .required(),
  });

  return schema.validate(user);
}

async function createIndexes(){
    await UserModel.createIndexes({'userName': 1 }, {'role': 1})
}
// createIndexes;

module.exports.UserModel = UserModel;
module.exports.validateUser = validateUser;
