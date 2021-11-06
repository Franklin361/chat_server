// Servidor de Express
const express  = require('express');
const cors = require('cors');
const http     = require('http');
const socketio = require('socket.io');
const { connectionDB } = require('../database/config');
const Sockets  = require('./sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;
        //Conexión a la BD
        connectionDB()
        // Http server
        this.server = http.createServer( this.app );
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(cors({
            origin: true
        }));
        this.app.use(express.json());
        
        this.app.use('/api/login', require('../router/auth.router'))
        this.app.use('/api/mensajes', require('../router/mensajes.router'))
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;