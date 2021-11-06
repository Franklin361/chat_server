const { request, response } = require("express");
const UsuarioModel = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async(req=request, res=response) => {
    
    try {
        const { email, password } = req.body;

        const existUser = await UsuarioModel.findOne({ email });

        if(existUser){
            return res.status(400).json({
                msg: 'El usuario ya existe en la base de datos'
            })
        }

        const newUsuario = new UsuarioModel(req.body);
        
        const salt = bcrypt.genSaltSync();
        newUsuario.password = bcrypt.hashSync(password, salt)

        await newUsuario.save();

        const token = await generarJWT(newUsuario.id);

        res.json({
            usuario: newUsuario,
            token,
            msg: 'Usuario creado correctamente'
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })   
    }
};

const login = async(req=request, res=response) => {
    
    try {
        const { email, password } = req.body;

        const usuario = await UsuarioModel.findOne({email});
        if(!usuario){
            return res.status(400).json({
                msg: 'El usuario no se encontro en la base de datos'
            });
        }

        const isCorrectPassword = bcrypt.compareSync(password, usuario.password);

        if(!isCorrectPassword){
            return res.status(400).json({
                msg: 'Las credenciales son incorrectas'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
            msg: 'Autenticación realizada correctamente'
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        }) 
    }
};

const renovarToken = async(req=request, res=response) => {
    
    const { uid } = req;
    const token = await generarJWT(uid);

    const usuario = await UsuarioModel.findById(uid);


    res.json({
        usuario,
        token
    });
};

module.exports={
    crearUsuario,
    login,
    renovarToken
}