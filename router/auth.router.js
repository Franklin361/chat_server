const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, renovarToken, login } = require("../controllers/auth");
const { fieldsValidation } = require("../middlewares/fieldsValidation");
const { validarJWT } = require("../middlewares/valid-jwt");

const router = Router();

router.post('/', [
    check('email', 'El email es obligatario').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    fieldsValidation
],login);

router.post('/new', [
    check('nombre', 'El nombre es obligatario').notEmpty().isString(),
    check('password', 'El password es obligatorio').notEmpty().isString(),
    check('email', 'El email es obligatario').isEmail(),
    fieldsValidation
] , crearUsuario)

router.get('/renew', [
    validarJWT
],renovarToken)



module.exports = router;