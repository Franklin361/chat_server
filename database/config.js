const { connect } = require("mongoose");

const connectionDB = async ()=>{
    try {
        
        connect(process.env.MONGOCONNETION);
        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error)
        throw new Error('Error en la BD');
    }
}  

module.exports={ connectionDB }