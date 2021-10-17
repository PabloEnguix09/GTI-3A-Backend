const PUERTO_IP = "http://localhost:8080";
var request = require ("request");
var assert = require ("assert");

describe("Test 1, probando GET y POST", function () {
    it("probando GET /test", function(hecho) {
        request.get({url: PUERTO_IP + "/test", headers: {"User-Agent" : "PabloEnguixLlopis"}}, function(err, res, carga) {
            assert.equal(err, null, "¿Ha fallado algo?");
            assert.equal(res.statusCode, 200, "¿El código no es 200 (OK)");
            assert.equal(carga, "Parece que funciona", "¿La carga no es 'Parece que funciona'?");

            hecho();
        });
    });

    it("probando GET /obtenerTodasLasMediciones", function(hecho){
        request.get({url: PUERTO_IP + "/getTodasMediciones", headers: {"User-Agent" : "PabloEnguixLlopis"}}, function(err, res, carga) {
            assert.equal(err, null, "¿Ha fallado algo?");
            assert.equal(res.statusCode, 200, "¿El código no es 200 (OK)");
            let cargaJSON = JSON.parse(carga);
            assert.equal(new Date(cargaJSON[0].fecha).toString(), "Thu Oct 14 2021 16:02:00", "¿La primera fecha no es correcta?");
            assert.equal(new Date(cargaJSON[1].fecha).toString(), "Sun Oct 17 2021 13:16:45", "¿La segunda fecha no es correcta?");

            hecho();
        });
    });

    it("probando GET /obtenerUltimasMediciones", function(hecho) {
        request.get({url: PUERTO_IP + "/getUltimasMediciones/"+1, headers: {"User-Agent" : "PabloEnguixLlopis"}}, function(err, res, carga) {
            assert.equal(err, null, "¿Ha fallado algo?");
            assert.equal(res.statusCode, 200, "¿El código no es 200 (OK)");
            
            let cargaJSON = JSON.parse(carga);
            assert.equal(new Date(cargaJSON[0].fecha).toString(), "Sun Oct 17 2021 13:16:45", "¿La fecha no es correcta?");

            hecho();
        });
    });

    it("probando POST /medicion", function(hecho){
        let medicion = {idUsuario: "1", idSensor:"1", fecha:"2021-10-17 13:24:46.000000", posicionLat: "30", posicionLng: "30", dato:"85"};

        request.post({url: PUERTO_IP+"/postMedicion", headers: {"User-Agent" : "PabloEnguixLlopis", "Content-Type" : "application/json"}, body: JSON.stringify(medicion)}, function(err, res, carga) {
            assert.equal(err, null, "¿Ha habido un error?");
            assert.equal(res.statusCode, 201, "¿No ha mandado un 201 OK?");

            hecho();
        });
    });
});