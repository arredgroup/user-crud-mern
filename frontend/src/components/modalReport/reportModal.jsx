import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label } from "recharts";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ReportModal = ({ data, showingModal, closeModal }) => {
  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <Modal show={showingModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>Reporte</Modal.Header>
      <Modal.Body>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
              <Label value="Reporte" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Valor" barSize={20} isAnimationActive={true} />
          </BarChart>
        </ResponsiveContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ReportModal.propTypes = {
  data: PropTypes.array,
  showingModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ReportModal;