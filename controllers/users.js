'use strict'

var User = require('../models/users');
var token = require('../helpers/auth');
var bcrypt = require("bcryptjs"); 		//Hash para la contraseña

function createUser(req, resp){
	var parameters = req.body;
	var salt = bcrypt.genSaltSync(15);

	var newUser = new User();
	newUser.email = parameters.email;
	newUser.password = bcrypt.hashSync(parameters.password, salt);
	newUser.role = parameters.role || "user"; // Asigna el rol (por defecto "user")

	newUser.save().then(
		(userSaved) => {
			resp.status(200).send({'message': 'usuario creado con éxito'});
		},
		err =>{
			resp.status(500).send({'message':'Se ha producido un error al crear el curso','error':err});
		}
	);
}
function loginUser(req, resp){
	var parameters = req.body;

	User.findOne({'email' : parameters.email}).then(
			(userFound) => {
				if(userFound == null){
					resp.status(403).send({'message':'Usuario no encontrado'});
				}
				if(bcrypt.compareSync(parameters.password, userFound.password)){
					resp.status(200).send({'message': 'inicio de sesión exitoso', 'token': token.generateToken(userFound), 'role': userFound.role});
				}
				else{
					resp.status(403).send({'message': 'Inicio de sesión inválido'});
				}
			},
			err =>{
				resp.status(500).send({'message':'Se ha producido un error al validar el usuario','error':err});
			}
		);
}
module.exports = {createUser, loginUser}
