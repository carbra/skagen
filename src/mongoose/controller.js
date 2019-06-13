const mongoose = require('mongoose');

// const mongo_uri = "mongodb+srv://skagenUsuario:skagen2019@cluster0-aog9o.mongodb.net/test?retryWrites=true"
console.log(process.env.MONGODB_URI)

// mongoose.connect(
//     process.env.MONGO_URI,
//     { useNewUrlParser: true },
//     (err) => {
//         return err 
//             ? console.error(`!!! Error al intentar conectar con el cluster!!!\n${err}`)
//             : console.log(' --- ¡Conexión exitosa con Mongo Atlas! ---');
//     }
// );




export default mongoose;