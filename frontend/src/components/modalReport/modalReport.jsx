import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import Table from "react-bootstrap/Table";

const ReportModal = ({ data, showingModal, closeModal }) => {
  return (
    <Modal show={showingModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>Reporte</Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column mb-3">
          <div className="mb-3">
            <h5>Gráfico</h5>
            <BarChart width={600} height={300} data={data} margin={{ right: 30 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="diasTrabajados" fill="#669966" />
              <Bar dataKey="diasMenos8Horas" fill="#CCCCFF" />
              <Bar dataKey="horasExtras" fill="#ffc658" />
            </BarChart>
          </div>
          <div>
            <h5>Datos</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Días Trabajados</th>
                  <th>Días Menores a 8 horas</th>
                  <th>Horas extras</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.diasTrabajados}</td>
                    <td>{item.diasMenos8Horas}</td>
                    <td>{item.horasExtras}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
