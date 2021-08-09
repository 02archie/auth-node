const bcryptjs = require('bcryptjs');
const { response, request } = require('express');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;
    
    const [count, result] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number(offset))
            .limit(Number(limit)),
    ]);

    res.json({
        count,
        result
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Encriptar constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en bd 
    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //validar todo contra bd 
    if( password ){
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    //respoesta de la api
    res.json({usuario});
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params

    //Borrado logico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario,
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}