// Enrutador configuracion del api
const { Router } = require('express');
const redis = require('./redis-cliente');
const router = Router();



router.get('/?',(req, res) => {
    res.sendFile(__dirname + '/configuracion.html');
    let Numpeticiones = req.query.Npeticiones;
    let Numsegundos = req.query.Nsegundos;
    let Pathrutadest = req.query.Nrutadest;

    redis.set("peticiones", Numpeticiones);
    redis.set("segundos", Numsegundos);
    redis.set("rutadest", Pathrutadest);

    redis.get("peticiones").then(function(result) {
        console.log("Peticiones guardadas: ", result);
    });

    redis.get("segundos").then(function(result) {
        console.log("Segundos guardados: ", result);
    });

    redis.get("rutadest").then(function(result) {
        console.log("Ruta destino guardada: ", result);
    });

    res.redirect('/configuracion');
});

module.exports = router;
