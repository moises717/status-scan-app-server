class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		//On connection

		this.io.on("connection", (socket) => {
			//Conectar eventos
			socket.on("msg-to-server", (data) => {
				console.log(data);

				this.io.emit("msg-from-server", data);
			});
		});
	}
}

module.exports = Sockets;
