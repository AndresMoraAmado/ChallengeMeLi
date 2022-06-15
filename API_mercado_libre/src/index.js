//constantes
const express = require("express");
const app = express();
//info del consumo
const morgan = require("morgan");


//configuraciones
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);

//funciones
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Servidor Corriendo');
});

//routes
app.use('/configuracion',require('./routes/configuracion'));
app.use('/guardarconfig',require('./routes/guardarconfig'));
app.use(require('./routes/categories'));