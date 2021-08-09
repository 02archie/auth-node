const { validationResult } = require('express-validator');
const { response, request } = require('express');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next(); //si pasa la validacion se pasa al siguiente middleware y si ya no hay se pasa al controlador
}

module.exports = {
    validarCampos
}