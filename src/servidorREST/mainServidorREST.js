const express = require("express");
require("dotenv").config;
const logica = require("../logica/Logica.js");

async function main() {
    let logica = cargarLogica(
        process.env.BASE,
        process.env.BASE_HOST,
        process.env.BASE_USER,
        process.env.BASE_PORT,
        process.env.BASE_DIALECT
    )
}

main();