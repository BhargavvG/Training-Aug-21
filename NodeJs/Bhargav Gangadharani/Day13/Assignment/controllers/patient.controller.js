var express = require("express");
const PatientDomain = require("../domains/patient.domain");
var router = express.Router();
const patientDomain = new PatientDomain();

class PatientController {
  //To get all patients
  static async get(req, res) {
    patientDomain.getAllPatients(req, res);
  }
  //to get patient
  static async getPatient(req, res) {
    patientDomain.getPatient(req, res);
  }
  //To insert patient
  static async insertPatient(req, res) {
    patientDomain.insertPatient(req, res);
  }
  //To update patient
  static async updatePatient(req, res) {
    patientDomain.updatePatient(req, res);
  }
  //To delete patient
  static async deletePatient(req, res) {
    patientDomain.deletePatient(req, res);
  }
  //To get patient medicine
  static async getPatientMedicine(req, res) {
    patientDomain.getPatientMedicine(req, res);
  }
}

//To get all patients
router.get("/", PatientController.get);
//To get an single patient by id
router.get("/:PatId", PatientController.getPatient);
//To delete a patient
router.delete("/:PatId", PatientController.deletePatient);

//To insert patient
router.post("/", PatientController.insertPatient);
//To Update Data Of A patient
router.put("/", PatientController.updatePatient);

//To get medcine of patient
router.get("/:PatId/medicine", PatientController.getPatientMedicine);

module.exports = router;
