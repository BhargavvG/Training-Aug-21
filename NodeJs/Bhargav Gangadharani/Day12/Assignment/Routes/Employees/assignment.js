const express = require('express');
const assignRouter = express.Router();
const data = require('../../Data/emps.json');
const authemployee = require('../../Authentication/empaccess');
const authadmin = require('../../Authentication/adminaccess');

assignRouter
// To get all assignments for an employee.
.get('/', [authemployee], (req , res , next)=>{
    let employeeid = req.originalUrl.split('/')[2]
    let emp = data.find(e => e.EmpId === parseInt(employeeid))
    if(!emp) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    if(!emp.Assignments){
        res.sendStatus(404).send(`No Assignments for current employee, EmployeeId: ${employeeid}`);
    }
    res.status(200).send(emp.Assignments);

    next();
})

// To get particular assignment for an employee.
.get('/:aid', [authemployee], (req , res , next)=>{
    let employeeid = req.originalUrl.split('/')[2]
    let emp = data.find(e => e.EmpId === parseInt(employeeid))
    if(!emp) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    let assignment = emp.Assignments.find(e => e.AssignmentId === parseInt(req.params.aid))
    if(!assignment){
        res.status(404).send(`No such Assignment for current employee, EmployeeId: ${employeeid}, AssignmentId: ${req.params.aid}`);
        return;
    }
    res.status(200).send(assignment);

    next();
})

// To post an assignment for an employee
.post('/', [express.json()], [authadmin],(req, res, next) => {
    let employeeid = req.originalUrl.split('/')[2]
    let emp = data.find(e => e.EmpId === parseInt(employeeid))
    if(!emp) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    emp.Assignments.push(req.body)
    res.send(req.body)
    next();
})

// Update an assignment of an employee
.put('/:aid', [express.json()], [authadmin],(req, res, next) => {
    console.log(req.params.aid)
    let employeeid = req.originalUrl.split('/')[2]
    let emp = data.find(e => e.EmpId === parseInt(employeeid))
    if(!emp) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    let assignment = emp.Assignments.find(e => e.AssignmentId === parseInt(req.params.aid))
    if(!assignment){
        res.status(404).send(`No such Assignment for current employee, EmployeeId: ${employeeid}, AssignmentId: ${req.params.aid}`);
        return;
    }
    assignment.AssignmentName = req.body.AssignmentName
    assignment.ActionCode = req.body.ActionCode
    assignment.ActionReasonCode = req.body.ActionReasonCode
    assignment.ActualTerminationDate = req.body.ActualTerminationDate
    assignment.AssignmentCategory = req.body.AssignmentCategory
    res.send(assignment)
    next();
});


module.exports = assignRouter ;