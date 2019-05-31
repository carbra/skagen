const express = require('express');
const multer = require ('multer');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = 3033
const app = express();


// importacion de los endpoint de el administrador
const ApisAdmin = require('./routes/admin');
// importacion de endpoint de shop
const ApisShop = require('./routes/shop');

 // importamos la configuacion de mongoose para que se conectecte a la base de datos
 
import './mongoose/controller'  

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage:storage}).single('imagen'));


app.use(ApisAdmin);
app.use(ApisShop)


// endpoint para urls no conocidas
app.use((req, res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.set('port',process.env.PORT || 3033);


app.listen(app.get('port'),()=>{
    console.log("servidor corriendo en el puerto ",app.get('port'));
});
