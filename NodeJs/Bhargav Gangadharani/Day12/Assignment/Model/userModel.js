const mongoose = require('mongoose');
const database = 'mongodb://localhost/Task';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MonoDB Connected...");
});

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            minlength : 3,
            maxlength : 255,
            trim : true,
            },
        password :  {
            type: String,
            required: true,
            minlength : 3,
            maxlength : 255,
            trim : true,
            },
        usertype :  {
            type: String,
            required: true,
            minlength : 3,
            maxlength : 255,
            trim : true,
            },
        role :  {
            type: String,
            required: true,
            minlength : 3,
            maxlength : 255,
            trim : true,
            }
  });
  
  const UserModel = mongoose.model("credentials", userSchema);
  
  module.exports = UserModel;