const ElementModel = require("../Model/elementModel");

class ElementDomain {
  async getAllElements(req, res) {
    try {
      let data = {
        activeStatus: true,
        endDate: { $gt: new Date() },
        startDate: { $lt: new Date() },
      };
      const elements = await ElementModel.find(data).sort({ precedence: 1 });
      res.send(elements);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getElementById(req, res) {
    try {
      let data = {
        elementId: parseInt(req.params.elementId),
      };
      const element = await ElementModel.findOne(data);
      res.send(element);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getElementsBySearch(req, res) {
    try {
      let data = {
        activeStatus: true,
        endDate: { $gt: new Date() },
        startDate: { $lt: new Date() },
      };
      if (req.query.elementId) data.elementId = parseInt(req.query.elementId);
      if (req.query.elementType) data.elementType = req.query.elementType;

      const elements = await ElementModel.find(data);
      res.send(elements);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addElement(req, res) {
    try {
      let elementdata = req.body;
      const element = new ElementModel(elementdata);

      await element.save();

      res.send("Element Added");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async removeElement(req, res) {
    let elementId = req.params.elementId;

    try {
      const element = await ElementModel.updateOne(
        { elementId: elementId },
        { $set: { activeStatus: false } }
      );
      res.send("Element removed successfully");
    } catch (err) {
      // console.log(err);

      res.status(500).send(err.message);
    }
  }

  async getDeletedElements(req, res) {
    try {
      const elements = await ElementModel.find({
        activeStatus: false,
      });
      res.send(elements);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async restoreElement(req, res) {
    let elementId = req.params.elementId;

    try {
      const element = await ElementModel.updateOne(
        { elementId: elementId, activeStatus: false },
        { $set: { activeStatus: true } }
      );
      res.send("Element restored successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateElement(req, res) {
    let elementId = req.params.elementId;
    try {
      const result = await ElementModel.updateOne(
        { elementId: elementId },
        {
          $set: {
            elementName: req.body.elementName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            elementType: req.body.elementType,
            titleImg: req.body.titleImg,
            content: req.body.content,
          },
        }
      );
      if (result.modifiedCount == 0) {
        res.send("Element not found");
      } else {
        res.send("Element updated successfully");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async optimization(req, res) {
    try {
      const elements = await ElementModel.updateMany(
        { activeStatus: true, endDate: { $lt: Date() } },
        { $set: { activeStatus: false } }
      );
      res.send(
        `Database Optimization Done. Performance increased -- ${elements.modifiedCount} records updated `
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = ElementDomain;
