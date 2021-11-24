const express = require('express');
const app = express();
const Joi = require('Joi');
app.use(express.json());
const fs = require('fs');

fs.readFile('students.json', 'utf8', function(err, data) {
    students = JSON.parse(data);
});

// 1. Create a RESTFUL API which will return a Studentlist.
// http://localhost:3000/students

app.get('/students', (req, res) => {
    res.send(students);
});


// 2. Create RESTFUL API which will return a Particular Student Record
// http://localhost:3000/students/1

app.get('/students/:id', (req, res) => {
    console.log(students)
    let student = students.find(c => c.ID === parseInt(req.params.id))
    if(!student) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    res.status(200).send(student);
});


// 3. Create a RESTFUL API which return a particular student FEES Record. Fees field are 
// http://localhost:3000/students/1/fees

app.get('/students/:id/fees', (req, res) => {
    console.log(students)
    let student = students.find(c => c.ID === parseInt(req.params.id))
    if(!student) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    res.status(200).send(student.Fees);
});


// 4. Create a RESTFUL API which will return a particular student Exam Result. Result Fields are 
// http://localhost:/3000/students/1/result

app.get('/students/:id/fees', (req, res) => {
    console.log(students)
    let student = students.find(c => c.ID === parseInt(req.params.id))
    if(!student) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    res.status(200).send(student.Result);
});


// 5. Create a RESTFUL API which will update a result of result of student id 1. Update the marks for English Subject.
app.put('/students/:id/result', (req, res) => {
    let student = students.find(c => c.ID === parseInt(req.params.id))
    if(!student) {
        res.status(404).send('Id entered is not there in data');
        return;
    }

    if(req.body.Eng) student.Result.Eng =  req.body.Eng;
    if(req.body.Hindi) student.Result.Hindi =  req.body.Hindi;
    if(req.body.Math ) student.Result.Math =  req.body.Math;
    res.send(student)
});

// another way
app.put('/students/:id/result/:sub', (req, res) => {
    let student = students.find(c => c.ID === parseInt(req.params.id))
    if(!student) {
        res.status(404).send('Id entered is not there in data');
        return;
    }

    student.Result[req.params.sub] =  req.body.Marks;
    res.send(student)
});




app.listen(3000);