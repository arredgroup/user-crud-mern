import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const ReportModal = ({ data, showingModal, closeModal }) => {
    return (
        <Modal show={showingModal} onHide={closeModal}>
            <Modal.Header closeButton>Reporte</Modal.Header>
            <Modal.Body>
                <BarChart width={500} height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReportModal;