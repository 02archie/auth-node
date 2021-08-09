const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El ${rol} no esta registrado en la base de datos`);
    }
}

const emailExist = async(correo = '') => {
    const existEmail = await Usuario.findOne({ correo });
    if(existEmail){
        throw new Error(`El correo ya existe, intenta con otro`);
    }
}

const existeUsuarioByID = async( id ) => {
    const existeUsuarioId = await Usuario.findById(id);
    if(!existeUsuarioId){
        throw new Error('No existe un usuario con ese id, intenta con otro');
    }
}

module.exports = {
    esRoleValido,
    emailExist,
    existeUsuarioByID,
}
