const UsuarioModel = require("../models/Usuario");
const MensajeModel = require("../models/Mensaje");

const usuarioContectado = async(uid) => {
    const user = await UsuarioModel.findById(uid);
    user.online = true
    await user.save();

    return user;
};

const usuarioDescontectado = async(uid) => {
    const user = await UsuarioModel.findById(uid);
    user.online = false
    await user.save();

    return user;
};

const getUsuarios = async() => {

    const usuarios = await UsuarioModel.find({}).sort('-online');
    return usuarios;
};

const grabarMensaje = async( payload ) => {
     
    try {
        
        const mensaje = new MensajeModel(payload);
        await mensaje.save();
        return mensaje;

    } catch (error) {
        console.log(error);
        return false
    }
};

module.exports = {
    usuarioContectado,
    usuarioDescontectado,
    getUsuarios,
    grabarMensaje
}