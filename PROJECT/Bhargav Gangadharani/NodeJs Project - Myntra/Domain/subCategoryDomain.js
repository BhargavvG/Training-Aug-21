const SubCategoryModel = require("../Model/SubCategoryModel");

class SubCategoryDomain {
  async getAllSubCategories(req, res) {
    try {
      const subCategories = await SubCategoryModel.find({ activeStatus: true });
      res.send(subCategories);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getSubCategoryById(req, res) {
    try {
      const subCategory = await SubCategoryModel.find({
        activeStatus: true,
        subCategoryId: req.params.subCategoryId,
      });
      res.send(subCategory);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addSubCategory(req, res) {
    try {
      let subCategorydata = req.body;
      const subCategory = new SubCategoryModel(subCategorydata);

      await subCategory.save();

      res.send("subCategory Added");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateSubCategory(req, res) {
    let subCategoryId = req.params.subCategoryId;
    try {
      const result = await SubCategoryModel.updateOne(
        { subCategoryId: subCategoryId },
        {
          $set: {
            subCategoryName: req.body.subCategoryName,
          },
        }
      );
      if (result.modifiedCount == 0) {
        res.send("subCategory not found");
      } else {
        res.send("subCategory updated successfully");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async removeSubCategory(req, res) {
    let subCategoryId = req.params.subCategoryId;

    try {
      const subCategory = await SubCategoryModel.updateOne(
        { subCategoryId: subCategoryId },
        { $set: { activeStatus: false } }
      );
      res.send("subCategory removed successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getDeletedSubCategories(req, res) {
    try {
      const subCategories = await SubCategoryModel.find({
        activeStatus: false,
      });
      res.send(subCategories);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async restoreSubCategory(req, res) {
    let subCategoryId = req.params.subCategoryId;

    try {
      const subCategory = await SubCategoryModel.updateOne(
        { subCategoryId: subCategoryId, activeStatus: false },
        { $set: { activeStatus: true } }
      );
      res.send("subCategory restored successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = SubCategoryDomain;
