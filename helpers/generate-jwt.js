const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise( (resolve, reject) => {
        
        const payload = {uid}; //aqui guardamos lo que queramos en el payload del jwt

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '8h' //tiempo en el que expira el token
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });

    })

}

module.exports = {
    generateJWT
}