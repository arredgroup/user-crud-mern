import React, {useEffect, useState } from 'react';
import { getUsers } from '../../services/user.service';

const UserList = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await getUsers();
        console.log("response", response);
        setUsers(response.data);
    }

    return (
        <div>
            <h1>Lista de Usuarios <button className="btn btn-outline-success"><i className="bi bi-person-plus"></i></button></h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Fecha Nacimiento</th>
                        <th>Fecha Contratación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.rut}>
                            <td>{user.rut}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido_paterno}</td>
                            <td>{user.apellido_materno}</td>
                            <td>{user.fecha_nacimiento}</td>
                            <td>{user.fecha_contratacion}</td>
                            <td>
                                <button className="btn btn-outline-info"><i className="bi bi-eye"></i></button>
                                <button className="btn btn-outline-warning"><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-outline-danger"><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;