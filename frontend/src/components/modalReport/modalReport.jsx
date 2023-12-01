import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Table } from "react-bootstrap";
import axios from "axios";

const ModalReport = (props) => {
    const { user, showingModal, closeModal } = props;
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/check/report/${user.rut}`);
                console.log('Report Data from Server:', response.data);
    
                // Verificar la estructura exacta de los datos recibidos
                if (response.data && response.data.data) {
                    const parsedReportData = response.data.data;
                    console.log('Parsed Report Data:', parsedReportData);
                    setReportData(parsedReportData);
                    setError(null);
                } else {
                    // Si la estructura de los datos no es la esperada
                    setError('Formato de datos no válido.');
                }
            } catch (error) {
                console.error('Error fetching report data:', error);
                setError(error.message || 'Error al obtener el informe.');
            } finally {
                setLoading(false);
            }
        };
    
        if (showingModal && user) {
            fetchData();
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
                {loading ? (
                    <p>Cargando Reporte...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : reportData ? (
                    <>
                        <BarChart width={500} height={300} data={[reportData]}>
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                        <Table striped bordered hover>
                            <tbody>
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
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>
                    Volver
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalReport;
