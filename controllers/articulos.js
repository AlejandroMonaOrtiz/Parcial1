'use strict'

var Articulo = require('../models/articulos.js');

//CRUD
function createArticulo(req,resp){
	var articuloReqBody = req.body;

	var newArticulo = new Articulo();
	newArticulo.titulo = articuloReqBody.titulo;
	newArticulo.descripcion = articuloReqBody.descripcion;
	newArticulo.precio = articuloReqBody.precio;


	if(newArticulo.titulo == null || newArticulo.titulo.trim() ===''
	|| newArticulo.descripcion == null || newArticulo.descripcion.trim() ===''
	|| newArticulo.precio == null || newArticulo.precio <= 0 ===''){
		res.status(400).send({'message':'No se han enviado una o más variables requeridas' })
	}

	newArticulo.save().then(
		(savedArticulo) => {
			resp.status(200).send({'message': 'el articulo se creó de manera exitosa', 'articulo': savedArticulo})
		},
		err => {
			res.status(500).send({'message':'se ha producido un error al crear el articulo', 'error':err })
		}
		); 
}

function editArticulo(req, resp){
	var articuloToEdit = req.params._id;
	var articuloNewValues = req.body;

	var articulo = new Articulo();

	articulo._id = articuloToEdit;
	articulo.titulo = articuloNewValues.titulo;
	articulo.descripcion = articuloNewValues.descripcion;
	articulo.precio = articuloNewValues.precio;

	Articulo.findByIdAndUpdate(articulo._id,articulo, {new : true}).then(
			(editedArticulo) => {
				resp.status(200).send({'message':'Articulo editado con éxito','articulo' : editedArticulo });
			},
			err =>{
				resp.status(500).send({'message':'se ha producido un error al editar el articulo', 'error':err });
			}
		);
}

function deleteArticulo(req, resp){
	var articuloToDelete = req.params._id;

	Articulo.findByIdAndDelete(articuloToDelete).then(
			(deletedArticulo) => {
				resp.status(200).send({'message':'Articulo eliminado con éxito','articulo' : deletedArticulo });
			},
			err =>{
				resp.status(500).send({'message':'se ha producido un error al borrar el articulo', 'error':err });
			}
		);
}

function findArticuloById(req, resp){
	var articuloToFind = req.params._id;

	Articulo.findById(articuloToFind).then(
			(foundArticulo) => {
				resp.status(200).send({'articulo' : foundArticulo });
			},
			err =>{
				resp.status(500).send({'message':'se ha producido un error al buscar el articulo', 'error':err });
			}
		);
}


module.exports = {
	createArticulo, editArticulo, deleteArticulo, findArticuloById
}
