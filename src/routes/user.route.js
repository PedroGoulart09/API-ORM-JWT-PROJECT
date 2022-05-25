const express = require('express');
const controllerUser = require('../controller/user.controller');
const tokenValidations = require('../middlewares/authToken');

const user = express.Router();

user.get('/user', tokenValidations, controllerUser.getUsers);
user.get('/user/:id', tokenValidations, controllerUser.getUsersById);
user.post('/user', controllerUser.searchBD, controllerUser.createUser);

module.exports = user;