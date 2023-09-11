
const createUser = (req, res) => {
    const user = {};
    user.nombre = req.body.nombre;
    user.apellido = req.body.apellido;
    user.fecha_nacimiento = req.body.fecha_nacimiento;
    user.pais = req.body.pais;
    user.estado = "CREADO CORRECTAMENTE";
    res.send(user);
}

const readUsers = (req, res) => {
    const users = [];
    users.push({ nombre: "Juan", apellido: "Perez", fecha_nacimiento: "1980-01-01", pais: "Argentina", estado: "CREADO CORRECTAMENTE" });
    users.push({ nombre: "Pedro", apellido: "Gomez", fecha_nacimiento: "1985-01-01", pais: "Mexico", estado: "CREADO CORRECTAMENTE" });
    users.push({ nombre: "Maria", apellido: "Lopez", fecha_nacimiento: "1990-01-01", pais: "Brasil", estado: "CREADO CORRECTAMENTE" });
    res.send(users);
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const user = { nombre: "Juan", apellido: "Perez", fecha_nacimiento: "1980-01-01", pais: "Argentina", estado: "CREADO CORRECTAMENTE" };
    user.nombre = req.body.nombre || user.nombre;
    user.apellido = req.body.apellido || user.apellido;
    user.fecha_nacimiento = req.body.fecha_nacimiento || user.fecha_nacimiento;
    user.pais = req.body.pais  || user.pais;
    user.estado = "ACTUALIZADO CORRECTAMENTE";
    user.id = id;
    res.send(user);
}
const deleteUser = (req, res) => {
    const id = req.params.id;
    res.send(`Usuario ${id} eliminado correctamente`);
}


module.exports = {
    createUser,
    readUsers,
    updateUser,
    deleteUser
}