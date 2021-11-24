const mongoose = require('mongoose');
const database = 'mongodb://localhost/Task';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MonoDB Connected...");
});

const studentSchema = new mongoose.Schema({
    ID: { 
      type : Number, 
      required : true},
    Name: {
      type: String,
      required: true,
      minlength : 3,
      maxlength : 255
      },
    Address:  {
      type: String,
      minlength : 3,
      maxlength : 500
      },
    Fees: [
      {
        Amount: Number,
        PaymentDate: {
          type : Date , 
          default: Date.now
        },
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