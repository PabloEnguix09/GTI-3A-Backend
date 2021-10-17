const sequelize = require("sequelize");
const { DataTypes, Sequelize } = require("sequelize");
const { OP } = require("sequelize");

module.exports = class Logica {

    constructor(base, usuario, host, puerto, dialecto) {

        this.conexion = new Sequelize(base, usuario, null, {
            host: host,
            port: puerto,
            dialect: dialecto
        });
    }

cargarModeloMedicion() {
    return this.conexion.define("Medicion", {
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
            type: 'TIMESTAMP',
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
        },
    },
        {
            timestamps: false,
            freezeTableName: true
        });
}

    async postMedicion(Medicion, body) {
        await Medicion.create(body);
    }

    async getTodasMediciones(Medicion) {
        const mediciones = await Medicion.findAll();
        return mediciones;
    }

    async getUltimasMediciones(Medicion, cuantas) {
        const mediciones = await Medicion.findAll({
            order:[["fecha","DESC"]],
            limit: cuantas
        });
        return mediciones;
    }

    async testConexion() {
        try {
            await this.conexion.authenticate();
            console.log("Conexión establecida");
        } catch (error) {
            console.error("No se puede conectar con la base de datos: ", error);
        }
    }
}