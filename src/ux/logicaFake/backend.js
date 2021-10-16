function obtenerMedicionesUsuario() {
    let lista = document.getElementById("listaMediciones");

    lista.innerHTML = "<li>Todas las mediciones</li> <li>Si, todas</li>";
}

function obtenerUltimasMedicionesUsuario() {
    let cuantas = 20;
    let lista = document.getElementById("listaMediciones");

    lista.innerHTML = "<li>Ultimas las mediciones</li> <li>Si, las últimas</li>";
}