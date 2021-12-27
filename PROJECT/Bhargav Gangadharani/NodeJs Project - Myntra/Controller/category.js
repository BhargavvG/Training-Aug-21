const express = require('express');
const router = express.Router();
const CategoryDomain = require('../Domain/categoryDomain')
const category = new CategoryDomain();
const authlogin = require('../Authentication/loginVerification');
const authadmin = require('../Authentication/adminaccess');

router
.get('/getall', category.getAllCategories)
.get('/get/:categoryId', category.getCategoryById)
.use(authlogin)
.use(authadmin)
.post('/add',category.addCategory)
.put('/edit/:categoryId', category.updateCategory)
.delete('/remove/:categoryId', category.removeCategory)
.get('/deleted', category.getDeletedCategories)
.put('/restore/:categoryId', category.restoreCategory)

module.exports = router

