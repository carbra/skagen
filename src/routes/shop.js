const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/',(req,res,next) =>{
    res.sendFile(path.join(__dirname,'../','views/shop','index2.ejs'),{products:productos});
});

// //obtener producto por armadora, modelo y año
// router.get('/tuProducto/:ano, armadora, modelo',(req,pas)=>{
//   const{ ano, armadora, modelo} = req.params;
//   Productos.find( ano, armadora, modelo), exec()
//   .then(productos => res.render(path.join(__dirname,'../','views/shop','tu_producto.ejs'),{products:productos}))
//   // .then(producto => producto ? res.send(producto) : res.status(404).send({message:'product not found'}))
//   .catch(err => res.status(409).send(err))
//
// });



module.exports = router;
