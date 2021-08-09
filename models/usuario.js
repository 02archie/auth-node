const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// cuando se mande llamar el toJSON se ejecuta la siguiente función pero tiene que ir como función normal
UsuarioSchema.methods.toJSON = function () {
    //quita valores de lo que regresa la api
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id; //Cambiamos para que enlugar de que regrese _id sea uid
    return usuario;

}

module.exports = model('Usuario', UsuarioSchema);