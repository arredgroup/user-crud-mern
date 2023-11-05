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

module.exports = {
    createCheck
}