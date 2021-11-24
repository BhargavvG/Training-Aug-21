const express = require('express');
const router = express.Router();
global.config = require('../../config/config');
const data = require('../../Data/students.json');
const authstudent = require('../../Authentication/studentaccess');
const authadmin = require('../../Authentication/adminaccess');

router.get('/' ,[authstudent],(req , res , next)=>{
    res.send(' Students Page !');
    next();
});

// get details of a student category-wise like fees/result.
router.get('/:id/:category', [authstudent] ,(req , res, next)=>{
        let student = data.find(s => s.ID == req.params.id );
        if(!student) {
            res.status(404).send('Id entered is not there in data');
            return;
        }
        let category = req.params.category;
        
        if(category == 'fees'){
            res.send(student.Fees)
        }
        else if(category == 'result'){
            res.send(student.Result);
        }
       next();
})

// update result of any student.
router.put("/:id/result",[express.json()], [authadmin],(req, res, next) => {
      let student = data.find((s) => s.ID == req.params.id);
      if (!student) {
        res.status(404).send("Id entered is not there in data");
        return;
      }
      if (req.body.Eng) student.Result.Eng = req.body.Eng;
      if (req.body.Hindi) student.Result.Hindi = req.body.Hindi;
      if (req.body.Math) student.Result.Math = req.body.Math;
      res.send(student);
  next();
});

module.exports = router;