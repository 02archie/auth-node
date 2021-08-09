const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRol,
    adminRol
} = require('../middlewares');

const { esRoleValido, emailExist, existeUsuarioByID } = require('../helpers/db-validators');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(), //middleware para validar si es un id de mongo o no
    check('id').custom( existeUsuarioByID ), //valida que exista ese id si es valido de mongo
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El formato de correo es invalido').isEmail(),
    // check('rol', 'El rol no es valido, intenta con otro').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExist),
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    // adminRol, //Validacion solo es si tiene rol Admin
    tieneRol('ADMIN_ROLE', 'VENTAS:ROLE'), //Validacion para varios roles
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioByID ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );


module.exports = router;