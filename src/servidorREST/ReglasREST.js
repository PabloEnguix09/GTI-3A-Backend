const common = require("mocha/lib/interfaces/common");

module.exports.cargar = function (servidor, laLogica, Medicion) {

    servidor.get("/prueba", function (peticion, res) {

        console.log("GET prueba");
    
        res.send("Parece que funciona");
    
    });
    
    servidor.post("/medicion", async function (peticion, res) {
    
        console.log("POST medicion")
    
        const data = peticion.body;
    
        try {
            await laLogica.insertarMedicion(Medicion, data);
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    
    });
    
    servidor.get("/obtenerTodasLasMediciones", async function (peticion, res) {
    
        console.log("GET obtenerTodasLasMediciones")
    
        const mediciones = await laLogica.obtenerTodasLasMediciones(Medicion);
        if (mediciones.length > 0) {
            res.send(mediciones);
        } else {
            res.sendStatus(404);
        }
    });
    
    servidor.get("/obtenerUltimasMediciones/:cuantas", async function (peticion, res) {
    
        console.log("GET obtenerUltimasMediciones")
    
        let numeroDeMediciones;
        
        numeroDeMediciones = parseInt(peticion.params.cuantas, 10);
        
        const mediciones = await laLogica.obtenerUltimasMediciones(Medicion,numeroDeMediciones);
    
        if (mediciones.length > 0) {
            res.send(mediciones).status(200);
        } else {
            res.sendStatus(404);
        }
    
    });
}
