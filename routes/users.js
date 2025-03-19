'use strict'

var express = require('express');
var userController = require('../controllers/users');
var tokenHelper = require('../helpers/auth'); //
var routes = express.Router();

routes.post('/api/user', tokenHelper.validateToken, tokenHelper.isAdmin, userController.createUser);
routes.post('/api/login',userController.loginUser);

module.exports = routes;