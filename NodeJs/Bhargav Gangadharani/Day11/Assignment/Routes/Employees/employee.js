const express = require('express');
const router = express.Router();
const authemployee = require('../../Authentication/empaccess');
const authadmin = require('../../Authentication/adminaccess');
const EmployeeDomain = require('../../Domain/employeeDomain');
var employee = new EmployeeDomain();

// Employee router
router
    .get('/', [authemployee], employee.getAllEmployees)
    .get('/:id', [authemployee], employee.getEmployeeById)
    .post('/',[express.json()], [authadmin], employee.addEmployee)
    .put('/:id',[express.json()], [authadmin], employee.updateEmployee)
    .delete('/:id', [authadmin], employee.deleteEmployee)
    .get('/:id/assignment',  [authemployee], employee.getAllAssignments)
    .get('/:id/assignment/:aid', [authemployee], employee.getAssignmentById)
    .post('/:id/assignment',[express.json()], [authadmin], employee.addAssignment) 
    .put('/:id/assignment/:aid',[express.json()], [authadmin], employee.updateAssignment)
    .delete('/:id/assignment/:aid', [authadmin], employee.deleteAssignment);


module.exports = router ;