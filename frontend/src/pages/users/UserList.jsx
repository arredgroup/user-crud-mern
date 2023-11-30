import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/user.service';
import ModalDelete from '../../components/modalDelete/modalDelete';
import ModalEdit from "../../components/modalEdit/modalEdit";
import ModalView from "../../components/modalView/modalView";

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const [userToUpdate, setUserToUpdate] = useState(false);
    const [userToView, setUserToView] = useState(false);

    const [rutToDelete, setRutToDelete] = useState('');
    const [showingDeleteModal, setShowingDeleteModal] = useState(false);
    const [showingUpdateModal, setShowingUpdateModal] = useState(false);
    const [showingViewModal, setShowingViewModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    }

    const handlePages = (page) => {
        if(page === "create-user") {
            navigate("/createUser");
        }
    }

    const handleDeleteConfirmation = (rut) => {
        setRutToDelete(rut);
        setShowingDeleteModal(true);
    }

    const handleUpdateUser = (user) => {
        setUserToUpdate(user);
        setShowingUpdateModal(true);
    }

    const handleViewUser = (user) => {
        setUserToView(user);
        setShowingViewModal(true);
    }

    return (
        <div>
            <h1>Lista de Usuarios <button className="btn btn-outline-success" onClick={() => handlePages("create-user")}><i className="bi bi-person-plus"></i></button></h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.rut}>
                            <td>{user.rut}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido_paterno}</td>
                            <td>
                                <button className="btn btn-outline-info" onClick={() => handleViewUser(user)}><i className="bi bi-eye"></i></button>
                                <button className="btn btn-outline-warning" onClick={() => handleUpdateUser(user)}><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-outline-danger" onClick={() => handleDeleteConfirmation(user.rut)}><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        ))}
                </tbody>
            </table>
            <ModalDelete
                rut={rutToDelete}
                showingModal={showingDeleteModal}
                closeModal={() => setShowingDeleteModal(false)}
            />
            <ModalEdit
                user={userToUpdate}
                showingModal={showingUpdateModal}
                closeModal={() => setShowingUpdateModal(false)}
            />
            <ModalView
                user={userToView}
                showingModal={showingViewModal}
                closeModal={() => setShowingViewModal(false)}
            />
        </div>
    );
}

export default UserList;