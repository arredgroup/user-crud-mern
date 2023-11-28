import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";

const ModalReport = (props) => {
    const { user, diasTrabajados, diasMenosDeOchoHoras, horasExtras, showingModal, closeModal } = props;

    const hideModal = () => {
        closeModal();
    };

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Reporte de Asistencia y Horas Laborales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tr>
                        <th>Fecha Contratación</th>
                        <td>{user.fecha_contratacion}</td>
                    </tr>
                    <tr>
                        <th>Días Trabajados</th>
                        <td>{diasTrabajados}</td>
                    </tr>
                    <tr>
                        <th>Días Menos De Ocho Horas</th>
                        <td>{diasMenosDeOchoHoras}</td>
                    </tr>
                    <tr>
                        <th>Horas Extras</th>
                        <td>{horasExtras}</td>
                    </tr>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalReport;