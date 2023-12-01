import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Table, Tag } from "antd"; 

const { Column } = Table;

const ReportModal = ({ data, showingModal, closeModal }) => {
  return (
    <Modal show={showingModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>Reporte</Modal.Header>
      <Modal.Body>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

        <Table dataSource={data}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Value" dataIndex="value" key="value" />
        </Table>
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
