const UserService = require('../services/user.service');

const createUser = async (req, res) => {
    const service = UserService.getInstance();
    const response = await service.createUser(req.body);
    res.code(response.code).send(response.data);
}

const readUsers = async (req, res) => {
    const service = UserService.getInstance();
    const response = await service.listUsers();
    res.code(response.code).send(response.data);
}

const getUserByName = async (req, res) => {
    const service = UserService.getInstance();
    const response = await service.getUserByName(req.params.name);
    res.code(response.code).send(response.data);
}

const getUserByRut = async (req, res) => {
    const service = UserService.getInstance();
    const response = await service.getUserByRut(req.params.rut);
    res.code(response.code).send(response.data);
}

const updateUser = async (req, res) => {
    const service = UserService.getInstance();
    const response = await service.updateUser(req.params.rut, req.body);
    res.code(response.code).send(response.data);
}

const deleteUser = async (req, res) => {
    const service = UserService.getInstance();
    const response = await service.deleteUser(req.params.rut);
    res.code(response.code).send(response.data);
}


module.exports = {
    createUser,
    readUsers,
    getUserByName,
    getUserByRut,
    updateUser,
    deleteUser
}