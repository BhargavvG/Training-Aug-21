const express = require("express");
const router = express.Router();
const StudentDomain = require("../Domain/StudentDomain");
let student = new StudentDomain();

router
  .get("/", student.getAllStudents)
  .get("/:id", student.getStudentById)
  .post("/", student.addStudent)
  .put("/:id", student.updateStudent)
  .delete("/:id", student.deleteStudent);

module.exports = router;
