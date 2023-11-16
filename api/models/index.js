'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

class SequelizeConnection {

    static sequelize = null;
    //static models = {};

    static getInstance(){
        if(!SequelizeConnection.sequelize) {
            SequelizeConnection.sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
                dialect:'postgres',
                host: process.env.POSTGRES_HOST,
                port: 5432,
            });
        }
        fs
            .readdirSync(__dirname)
            .filter(file => {
                return (
                    file.indexOf('.') !== 0 &&
                    file !== basename &&
                    file.slice(-3) === '.js' &&
                    file.indexOf('.test.js') === -1
                );
            })
            .forEach(file => {
                const model = require(path.join(__dirname, file))(SequelizeConnection.sequelize, DataTypes);
                //SequelizeConnection.models[model.name] = model;
            });
        return SequelizeConnection.sequelize;
    }

}

module.exports = SequelizeConnection;