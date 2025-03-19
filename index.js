'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://localhost:27017/desarrolloweb').then(
		() => {
			console.log("base de datos conectada con éxito. Iniciando aplicación")
			application.listen(6543, function(){;
			console.log("Solicitud iniciada");
		});

		},
		err => {
			console.log("Error al conectar con la base de datos. Aplicación no iniciada" + err);
		}
	);
