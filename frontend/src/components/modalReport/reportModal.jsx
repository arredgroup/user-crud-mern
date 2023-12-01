import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from "victory";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ReportModal = ({ data, showingModal, closeModal }) => {
  return (
    <Modal show={showingModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>Reporte</Modal.Header>
      <Modal.Body>
        <VictoryChart domainPadding={20}>
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={data}
            x="name"
            y="value"
            style={{ data: { fill: "#8884d8" } }}
            labels={({ datum }) => `value: ${datum.value}`}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
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
