const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request ,res = response, next) => {
    const token = req.header('token');
    
    if(!token){
        return res.status(400).json({
            msg: 'No existe el token, por favor inicia sesión'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer usuario que sea igual al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }

        //verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario dado de baja'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token no es valido'
        });
    }

}

module.exports ={
    validarJWT
}