'use strict' 

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var ArticuloSchema = Schema({
	titulo: String,
	descripcion: String,
	precio: Number
});

module.exports = mongoose.model('articulos', ArticuloSchema);
