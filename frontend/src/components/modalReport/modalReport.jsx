import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";
//import { getAllChecksByRut } from '../../services/check.service';
import { getReportData } from "../../../../controllers/check.controller";

const ModalReport = (props) => {
    const { user, showingModal, closeModal } = props;
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        if (showingModal && user) {
            // Llama a la función getReportData aquí
            getReportData(user.rut)
                .then(response => {
                    // Maneja la respuesta y actualiza el estado según sea necesario
                    const reportData = response.data;
                    setReportData(reportData);
                })
                .catch(error => console.error(error));
        }
    }, [showingModal, user]);

    const hideModal = () => {
        closeModal();
    };

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Reporte de Asistencia y Horas Laborales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {reportData ? (
                    <Table striped bordered hover>
                        <tr>
                            <th>Días Trabajados</th>
                            <td>{reportData.daysWorked}</td>
                        </tr>
                        <tr>
                            <th>Días Menos De Ocho Horas</th>
                            <td>{reportData.daysLessThan8Hours}</td>
                        </tr>
                        <tr>
                            <th>Horas Extras</th>
                            <td>{reportData.extraHoursWorked}</td>
                        </tr>
                    </Table>
                ) : (
                    <p>Cargando Reporte...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalReport;
