const UserModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');
global.config = require('../config/config');


class UserDomain {

     // Login user
     async loginUser(req, res){
        const username = req.body.username; 
        let userdata = await UserModel.findOne({username: username}, {_id : 0, __v : 0 });
        let user ={
            "username": userdata.username,
            "password": userdata.password,
            "usertype": userdata.usertype,
            "role": userdata.role
        }

        console.log(user);
        if(user.length == 0){
            res.status(404).send("Login Failed!! User not found");
        }
        else {
            let token = jwt.sign(user , global.config.secretKey , {
                algorithm:global.config.algorithm,
                expiresIn:'5m'
            });
            res.status(200).json({
                message:'login successful',
                jwtoken: token
            });
        }
    }

    //Get all Users
    async getAllUsers(req, res) {
        let users = await UserModel.find();
        res.json(users);
    }

    // Get profile
    async getUserProfile(req, res) {
        const userName = req.decoded.username;

        let result = await UserModel.find({ username : userName});

        if(result.length == 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(result);
        }
    }

    //Add User
    async addUser(req, res) {
        let user = req.body;
        let newUser = new UserModel(user);
        
        try {
            let result = await newUser.save();
            res.send("User added successfully");
        }
        catch (err) {
            res.status(404).send(err.message);
        }
    }
}

module.exports = UserDomain;