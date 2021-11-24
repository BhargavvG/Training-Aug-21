const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
global.config = require('../config/config');
const router = express.Router();

router.get('/' ,(req , res , next)=>{
    res.send('user Router is working fine.');
    next();
});


router.post('/login' ,[express.json()] ,(req , res , next)=>{
 
        let userdata = {
        username: req.body.username,
        password: req.body.password,
        userid: req.body.userid
        };

        if(userdata.username == "admin" && userdata.password == "admin"){
            let token = jwt.sign(userdata , global.config.secretKey , {
                algorithm:global.config.algorithm,
                expiresIn:'5m'
            });
            res.status(200).json({
                message:'login successful',
                jwtoken: token
            });
        }
        else{
            res.status(401).json({
                message:"Login Failed"
            });
        }
    

    

    next();
});


module.exports = router;