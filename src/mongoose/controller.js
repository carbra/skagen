const mongoose = require('mongoose');

const mongo_uri = "mongodb+srv://skagenUsuario:skagen2019@cluster0-aog9o.mongodb.net/test?retryWrites=true"

//const mongo_uri = "mongodb+srv://SkagenN:skagenskagen@cluster0-cparl.mongodb.net/test?retryWrites=true"
// const mongo_uri =" mongodb+srv://AutosolutionsSK:skagen.2019@cluster0-cparl.mongodb.net/test?retryWrites=true"
//const mongo_uri = "mongodb+srv://testUser:TestUser@cluster0-ib10n.mongodb.net/Articulos?retryWrites=true"

mongoose.connect(
    mongo_uri,
    { useNewUrlParser: true },
    (err) => {
        return err 
            ? console.error(`!!! Error al intentar conectar con el cluster!!!\n${err}`)
            : console.log(' --- ¡Conexión exitosa con Mongo Atlas! ---');
    }
);




export default mongoose;