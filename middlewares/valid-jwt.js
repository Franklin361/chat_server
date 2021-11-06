const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    try {
        const token = req.header('x-token');

        if(!token){
            return res.status(401).json({
                msg: 'No hay token en la petición'
            })
        }

        const {uid} = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Token no valido'
        }) 
    }
};

module.exports={validarJWT}