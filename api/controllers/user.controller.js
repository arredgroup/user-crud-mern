const db = require("../models/mongodb");
const User = db.user;

const createUser = (req, res) => {
    const user = {};
    user.id = Math.random()%100;
    user.nombre = req.body.nombre;
    user.apellido = req.body.apellido;
    user.fecha_nacimiento = req.body.fecha_nacimiento;
    user.pais = req.body.pais;
    user.estado = "CREADO CORRECTAMENTE";

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

const updateUser = async (req, res) => {
    const nombre = req.params.nombre;
    const isUser = await User.findOne({ nombre: nombre }, (err, user) => {
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
    user.apellido = req.body.apellido || isUser.apellido;
    user.fecha_nacimiento = req.body.fecha_nacimiento || isUser.fecha_nacimiento;
    user.pais = req.body.pais || isUser.pais;
    user.estado = "ACTUALIZADO CORRECTAMENTE";
    User.updateOne({ nombre: nombre }, user, (err, result) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send(result);
    });
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    User.deleteOne({ id: id }, (err, result) => {
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
    updateUser,
    deleteUser
}