// Servidor de Express
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {

    constructor() {
        
        this.app = express();;
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
         
        // Configuracion sockets
        this.io = socketIo( this.server, { cors: {
            origin: "*",
            methods: ["GET", "POST"]
          }}); 
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en puerto: ${this.port}`);
        });

    }
}

module.exports = Server;