var express = require("express");
const AssistantDomain = require("../domains/assistant.domain");
var router = express.Router();
const assistantDomain = new AssistantDomain();

class AssistantController {
  //To get all assistant
  static async get(req, res) {
    assistantDomain.getAllAssistant(req, res);
  }
  //to get assistant
  static async getAssistant(req, res) {
    assistantDomain.getAssistant(req, res);
  }
  //To insert assistant
  static async insertAssistant(req, res) {
    assistantDomain.insertAssistant(req, res);
  }
  //To delete assistant
  static async deleteAssistant(req, res) {
    assistantDomain.deleteAssistant(req, res);
  }
}

//To get all assistant
router.get("/", AssistantController.get);
//To get a single assistant by id
router.get("/:AstId", AssistantController.getAssistant);
//To delete a assistant
router.delete("/:AstId", AssistantController.deleteAssistant);
//To insert assistant
router.post("/", AssistantController.insertAssistant);

module.exports = router;
