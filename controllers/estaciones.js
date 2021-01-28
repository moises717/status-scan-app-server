const path = require("path");
const Datastore = require("nedb");

const db = new Datastore({ filename: path.resolve("data/estaciones.db"), autoload: true });

const getEstaciones = () => {
	return new Promise((resolve, reject) => {
		db.find({}, (err, docs) => {
			if (!err) {
				resolve(docs);
			} else {
				console.log("Error al grabar los datos");
			}
		});
	});
};

const grabarDatos = (datos) => {
	db.insert(datos, function (err, newDoc) {
		if (!err) {
			console.log(newDoc);
		}
	});
};

const eliminarEstacion = (id) => {
	return new Promise((resolve, resject) => {
		db.remove({ _id: id }, {}, (err, dataRemoved) => {
			if (!err) {
				resolve("Eliminado con exito!");
			} else {
				console.log("Error al borrar");
			}
		});
	});
};

module.exports = {
	getEstaciones,
	grabarDatos,
	eliminarEstacion
};
