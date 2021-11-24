const express = require('express');
const router = express.Router();
const assignRouter = require('./assignment');
const data = require('../data/data.js');


// emps router
router
.get('/',(req , res , next)=>{
    
    res.send(data);
    next();
})

.get('/:id',(req , res , next)=>{
    let emp = data.find(e => e.EmpId === parseInt(req.params.id))
    if(!emp) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    res.status(200).send(emp);
    next();
})

// child router
.use('/:id/child/assignments' , assignRouter);


module.exports = router ;