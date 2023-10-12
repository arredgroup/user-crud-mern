

const db = require("../models/mongodb");
const User = db.user;

export default class UserService {

    private static userService = null;

    constructor() {
    }

    static getInstance() {
        if(this.userService === null){
            this.userService = new UserService();
        }
        return this.userService;
    }

    async createUser(body){
        const user = {};
        user.rut = body.rut;
        user.nombre = body.nombre;
        user.apellido_paterno = body.apellido_paterno;
        user.apellido_materno = body.apellido_materno;
        user.fecha_nacimiento = body.fecha_nacimiento;
        user.fecha_contratacion = body.fecha_contratacion;
        let userModel = new User(user);
        await userModel.save();
        return {
            code: 200,
            message: "Usuario Creado correctamente",
            data: user
        }
    }

    async listUsers(){
        let users = await User.find();
        return {
            code: 200,
            message: "Usuarios listados correctamente",
            data: users
        }
    }

    async getUserByName (name){
        let user = await User.find({nombre: name});
        return {
            code: 200,
            message: "Usuario listado correctamente",
            data: user
        }
    }

    async getUserByRut (rut){
        let user = await User.find({rut: rut});
        return {
            code: 200,
            message: "Usuario listado correctamente",
            data: user
        }
    }

    async updateUser (rut, body) {
        const isUser = await User.findOne({ rut: rut });
        if(isUser == null){
            return {
                code: 500,
                message: "No se encontro el usuario",
                data: null
            }
        }
        let user = {};
        user.nombre = body.nombre || isUser.nombre;
        user.apellido_paterno = body.apellido_paterno || isUser.apellido_paterno;
        user.apellido_materno = body.apellido_materno || isUser.apellido_materno;
        user.fecha_nacimiento = body.fecha_nacimiento || isUser.fecha_nacimiento;
        user.fecha_contratacion = body.fecha_contratacion || isUser.fecha_contratacion;
        await User.updateOne({ rut: rut }, user);
        return {
            code: 200,
            message: "Usuario actualizado correctamente",
            data: user
        }
    }

    async deleteUser (rut) {
        await User.deleteOne({ rut: rut });
        return {
            code: 200,
            message: "Usuario eliminado correctamente",
            data: null
        }
    }

}