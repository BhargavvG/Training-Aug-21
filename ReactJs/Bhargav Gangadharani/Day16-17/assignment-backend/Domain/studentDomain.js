const StudentModel = require("../Model/StudentModel");

class StudentDomain {
  async getAllStudents(req, res) {
    try {
      const students = await StudentModel.find({ isAvail: true });
      res.send(students);
      res.end();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getStudentById(req, res) {
    try {
      const student = await StudentModel.find({
        isAvail: true,
        id: req.params.id,
      });
      res.send(student);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addStudent(req, res) {
    try {
      let studentdata = req.body;
      const student = new StudentModel(studentdata);

      await student.save();

      res.status(200).send("Student Added");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateStudent(req, res) {
    let id = req.params.id;
    try {
      const result = await StudentModel.updateOne(
        { id: id },
        {
          $set: {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            gender: req.body.gender,
            image: req.body.image,
            collegeName: req.body.collegeName,
            collegeAddress: req.body.collegeAddress,
            collegeCountry: req.body.collegeCountry,
            collegeLogo: req.body.collegeLogo,
            isAvail: req.body.isAvail,
          },
        }
      );
      if (result.modifiedCount == 0) {
        res.send("Student not found");
      } else {
        res.status(200).send("Student updated successfully");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteStudent(req, res) {
    let id = req.params.id;

    try {
      const student = await StudentModel.updateOne(
        { id: id },
        { $set: { isAvail: false } }
      );
      res.send("student removed successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  //   async getDeletedStudents(req, res) {
  //     try {
  //       const students = await StudentModel.find({ isAvail: false });
  //       res.send(students);
  //     } catch (err) {
  //       res.status(500).send(err.message);
  //     }
  //   }

  //   async restoreStudent(req, res) {
  //     let id = req.params.id;

  //     try {
  //       const student = await StudentModel.updateOne(
  //         { id: id, isAvail: false },
  //         { $set: { isAvail: true } }
  //       );
  //       res.send("student restored successfully");
  //     } catch (err) {
  //       res.status(500).send(err.message);
  //     }
  //   }
}

module.exports = StudentDomain;
