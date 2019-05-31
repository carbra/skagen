const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const ProductoSchema = new Schema({

    armadora: String,
    modelo: String,
    ano: String,
    motor: String,
    imagen: String,
    descripcion: String,
    idProducto: String

},{timestamps:true});

module.exports = mongoose.model("Productos", ProductoSchema);
