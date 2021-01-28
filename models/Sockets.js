const { getEstaciones, grabarDatos, eliminarEstacion } = require("../controllers/estaciones");

class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		//On connection

		this.io.on("connection", async (socket) => {
			console.log("cliente connectado");
			//Conectar eventos

			this.io.emit("lista", await getEstaciones());

			socket.on("estacion", async (data) => {
				grabarDatos(data);
				this.io.emit("lista", await getEstaciones());
			});

			socket.on("eliminar", async (id, callback) => {
				const eliminar = await eliminarEstacion(id);

				callback({ message: eliminar });

				this.io.emit("lista", await getEstaciones());
			});
		});
	}
}

module.exports = Sockets;
