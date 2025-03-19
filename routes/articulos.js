'use strict'

var express = require('express');
var articuloController = require('../controllers/articulos.js');
var routes = express.Router();
var token = require('../helpers/auth');
var checkAdminRole = require('../helpers/auth').checkAdminRole; // Cambiado aquí

routes.post('/api/articulo', token.validateToken, checkAdminRole, articuloController.createArticulo);		//administrador 
routes.put('/api/articulo/:_id', token.validateToken, checkAdminRole, articuloController.editArticulo);		//administrador 
routes.delete('/api/articulo/:_id', token.validateToken, checkAdminRole, articuloController.deleteArticulo);	//administrador 
routes.get('/api/articulo/:_id',articuloController.findArticuloById);	//administrador / usuario


module.exports = routes;
