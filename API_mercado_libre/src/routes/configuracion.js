// Enrutador configuracion del api
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/configuracion.html');

});

module.exports = router;