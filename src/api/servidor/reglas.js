const common = require("mocha/lib/interfaces/common");

module.exports.cargar = function (servidor, logica, Medicion) {

    servidor.get("/test", function (peticion, res) {

        console.log("GET test");
    
        res.send("Parece que funciona");
    
    });
    
    servidor.post("/postMedicion", async function (peticion, res) {
    
        console.log("POST medicion");
        const data = peticion.body;
    
        try {
            await logica.postMedicion(Medicion, data);
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    
    });
    
    servidor.get("/getTodasMediciones", async function (peticion, res) {
    
        console.log("GET getTodasMediciones");
    
        const mediciones = await logica.getTodasMediciones(Medicion);
        if (mediciones.length > 0) {
            res.send(mediciones);
        } else {
            res.sendStatus(404);
        }
    });
    
    servidor.get("/getUltimasMediciones/:cuantas", async function (peticion, res) {
    
        console.log("GET getUltimasMediciones");
    
        let cuantas;
        
        cuantas = parseInt(peticion.params.cuantas, 10);
        
        const mediciones = await logica.getUltimasMediciones(Medicion, cuantas);
    
        if (mediciones.length > 0) {
            res.send(mediciones).status(200);
        } else {
            res.sendStatus(404);
        }
    });
    
}
