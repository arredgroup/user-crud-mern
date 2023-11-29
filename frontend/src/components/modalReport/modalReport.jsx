import React from 'react';
import Modal from "react-bootstrap/Modal";
// import { Table } from "react-bootstrap";

const ModalView = (props) => {
    const { user, showingModal, closeModal } = props;

    const hideModal = () => {
        closeModal();
    };

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Reporte de Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                AQUÍ LA INFORMACIÓN ({user.rut})
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalView;