const express = require('express');
const router = express.Router();
const assignRouter = require('./assignment');
const data = require('../../Data/emps.json');
const authemployee = require('../../Authentication/empaccess');
const authadmin = require('../../Authentication/adminaccess');

// emps router
router
.get('/', [authemployee],(req , res , next)=>{
    res.send(data);
    next();
})

// get an employee's detail
.get('/:id',[authemployee], (req , res , next)=>{
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