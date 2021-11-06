const { usuarioContectado, usuarioDescontectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {
            
            const [ valido, uid ]=comprobarJWT(socket.handshake.query['x-token']);

            if( !valido){
                return socket.disconnect();
            }

            await usuarioContectado(uid);

            socket.join( uid );

            socket.on('mensaje-personal', async({de, para, mensaje,})=>{
                const msg = await grabarMensaje({de, para, mensaje});

                this.io.to( para ).emit('mensaje-personal', msg);
                this.io.to( de ).emit('mensaje-personal', msg);
            })
            
            this.io.emit('lista-usuarios', await getUsuarios());

            socket.on('disconnect', async ()=>{
                const usuarioDEscontectado = await usuarioDescontectado(uid);
                console.log({usuarioDEscontectado})
                this.io.emit('lista-usuarios', await getUsuarios())
            })
        
        });
    }


}


module.exports = Sockets;