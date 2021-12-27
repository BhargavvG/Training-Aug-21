const express = require('express');
const router = express.Router();
const ElementDomain = require('../Domain/indexDomain')
const element = new ElementDomain();
const authlogin = require('../Authentication/loginVerification');
const authadmin = require('../Authentication/adminaccess');

router

.get('/getall', element.getAllElements)
.get('/get/:elementId', element.getElementById)
.get('/filter/searchBy', element.getElementsBySearch)
.use(authlogin)
.use(authadmin)
.post('/add',element.addElement)
.put('/edit/:elementId', element.updateElement)
.delete('/remove/:elementId', element.removeElement)
.get('/deleted', element.getDeletedElements)
.put('/restore/:elementId', element.restoreElement)
.get('/optimization', element.optimization)

module.exports = router

