const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  isdeleted:{ type: Boolean, default:0 }

});

const DepartmentModel = mongoose.model("department", departmentSchema);

module.exports = DepartmentModel;
