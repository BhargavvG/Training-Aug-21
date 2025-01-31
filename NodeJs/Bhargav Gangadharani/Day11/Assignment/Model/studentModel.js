const mongoose = require('mongoose');
const database = 'mongodb://localhost/Task';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MonoDB Connected...");
});

const studentSchema = new mongoose.Schema({
    ID: Number,
    Name: String,
    Address: String,
    Fees: [
      {
        Amount: Number,
        PaymentDate: Date,
        Status: Boolean,
      },
    ],
    Result: [
      {
        Hindi: Number,
        Eng: Number,
        Math: Number,
        Total: Number,
        Grade: String,
      },
    ],
  });
  
  const StudentModel = mongoose.model("students", studentSchema);
  
  module.exports = StudentModel;