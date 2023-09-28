const db = require("../models/mongodb");
const User = db.user;

const createUser = (req, res) => {
    const user = {};
    user.rut = req.body.rut;
    user.nombre = req.body.nombre;
    user.apellido_paterno = req.body.apellido_paterno;
    user.apellido_materno = req.body.apellido_materno;
    user.fecha_nacimiento = req.body.fecha_nacimiento;
    user.fecha_contratacion = req.body.fecha_contratacion;

    let userModel = new User(user);

    userModel.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(user);
    });
}

const readUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(users);
    });
}

const getUserByName = (req, res) => {
    const nombre = req.params.nombre;
    User.findOne({ nombre: nombre }, (err, users) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(users);
    });
}

const getUserByRut = (req, res) => {
    const rut = req.params.rut;
    User.findOne({ rut: rut }, (err, users) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(users);
    });
}

const updateUser = async (req, res) => {
    const rut = req.params.rut;
    const isUser = await User.findOne({ rut: rut }, (err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return null;
        }
        return user;
    });

    if(isUser == null){
        res.status(500).send({message: "No se encontro el usuario"});
        return;
    }
    let user = {};
    user.nombre = req.body.nombre || isUser.nombre;
    user.apellido_paterno = req.body.apellido_paterno || isUser.apellido_paterno;
    user.apellido_materno = req.body.apellido_materno || isUser.apellido_materno;
    user.fecha_nacimiento = req.body.fecha_nacimiento || isUser.fecha_nacimiento;
    user.fecha_contratacion = req.body.fecha_contratacion || isUser.fecha_contratacion;
    User.updateOne({ rut: rut }, user, (err, result) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send(result);
    });
}

const deleteUser = (req, res) => {
    const rut = req.params.rut;
    User.deleteOne({ rut: rut }, (err, result) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send(result);
    });
}


module.exports = {
    createUser,
    readUsers,
    getUserByName,
    getUserByRut,
    updateUser,
    deleteUser
}