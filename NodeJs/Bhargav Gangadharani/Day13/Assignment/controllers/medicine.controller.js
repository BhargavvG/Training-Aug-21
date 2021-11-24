var express = require("express");
const MedicineDomain = require("../domains/medicine.domain");
var router = express.Router();
const medicineDomain = new MedicineDomain();


class MedicineController {
  //To get all medicines
  static async get(req, res) {
    medicineDomain.getAllMedicine(req, res);
  }
  //to get medicine
  static async getMedicine(req, res) {
    medicineDomain.getMedicine(req, res);
  }
  //To insert medicine
  static async insertMedicine(req, res) {
    medicineDomain.insertMedicine(req, res);
    let data = req.body;
    console.log(data)
    console.log(medicineDomain)

  }
  //To delete medicine
  static async deleteMedicine(req, res) {
    medicineDomain.deleteMedicine(req, res);
  }
}

//To get all medicines
router.get("/", MedicineController.get);
//To get a single medicine by id
router.get("/:MedId", MedicineController.getMedicine);
//To delete a medicine
router.delete("/:MedId", MedicineController.deleteMedicine);
//To insert medicine
router.post("/", MedicineController.insertMedicine);

module.exports = router;
