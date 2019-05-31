const express = require('express');
const path = require('path');
const router = express.Router();

import Productos from '../models/productos';

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name : 'auto-solutions-mexico' , 
  api_key:'592371139495351',
  api_secret:'9473ccS3Na3gNravEBji6rTRckU'
});

const fs = require('fs-extra');
 
//primera vista
router.get('/', (req, res)=>{
  Productos.find().exec()
  .then(productos => res.render(path.join(__dirname,'../','views/shop','index2.ejs'),{products:productos}))
  .catch(err => res.status(409).send(err))

});

//ruta de admin
router.get('/admin',(req, res) =>{
  Productos.find().exec()
  .then(productos => res.render(path.join(__dirname,'../','views/adminViews','agregarProductos.ejs'),{products:productos}) )
  .catch(err => res.status(409).send(err))
    
});
//ruta de todos los kits
// router.get('/kits',(req, res) =>{
//   Productos.find().exec()
//   .then(productos => res.render(path.join(__dirname,'../','views/shop','todosKits.ejs'),{products:productos}) )
//   .catch(err => res.status(409).send(err))
    
// });

// end point que obtiene todos los prodcutos
router.get('/agregarProductos',(req, res , next ) =>{
    Productos.find().exec()
        .then(producto => producto ? res.send(producto) : res.status(404).send({message:'product not found'}))
        .catch(err => res.status(409).send(err))
 });


// obtener producto por armadora, modelo y año
router.get('/showProducts', (req,res) => {
  const {ano,armadora,modelo} = req.query;
  console.log(req.query);
  Productos.find({ano:ano,armadora:armadora,modelo:modelo})
  .then(producto =>{
    console.log(producto);
    res.render(path.join(__dirname,'../','views/shop','tu_producto.ejs'),{ products:producto})
  })
 
  .catch(err => res.status(409).send(err))
 
  // res.status(404).send({message:'product not found'})
});

//buscar productos por idProducto
router.get('/productosPorId', (req,res)=>{
  const {idProducto} = req.query;
  console.log(req.query);
  Productos.find({idProducto:idProducto})
  .then(producto =>{
    //console.log(producto);
    res.render(path.join(__dirname,'../','views/shop','modificar-id.ejs'),{ products:producto})
  })
 
  .catch(err => res.status(409).send(err))
});

//buscar productos por armadora
router.get('/productosArmadoras', (req,res) => {
  const {armadora} = req.query;
  console.log(req.query);
  const Armadora = armadora.toLowerCase();
  Productos.find({armadora:Armadora})
  .then(producto =>{
    //console.log(producto);
    res.render(path.join(__dirname,'../','views/shop','productosArmadoras.ejs'),{ products:producto})
  })
 
  .catch(err => res.status(409).send(err))
});



//encontrar un archivo por idProducto de la bd
router.get('/tu_producto', (req, res)=>{
  const {idProducto} = req.params;
  Productos.findOne({idProducto: idProducto}).exec()
  .then(productos => res.render(path.join(__dirname,'../','views/shop','tu_producto.ejs'),{product:products}))
  .catch(err => res.status(409).send(err))
});


//elimina un producto
router.get('/Eliminar/:id',  (req, res)=> {
  const {id} = req.params;
  Productos.remove({_id: id}).exec()
  .then(producto => producto ? res.send(producto) : res.status(404).send({message:'product not found'}))
  .catch(err => res.status(409).send(err))
  res.redirect('/admin');

});


//elimina toda una armadora
// router.get('/EliminarArmadora/:armadora',  (req, res)=> {
//   const {armadora} = req.params;
//   Productos.remove({armadora: armadora}).exec()
//   .then(producto => producto ? res.send(producto) : res.status(404).send({message:'product not found'}))
//   .catch(err => res.status(409).send(err))
//   res.redirect('/admin');

// });

//actualiza un producto por id
router.get('/update/:id', (req, res) => {
  const {id} = req.params;
  Productos.findById(id)
   .then(producto =>{
     res.render(path.join(__dirname, '../','views/adminViews','modificar.ejs'),{pro:producto})
   })
   .catch(error =>{
     throw new Error(error)
   })
});

router.post('/update/:id', (req,res)=>{
  const {id} = req.params;
  Productos.findByIdAndUpdate({_id:id}, req.body)
  .then(producto=>{
    return console.log("se guardo correstamente el producto: ", producto);
    
  })
  .catch(error => {
    throw new Error (error)
  })
  res.redirect('/admin');
});

// End point que guarda un prodcutos en la base de datos

router.post('/agregarProducto', async (req,res, next) => {
  const{armadora, modelo,ano, motor, descripcion, idProducto} = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const newProducto = new Productos({
    armadora,
    modelo,
    ano,
    motor,
    imagen: result.url, 
    public_id: result.public_id,
    descripcion,
    idProducto
  });
  await newProducto.save();
  await fs.unlink(req.file.path);

  res.redirect('/admin');

});

router.get('/kits/:page', (req,res,next) => {
  let perPage = 21;
  let page = req.params.page || 1;

  Productos
  .find({})
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec((err, productos) => {
    Productos.countDocuments((err, count) => {
      if(err) return next(err);
      res.render(path.join(__dirname, '../','views/shop','todosKits.ejs'),{productos, current: page, pages: Math.ceil(count / perPage)})
    })
 
  })
  

});





module.exports = router
