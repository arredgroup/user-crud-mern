const HistorialController = require('../controllers/historial.controller');
const historialMiddleware = (req, res, next) => {
    HistorialController.saveHistorial(req);
    next();
}

module.exports = historialMiddleware;