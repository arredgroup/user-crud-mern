import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ReportModal = ({ data, showingModal, closeModal }) => {
  const ref = useRef();

  useEffect(() => {
    if (data && showingModal) {
      const svg = d3.select(ref.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const y = d3.scaleLinear().range([height, 0]);

      svg.select("g").remove();

      const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(data.map((d) => d.name));
      y.domain([0, d3.max(data, (d) => d.value)]);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      g.append("g").call(d3.axisLeft(y));

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .attr("fill", "#8884d8");
    }
  }, [data, showingModal]);

  return (
    <Modal show={showingModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>Reporte</Modal.Header>
      <Modal.Body>
        <svg width={500} height={300} ref={ref}></svg>
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

