import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";

const ReportView = (props) => {
    const { usuario, showingReport, closeReport } = props;

    const hideReport = () => {
        closeReport();
    };

    return (
        <Modal show={showingReport} onHide={hideReport}>
            <Modal.Header>
                <Modal.Title>Reporte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tr>
                        <th>Rut</th>
                        <td>{usuario.rut}</td>
                    </tr>
                    <tr>
                        <th>Nombre</th>
                        <td>{usuario.nombre} {usuario.apellido_paterno}</td>
                    </tr>
                    <tr>
                        <th>Fecha Contratación</th>
                        <td>{usuario.fecha_contratacion}</td>
                    </tr>
                    <tr>
                        <th>Dias Trabajados</th>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <th>Horas extras trabajadas</th>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <th>Dias de jornada incompleta</th>
                        <td>{}</td>
                    </tr>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideReport}>Volver</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReportView;