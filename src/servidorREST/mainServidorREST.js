const express = require("express");
const Logica = require("../logica/Logica.js");

function cargarLogica(base, usuario, host, puerto, dialecto) {
    return new Logica(base, usuario, host, puerto, dialecto);
}

async function main() {
    let logica = cargarLogica("gti3a_sprint0", "root", "localhost", 3306, "mysql");
    let medicion = logica.cargarModeloMedicion();
    let servidorExpress = express();
    let reglas = require("./ReglasREST.js");

    let servicio = servidorExpress.listen(8080, function () {
        console.log("Servidor REST conectado en el puerto 8080");
    });

    servidorExpress.use(express.json());

    servidorExpress.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    reglas.cargar(servidorExpress, logica, medicion);

    process.on("SIGINT", function () {
        console.log(" terminando servicio... ");
        servicio.close();
    });

}

main();