'use strict'

var jwt = require('jwt-simple'); //jwt = Json Web Token (define identidad de una persona)
var moment = require('moment'); //expiracion del token
var {response} = require('express');
var secret = '@BC!23';	//desencriptar token

function generateToken(user){
	var payload = {
		sub : user._id,								//Sujeto
		name : user.email,							//Quien se esta logeando
		role: user.role, 							// Agregamos el rol del usuario
		iat : moment().unix(),						//Fecha actual y formato Unix(milisegundos)
		exp : moment().add('5', 'minutes').unix()		//Fecha actual, le agregamos 2 minutos y formato Unix(milisegundos)
	}

	return jwt.encode(payload, secret);
}

function validateToken(req, resp, nextStep){
    try{
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer','');
        var payload = jwt.decode(cleanToken, secret);

        req.header.userId = payload.sub;  // Permitir recordar quién fue el usuario logueado
        req.header.userRole = payload.role;  // Guardamos el rol en la cabecera de la petición
        
        console.log("Token validado. Rol:", req.header.userRole); // Agrega esta línea para ver el rol en consola

        nextStep();  // Permite avanzar
    }
    catch(ex){
        resp.status(403).send({message: 'Token invalido'});
    }
}


//Verificar si el usuario es administrador
function isAdmin(req, resp, nextStep) {
  if (req.header.userRole !== "admin") {
    return resp.status(403).send({ message: "Acceso denegado. Se requiere rol de administrador" });
  }
  nextStep();
}

//ROLES Y ACCESO
function checkAdminRole(req, resp, next) {
    const userRole = req.header.userRole;  
    
    console.log("Comprobando rol del usuario:", userRole);  

    if (userRole !== 'admin') {
        return resp.status(403).send({message: 'No tienes permiso para realizar esta acción.'});
    }

    next();  // Si el rol es admin, permitimos que continúe la ejecución de la ruta
}


module.exports = {generateToken, validateToken, isAdmin, checkAdminRole}


