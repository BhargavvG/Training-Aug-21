const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use([express.json()],(req , res , next)=>{
    let token = req.headers['access-token'];
    console.log(token);


        jwt.verify(token, global.config.secretKey,
            { algorithm: global.config.algorithm},
            (err, decoded) =>{
                if (err) {
                    return res.status(401).json({
                        Error: 'Unauthorized Access',
                        Error_Message :`${err.message}`
                    });
                    }
            req.decoded = decoded;
            if(decoded.userid == req.originalUrl.split('/')[2]){
                next();
            }
            else{
                res.send('Permission Denied ! Please enter your id')
            }
            }
        ); 
        
});


module.exports = router;