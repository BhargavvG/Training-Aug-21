const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  department: {
    type: Number,
    ref: "department",
    required: true,
  },
  patient: [
    {
      patientid: {
        type: Number,
        ref: "patient",
      }
    },
  ],
  isdeleted:{ type: Boolean, default:0 }

});



// departmentsid
const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = DoctorModel;
