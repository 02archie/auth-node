const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//{{url}}/categorias
//Obtener todas las categorias (PUBLICO)
router.get('/', (req, res) => {
    res.json('GET');
})

//Obtener una categoria por id - PUBLICO 
router.get('/:id', (req, res) => {
    res.json('GET - ID');
})

//Crear categoria - PRIVADO - cualquier persona con token valido
router.post('/', (req, res) => {
    res.json('POST');
})

//Actualizar - PRIVADO - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json('PUT');
})

//Solo si es admin puede borrar
router.delete('/:id', (req, res) => {
    res.json('DELETE');
})

module.exports = router;