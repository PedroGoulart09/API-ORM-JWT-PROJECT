const express = require('express');
const controllerCategories = require('../controller/categories.controller');
const tokenValidations = require('../middlewares/authToken');

const categories = express.Router();

categories.get('/categories', tokenValidations, controllerCategories.getAllCategories);
categories.post('/categories', tokenValidations, controllerCategories.createCategories);

module.exports = categories;