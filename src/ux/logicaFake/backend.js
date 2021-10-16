const PUERTO_IP = "http://localhost:8080";

function obtenerTodasLasMediciones(cb) {

    fetch(PUERTO_IP + "/obtenerTodasLasMediciones", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).catch((err) => console.log("No se pudo recoger todas las mediciones" + err))
    .then((res) => res.json())
    .then(resJSON => {
        cb(resJSON);
    });
}

function obtenerUltimasMediciones(cuantas, cb) {
    fetch(PUERTO_IP + "/obtenerUltimasMediciones/" + cuantas, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).catch((err) => console.log("No se pudo recoger las últimas mediciones" + err))
    .then((res) => res.json())
    .then(resJSON => {
        cb(resJSON);
    });
}

function botonTodasMediciones_Click() {
    

    obtenerTodasLasMediciones(function (res) {
        mostrarMediciones(res);
    });
}

function botonUltimasMediciones_Click() {

    if(document.getElementById("cuantasMediciones").value != null) {
        let cuantas = document.getElementById("cuantasMediciones").value;

        obtenerUltimasMediciones(cuantas,function (res) {
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