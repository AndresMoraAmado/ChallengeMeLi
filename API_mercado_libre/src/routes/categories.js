// Enrutador api categories
const { Router } = require('express');
const router = Router();
const fetch  = require('node-fetch');
const redis  = require('./redis-cliente');

//https://api.mercadolibre.com/sites/MLA/categories'
//https://developers.mercadolibre.com

router.get('/*', async (req, res) => {
    
    if (req.params[0] !== 'favicon.ico') {

        let Rutadestino;
        redis.get("rutadest").then( async function(result) {
            Rutadestino = String(result);
            console.log("ruta destino: ", Rutadestino);

            if (String(Rutadestino) === String(req.params[0]) || Rutadestino === ""){
                let Numpeticiones;
                let Numsegundos;

                redis.get("peticiones").then(function(result) {
                    Numpeticiones = Number(result);
                });

                redis.get("segundos").then(function(result) {
                    Numsegundos = Number(result);
                });

                const ip_org = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
                const peticiones = await redis.incr(ip_org); 
                let segundos;   
                
                if (peticiones === 1){
                    await redis.expire(ip_org, Numsegundos);
                    segundos = Numsegundos;
                } else{
                    segundos = await redis.ttl(ip_org);
                }

                if(peticiones > Numpeticiones){
                    const superopeticiones =[{
                        response: 'Error',
                        peticiones: peticiones,
                        tiempoRestante: segundos,
                        limitePeticiones: Numpeticiones,
                        tiempoTotal: Numsegundos
                    }]          
                        res.json(superopeticiones);
                }else{

                    const categories = await fetch('https://api.mercadolibre.com/' + req.params[0]).
                    then(response => response.json());
                    console.log(req.params[0]);
                    
                    const Npeticiones =[{
                        response: 'OK',
                        peticiones: peticiones,
                        tiempoRestante: segundos,
                        limitePeticiones: Numpeticiones,
                        tiempoTotal: Numsegundos
                    }]
                    var Api_meli = Npeticiones.concat(categories);
                    res.json(Api_meli);
                }        
                console.log('peticiones: ' + peticiones);
                console.log('segundos: ' + segundos);
            }else{
                const categories2 = await fetch('https://api.mercadolibre.com/' + req.params[0]).
                then(response => response.json());
                console.log(req.params[0]);      
                res.json(categories2); 
            }
        });
    }  
});

module.exports = router;