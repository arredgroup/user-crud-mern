'use strict';
const { Sequelize, DataTypes } = require('sequelize');

class SequelizeConnection {

    static sequelize = null;

    static getInstance(){
        if(!SequelizeConnection.sequelize) {
            SequelizeConnection.sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
                dialect:'postgres',
                host: process.env.POSTGRES_HOST,
                port: 5432,
            });
            SequelizeConnection.sequelize.define('Historial', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                fecha: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                ruta: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },{
                timestamps: true
            });
        }
        return SequelizeConnection.sequelize;
    }


}

module.exports = SequelizeConnection;