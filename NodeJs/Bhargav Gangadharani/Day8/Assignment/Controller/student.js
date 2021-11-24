const express = require('express');
const router = express.Router();
global.config = require('../config/config');
const fs = require('fs');
const authenticateToken = require('../Authentication/verification');

router.get('/' ,(req , res , next)=>{
    res.send(' Students Page !');
    next();
});


router.get('/:id/:key' ,[authenticateToken] ,(req , res, next)=>{
    fs.readFile('./Data/students.json' , 'utf8' , (err , data)=>{
        let studentData = JSON.parse(data);
        let student = studentData.find(s => s.ID == req.params.id );
        let category = req.params.key;
        
        if(category == 'fees'){
            res.send(student.Fees)
        }
        else if(category == 'result'){
            res.send(student.Result);
        }
       next();
    })
})

module.exports = router;