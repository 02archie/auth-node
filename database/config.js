const mongoose = require('mongoose');


const dbConnection = async () => {

    await mongoose
        .connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => console.log('base de datos ONLINE'))
        .catch(err => console.log('No se pudo conectar', err));

}

module.exports = {
    dbConnection
}