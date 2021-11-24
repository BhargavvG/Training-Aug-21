const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
 
  doctors: [
    {
      doctor: {
        type: Number,
        ref: "doctor",
      }
    },
  ],
  medicines: [
    {
      medicine: {
        type: Number,
        ref: "medicine",
      },
      doses: [{ type: String, enum: ["morning", "afternoon", "night"] }],
    },
  ],
});

const PatientModel = mongoose.model("patient", patientSchema);

module.exports = PatientModel;
