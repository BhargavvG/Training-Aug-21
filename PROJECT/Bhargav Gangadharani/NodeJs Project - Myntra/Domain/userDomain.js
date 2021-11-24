const { UserModel, validateUser } = require("../Model/userModel");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
global.config = require('../config/config');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const cred = require('../Config/credformail.json');
const resetPasswordModel = require('../Model/resetPassword');
var otpGenerator = require("otp-generator");

class UserDomain {
    // Login user
    async loginUser(req, res){
        const userName = req.body.userName; 
        const password = req.body.password;

        try{
            let userdata = await UserModel.findOne({userName: userName});
            const validPassword = await bcrypt.compare(
              password,
              userdata.password
            );
            if(validPassword){
            let user ={
                "userName": userdata.userName,
                "email": userdata.email,
                "contactNumber": userdata.contactNumber,
                "dob": userdata.dob,
                "gender": userdata.gender,
                "password": userdata.password,
                "role": userdata.role,
                "address.addressLine1": userdata.address.addressLine1,
                "address.addressLine2": userdata.address.addressLine2,
                "address.pincode": userdata.address.pincode,
                "address.city": userdata.address.city,
                "address.state": userdata.address.state,
                "address.country": userdata.address.country,
                "activeStatus": userdata.activeStatus
            }
            if(user.length == 0){
                res.status(404).send("Login Failed!! User not found");
            }
            else {
                let token = jwt.sign(user , global.config.secretKey , {
                    algorithm:global.config.algorithm,
                    expiresIn:'1d' 
                });
                res.status(200).json({
                    message:'login successful',
                    jwtoken: token
                });
            } 
        }
        else
        {
            res.status(401).send('Login Failed! Please enter correct password')
        }
        }
        catch(err){ 
            res.send(err.message);
            return;
        }
    }


  // add user
  async addUser(req, res) {
    const { error } = validateUser(req.body);

    if(error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      let userdata = req.body;
      userdata.password = hashedPassword;
      const user = new UserModel(userdata);

      await user.save();
    
      res.send('User Added');

    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find();
      res.send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
  }

  // get user by Username
  async getUserProfile(req, res) {
    const userName = req.decoded.userName;

    const user = await UserModel.findOne({userName: userName});

    if(!user) {
      return res.status(404).send("User not found");
    }
    else{
      res.send(user)
    }

  }

  // update user
  async updateUser(req, res) {
    const userName = req.decoded.userName;

    var { error } = validateUser(req.body);

    if(error) {
      return res.send(error.details[0].message);
    }

    try{
    const result = await UserModel.updateOne(
        {userName: userName}, 
        {$set : {
            "userName": req.body.userName,
            "email": req.body.email,
            "contactNumber": req.body.contactNumber,
            "dob": req.body.dob,
            "gender": req.body.gender,
            "role": req.body.role,
            "address.addressLine1": req.body.address.addressLine1,
            "address.addressLine2": req.body.address.addressLine2,
            "address.pincode": req.body.address.pincode,
            "address.city": req.body.address.city,
            "address.state": req.body.address.state,
            "address.country": req.body.address.country
            }
        });
        if(result.modifiedCount == 0){
          res.send('User not found');
        }
        else{
          res.send('User updated successfully');
        }
    }
    catch (err) {
      res.status(500).send(err.message);
    }
  }

  // delete user
  async deleteUser(req, res) {
    const userName = req.params.userName;

    const result = await UserModel.updateOne(
      { userName : userName },
      {$set: {activeStatus: false}});

    if (result.length == 0) {
      return res.status(404).send("User not found");
    } else {
      return res.send("User deleted successfully");
    }
  }

  // get user by email id
  async getuserByEmail(req, res) {
    const email =  req.params.email;

    const validateSchema = Joi.object({email:Joi.string()
      .regex(new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
      .required()})
    var { error } = validateSchema.validate({email: email});

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }
     res.send(user)
  }

  // update password
  async updatePassword(req, res) {
    const userName = req.params.userName;

    const passwords = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };

    const validatePasswords = {
      oldPassword: Joi.string()
        .regex(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
          )
        )
        .required(),
      newPassword: Joi.string()
        .regex(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
          )
        )
        .required(),
    };

    var { error } = validatePasswords.validate(passwords);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await UserModel.findOne({userName: userName});

    if (!user) {
      return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(
      passwords.oldPassword,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid old password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwords.newPassword, salt);

    user.password = hashedPassword;

    let result = await user.save();
    res.send('Password updated successfully')

  }

  // forgot password
  async forgotPassword(req, res) {
    const otp =otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets : false});
      
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: cred.user,
        pass: cred.password,
      },
    });

    var mailDetails = {
      from: cred.user,
      to: req.body.email,
      subject: "OTP for Resetting Password",
      text: `Greetings!...... OTP for Resetting Password of your Myntra Acc is ${otp}, Note : This is just a testing email !`,
    };

    transporter.sendMail(mailDetails, (err, info) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        try {
            async function set() {
              let resetdata = {
                otp: otp,
                email: req.body.email,
              };

              let token = jwt.sign(resetdata, global.config.secretKey, {
                algorithm: global.config.algorithm,
                expiresIn: "5m",
              });

              const resetter = resetPasswordModel({
                otp: otp,
                email : req.body.email,
                token: token,
              });

              await resetter.save();

              res.status(200).json({
                message:
                  "OTP sent to given email address, Kindly enter otp to reset password",
              });
              console.log(`Email Sent ${info.response}`);
            }
        set()
        } catch (err) {
          res.send(err.message);
        }
      }
    });
  }


  async resetPassword(req, res) {
    const email = req.params.email;
    const otp = req.params.otp;
    try{
       let resetter = await resetPasswordModel.findOne({otp: otp, email: email, activeStatus: true});
       if(!resetter){
           res.send('Please Enter Valid Otp');
           return;
       }
       let token = resetter.token;
       jwt.verify(token, global.config.secretKey,
        { algorithm: global.config.algorithm},
        (err, decoded) =>{
            if (err) {
                return res.status(401).send(err.message)
                }
            async function setpass() {
              const newPassword = req.body.newPassword;

              const validateSchema = Joi.object({
                password: Joi.string()
                  .regex(
                    new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
                    )
                  )
                  .required(),
              });

              var { error } = validateSchema.validate({password : newPassword});

              if (error) {
                return res.status(400).send(error.details[0].message);
              }

              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(newPassword, salt);

              let result = await UserModel.updateOne(
                { email: decoded.email },
                { $set: { password: hashedPassword } }
              );
              res.send("Password updated successfully");
              result = await resetPasswordModel.updateOne({otp : otp}, {$set: { activeStatus : false}})
            }
            setpass();
        }
    ); 
    }
    catch(err){res.send(err.message);}

  }
}

module.exports = UserDomain;
