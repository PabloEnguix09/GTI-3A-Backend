const sequelize = require("sequelize");
const { DataTypes, Sequelize } = require("sequelize");
const { OP } = require("sequelize");

module.exports = class Logica {

    constructor(base, user, host, port, dialect) {
        this.laConexion = new Sequelize(base, user, "", {
            host: host,
            port: port,
            dialect: dialect,
        });
    }

    cargarModeloMedicion() {
return this.laConexion.define("Medicion", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idSensor: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    fecha: {
        type: 'DATETIME',
        allowNull: false
    },
    posicionLat: {
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    posicionLng: {
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    dato: {
        type: DataTypes.FLOAT,
        allowNull:false
    }
})
    }
}