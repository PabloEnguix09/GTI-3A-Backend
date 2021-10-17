const express = require("express");
const Logica = require("../logica/Logica.js");
require("dotenv").config;

function cargarLogica(base, usuario, host, puerto, dialecto) {
    return new Logica(base, usuario, "", host, puerto, dialecto);
}

async function main() {
    let logica = cargarLogica(
        process.env.BASE,
        process.env.BASE_USER,
        process.env.BASE_HOST,
        process.env.BASE_PORT,
        process.env.BASE_DIALECT
    );
    let Medicion = laLogica.cargarModelos();
    let servidorExpress = express();
    let reglas = require("./ReglasREST.js");
    let servicio = servidorExpress.listen(process.env.PORT, function () {
        console.log(`Servidor REST conectado Puerto ${process.env.PORT}`);
    });

    servidorExpress.use(express.json());

    servidorExpress.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    process.on("SIGINT", function () {
        console.log(" terminando servicio... ");
        servicio.close();
    })

}

main();