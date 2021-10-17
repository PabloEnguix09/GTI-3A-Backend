/**
 * 
 * NOMBRE: backend.js
 * AUTOR: Pablo Enguix Llopis
 * FECHA: 16/10/2021
 * DESCRIPCIÓN: Este fichero se encarga de pedir al servidor datos y mostrarlos en la web (lógica fake)
 * 
 */

const PUERTO_IP = "http://localhost:8080";

function getTodasMediciones(cb) {

    fetch(PUERTO_IP + "/getTodasMediciones", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).catch((err) => console.log("No se pudo recoger todas las mediciones" + err))
    .then((res) => res.json())
    .then(resJSON => {
        cb(resJSON);
    });
}

function getUltimasMediciones(cuantas, cb) {
    fetch(PUERTO_IP + "/getUltimasMediciones/" + cuantas, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).catch((err) => console.log("No se pudo recoger las últimas mediciones" + err))
    .then((res) => res.json())
    .then(resJSON => {
        cb(resJSON);
    });
}

function botonTodasMediciones_Click() {
    console.log("getTodasMediciones");
    
    getTodasMediciones(function (res) {
        mostrarMediciones(res);
    });
}

function botonUltimasMediciones_Click() {

    if(document.getElementById("cuantasMediciones").value != null) {
        let cuantas = document.getElementById("cuantasMediciones").value;

    console.log("getUltimasMediciones/:", cuantas);

        getUltimasMediciones(cuantas,function (res) {
            mostrarMediciones(res);
        });
    }
}

function mostrarMediciones(res) {
    let listaMediciones = document.getElementById("listaMediciones");
    listaMediciones.innerHTML = "";

    res.forEach(medicion => {
        listaMediciones.innerHTML += "<li>"+ medicion.id + "    " + medicion.idUsuario + "    " + medicion.idSensor + "    " + medicion.fecha + "    " + medicion.posicionLat + "    " + medicion.posicionLng + "    " + medicion.dato +"</li>";
    });
}