'use strict'

//configuracion del express
var express = require('express');
var bodyParser = require('body-parser'); //convierte de JSON a JAVASCRIPT
var routesArticulo = require('./routes/articulos');
var routesUser = require('./routes/users');
var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({'extended': false}));
application.use(routesArticulo);
application.use(routesUser);

module.exports = application;
