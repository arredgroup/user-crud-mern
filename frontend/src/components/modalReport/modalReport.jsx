import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
// import { Table } from "react-bootstrap";
import { searchCheckByRut } from '../../services/check.service';

const ModalView = (props) => {
    const { user, showingModal, closeModal } = props;
    const [reportData, setReportData] = useState([]);

    // Cantidad de días trabajados 
    const [workedDays, setWorkedDays] = useState("");

    // Días en que el usuario trabajó menos de ocho horas
    const [workedDaysLess, setWorkedDaysLess] = useState("");

    // Cantidad de horas extras trabajadas
    const [extraHours, setExtraHours] = useState("");

    const hideModal = () => {
        closeModal();
    };

    const countWorkedDays = (data) => {
        let fechas = [];
        data.forEach((el) => {
            if(!fechas.includes(el.fecha)){
                fechas.push(el.fecha)
            }
        });

        setWorkedDays(fechas.length)
    };

    useEffect(() => {
        if(showingModal) {
            searchCheckByRut(user.rut).then((response)=>{
                console.log(response.data.length);
                countWorkedDays(response.data);
            }).catch((error)=>{
                console.error(error);
            });
        }
    }, [user.rut])

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Reporte de Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Usuario RUT: {user.rut}</p>
                <p>Dias trabajados: {workedDays} Dias</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalView;