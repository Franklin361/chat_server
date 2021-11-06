const { request, response } = require("express");
const MensajeModel = require("../models/Mensaje");

const obtenerChat = async(req=request, res=response) => {
    const idUser = req.uid;
    const de = req.params.de;

    const last = await MensajeModel.find({
        $or:[
            {de: idUser, para: de},
            {de: de, para: idUser},
        ]
    }).sort({createdAt: 'asc'}).limit(30);
    
    
    res.json({
        mensajes: last
    })
};

module.exports= {
    obtenerChat

}