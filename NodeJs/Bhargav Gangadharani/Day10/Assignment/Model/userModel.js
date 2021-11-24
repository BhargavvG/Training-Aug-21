const mongoose = require('mongoose');
const database = 'mongodb://localhost/Task';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MonoDB Connected...");
});

const userSchema = new mongoose.Schema({
        username: String,
        password : String,
        usertype : String,
        role : String
  });
  
  const UserModel = mongoose.model("credentials", userSchema);
  
  module.exports = UserModel;