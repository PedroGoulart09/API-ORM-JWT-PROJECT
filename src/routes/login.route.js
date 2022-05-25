const express = require('express');
const controllerLogin = require('../controller/login.controller');

const login = express.Router();

login.post('/login', controllerLogin.createUser);

module.exports = login;