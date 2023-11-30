const db = require("../models/mongodb");
const Check = db.check;

const createCheck = (req, res) => {
    const check = {};
    check.rut = req.body.rut;
    check.fecha = req.body.fecha;
    check.hora = req.body.hora;
    check.tipo = req.body.tipo;

    let checkModel = new Check(check);

    checkModel.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(user);
    });
}

const searchCheckByRut = (req, res) => {
    const rut = req.params.rut;
    Check.find({ rut: rut }, (err, checks) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(checks);
    });
}

const deleteCheck = (req, res) => {
    const fecha = req.query.fecha;
    const hora = req.query.hora;
    Check.deleteOne({ fecha: fecha, hora: hora }, (err, checks) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(checks);
    });
}

module.exports = {
    createCheck,
    searchCheckByRut,
    deleteCheck,
}