const Sequelize = require('../models');

const saveHistorial = async (req) => {
    const connection = Sequelize.getInstance();
    const Historial = connection.models.Historial;
    return await Historial.create({
        fecha: new Date().toISOString(),
        ruta: req.path,
        metodoHttp: req.method,
    });
}


module.exports = {
    saveHistorial,
}
