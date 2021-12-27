const express = require("express");
const router = express.Router();
const SubCategoryDomain = require("../Domain/SubCategoryDomain");
const SubCategory = new SubCategoryDomain();
const authlogin = require("../Authentication/loginVerification");
const authadmin = require("../Authentication/adminaccess");

router
  .get("/getall", SubCategory.getAllSubCategories)
  .get("/get/:subCategoryId", SubCategory.getSubCategoryById)
  .use(authlogin)
  .use(authadmin)
  .post("/add", SubCategory.addSubCategory)
  .put("/edit/:subCategoryId", SubCategory.updateSubCategory)
  .delete("/remove/:subCategoryId", SubCategory.removeSubCategory)
  .get("/deleted", SubCategory.getDeletedSubCategories)
  .put("/restore/:subCategoryId", SubCategory.restoreSubCategory);

module.exports = router;
