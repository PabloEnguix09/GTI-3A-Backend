/**
 * 
 * NOMBRE: servidor.js
 * AUTOR: Pablo Enguix Llopis
 * FECHA: 16/10/2021
 * DESCRIPCIÓN: Este fichero contiene las características del servidor REST
 * 
 */

const express = require("express");
const Logica = require("../logica/logica.js");

/**
 * 
 * Esta función se encarga de crear un objeto Logica
 * 
 * @param {*} base El nombre de la base de datos
 * @param {*} usuario El nombre de usuario para entrar en la base de datos
 * @param {*} host El host de la base de datos
 * @param {*} puerto El puerto al que tiene que escuchar
 * @param {*} dialecto El tipo de tecnología que se usa
 * @returns 
 */
function cargarLogica(base, usuario, host, puerto, dialecto) {
    return new Logica(base, usuario, host, puerto, dialecto);
}

async function main() {
    let logica = cargarLogica("gti3a_sprint0", "root", "localhost", 3306, "mysql");
    let medicion = logica.cargarModeloMedicion();
    let servidorExpress = express();
    let reglas = require("./reglas.js");

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