const common = require("mocha/lib/interfaces/common");

module.exports.cargar = function (servidor, logica, Medicion) {

    servidor.get("/test", function (peticion, res) {

        console.log("GET test");
    
        res.send("Parece que funciona");
    
    });
    
    servidor.post("/postMedicion", async function (peticion, res) {
    
        console.log("POST medicion")
        const data = peticion.body;
        console.log("peticion=", peticion);
    
        try {
            await logica.insertarMedicion(Medicion, data);
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    
    });
    
    servidor.get("/getTodasMediciones", async function (peticion, res) {
    
        console.log("GET obtenerTodasLasMediciones")
    
        const mediciones = await logica.obtenerTodasLasMediciones(Medicion);
        if (mediciones.length > 0) {
            res.send(mediciones);
        } else {
            res.sendStatus(404);
        }
    });

    servidor.post("/prueba", async function(peticion, res) {
        console.log(peticion.body);
        res.sendStatus(200);
    })
    
    servidor.get("/getUltimasMediciones/:cuantas", async function (peticion, res) {
    
        console.log("GET obtenerUltimasMediciones")
    
        let numeroDeMediciones;
        
        numeroDeMediciones = parseInt(peticion.params.cuantas, 10);
        
        const mediciones = await logica.obtenerUltimasMediciones(Medicion,numeroDeMediciones);
    
        if (mediciones.length > 0) {
            res.send(mediciones).status(200);
        } else {
            res.sendStatus(404);
        }
    });
    
}
