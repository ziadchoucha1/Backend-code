const express = require('express');
const {login}= require('../controllers/authController.js');
const {validateLogin} = require('../utils/validators.js')

const authRoutes = express.Router();

authRoutes.post('/Login', validateLogin, login);

module.exports = authRoutes;

