const express = require('express');
const router = express.Router();
const UserDomain = (require('../Domain/userDomain'))
let user = new UserDomain();
const authlogin = require('../Authentication/loginVerification');
const authadmin = require('../Authentication/adminaccess');

router
.post('/signup', user.addUser)
.post('/login', user.loginUser)
.put('/resetpassword',  user.forgotPassword)
.put('/resetpassword/:email/:otp', user.resetPassword)
.use(authlogin)
.get('/profile', user.getUserProfile)
.put('/profile/update', user.updateUser )
.put('/profile/updatepassword', user.updatePassword)
.use(authadmin)
.get('/profile/all',  user.getAllUsers)
.get('/profile/:email',  user.getuserByEmail)
.delete('/profile/:userName', user.deleteUser)




module.exports = router;