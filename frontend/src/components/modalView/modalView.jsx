import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";

const ModalView = (props) => {
    const { user, showingModal, closeModal } = props;

    const hideModal = () => {
        closeModal();
    };

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tr>
                        <th>Rut</th>
                        <td>{user.rut}</td>
                    </tr>
                    <tr>
                        <th>Nombre</th>
                        <td>{user.nombre}</td>
                    </tr>
                    <tr>
                        <th>Apellido Paterno</th>
                        <td>{user.apellido_paterno}</td>
                    </tr>
                    <tr>
                        <th>Apellido Materno</th>
                        <td>{user.apellido_materno}</td>
                    </tr>
                    <tr>
                        <th>Fecha Nacimiento</th>
                        <td>{user.fecha_nacimiento}</td>
                    </tr>
                    <tr>
                        <th>Fecha Contratación</th>
                        <td>{user.fecha_contratacion}</td>
                    </tr>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalView;