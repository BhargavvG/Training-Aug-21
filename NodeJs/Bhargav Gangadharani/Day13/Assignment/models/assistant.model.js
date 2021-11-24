const mongoose = require("mongoose");

const assistantSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
   patient: [
    {
      patientid: {
        type: Number,
        ref: "assistant",
      }
    },
  ],
  isdeleted:{ type: Boolean, default:0 }
});

const AssistantModel = mongoose.model("assistant", assistantSchema);

module.exports = AssistantModel;
