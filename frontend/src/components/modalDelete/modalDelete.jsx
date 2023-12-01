import React from 'react';
import Modal from "react-bootstrap/Modal";
import { deleteUser } from '../../services/user.service';

const ModalDelete = (props) => {
    const { rut, showingModal, closeModal } = props;

    const hideModal = () => {
        closeModal();
    };

    const handleDelete = () => {
        deleteUser(rut);
        hideModal();
    }

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Eliminar Usuario {rut}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Está seguro de eliminar al usuario rut {rut}, esta acción no se puede deshacer</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={() => handleDelete()}>Eliminar</button>
            </Modal.Footer>
        </Modal>
    )
}

    export default ModalDelete;