const CategoryModel = require("../Model/categoryModel");

class CategoryDomain {
  async getAllCategories(req, res) {
    try {
      const categories = await CategoryModel.find({ activeStatus: true });
      res.send(categories);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await CategoryModel.find({
        activeStatus: true,
        categoryId: req.params.categoryId,
      });
      res.send(category);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async addCategory(req, res) {
    try {
      let categorydata = req.body;
      const category = new CategoryModel(categorydata);

      await category.save();

      res.send("Category Added");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateCategory(req, res) {
    let categoryId = req.params.categoryId;
    try {
      const result = await CategoryModel.updateOne(
        { categoryId: categoryId },
        {
          $set: {
            categoryName: req.body.categoryName,
            details: req.body.details,
            sizeOptions: req.body.sizeOptions,
          },
        }
      );
      if (result.modifiedCount == 0) {
        res.send("Category not found");
      } else {
        res.send("Category updated successfully");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async removeCategory(req, res) {
    let categoryId = req.params.categoryId;

    try {
      const category = await CategoryModel.updateOne(
        { categoryId: categoryId },
        { $set: { activeStatus: false } }
      );
      res.send("Category removed successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getDeletedCategories(req, res) {
    try {
      const categories = await CategoryModel.find({ activeStatus: false });
      res.send(categories);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async restoreCategory(req, res) {
    let categoryId = req.params.categoryId;

    try {
      const category = await CategoryModel.updateOne(
        { categoryId: categoryId, activeStatus: false },
        { $set: { activeStatus: true } }
      );
      res.send("Category restored successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = CategoryDomain;
