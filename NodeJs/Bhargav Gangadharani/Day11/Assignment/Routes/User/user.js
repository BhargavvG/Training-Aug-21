const express = require('express');
const router = express.Router();
const UserDomain = (require('../../Domain/userDomain'))
let user = new UserDomain();
const authlogin = require('../../Authentication/loginVerification');
const authadmin = require('../../Authentication/adminaccess');

router
.post('/login',[express.json()], user.loginUser)
.post('/signup',[express.json()], user.addUser)
.use(authlogin)
.get('/profile', user.getUserProfile)
.get('/all', [authadmin], user.getAllUsers);


module.exports = router;