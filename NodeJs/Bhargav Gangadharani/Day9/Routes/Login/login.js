const express = require('express');
const jwt = require('jsonwebtoken');
global.config = require('../../config/config');
const router = express.Router();
const credentials = require('../../Data/credentials.json');

router.get('/' ,(req , res , next)=>{
    res.send('login Router is working fine.');
    next();
});


router.post('/' ,[express.json()] ,(req , res , next)=>{
 
        let user = credentials.find(c => c.username === req.body.username && c.password === req.body.password)
        if(!user){
            res.status(401).json({
                message:"Login Failed"
            });
        }
        else{
            let token = jwt.sign(user , global.config.secretKey , {
                        algorithm:global.config.algorithm,
                        expiresIn:'5m'
                    });
                    res.status(200).json({
                        message:'login successful',
                        jwtoken: token
                    });
        }

    next();
});


module.exports = router;