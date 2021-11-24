const express = require('express');
const router = express.Router();
const authstudent = require('../../Authentication/studentaccess');
const authadmin = require('../../Authentication/adminaccess');  
const StudentDomain = require('../../Domain/studentDomain');
var student = new StudentDomain();

// Student Router
router
    .get('/', [authstudent], student.getAllStudents)
    .post('/', [express.json()], [authadmin], student.addStudent)
    .get('/:id', [authstudent], student.getStudentById)
    .get('/:id/fees', [authstudent], student.getFees)
    .get('/:id/result', [authstudent], student.getResult)
    .put('/:id/result',  [express.json()], [authadmin], student.updateResult)
    .delete('/:id', [authadmin], student.deleteStudent)
    


module.exports = router;