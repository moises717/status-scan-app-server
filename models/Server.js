const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const Sockets = require("./Sockets");
const cors = require("cors");
class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//Http server
		this.server = http.createServer(this.app);

		//Configueraciones de sockets

		this.io = socketIo(this.server, {
			cors: {
				origin: "*",
				methods: ["GET", "POST"],
			},
		});
	}

	middleware() {
		this.app.use(express.static(path.resolve(__dirname, "../public")));

		//cors
		this.app.use(cors());
	}

	configurarSockets() {
		new Sockets(this.io);
	}

	execute() {
		//inicializar middlewares
		this.middleware();

		//Inicializar sockets
		this.configurarSockets();

		this.server.listen(this.port, () => {
			console.log("Server on port:", this.port);
		});
	}
}

module.exports = Server;
