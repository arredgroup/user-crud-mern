import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
// import { Table } from "react-bootstrap";
import { searchCheckByRut } from '../../services/check.service';

const ModalView = (props) => {
    const { user, showingModal, closeModal } = props;

    // Cantidad de días trabajados 
    const [workedDays, setWorkedDays] = useState(0);

    // Días en que el usuario trabajó menos de ocho horas
    const [workedDaysLess, setWorkedDaysLess] = useState(0);

    // Cantidad de horas extras trabajadas
    const [extraHours, setExtraHours] = useState(0);

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

        setWorkedDays(fechas.length);
    };

    const countWorkedHours = (data) => {

        let entradas = data.filter(el => el.tipo === 1);
        let dias_trabajados = [];
        let dias_horas_extra = [];
        let horas_extra = 0;

        entradas.map(elemento => {
            let dia = data.filter(el => elemento.fecha === el.fecha);

            if(dia.length < 2){
                dias_trabajados.push(dia);
            } else {
                let fecha1 = new Date(dia[0].fecha + " " + dia[0].hora);
                let fecha2 = new Date(dia[1].fecha + " " + dia[1].hora);

                let segundos = Math.floor((fecha2 - fecha1) / 1000);
                let minutos = Math.floor(segundos / 60);
                let horas = Math.floor(minutos / 60);

                if(horas < 8) {
                    dias_trabajados.push(dia);
                } else {
                    let hrs_ext = horas - 8;
                    horas_extra += hrs_ext;
                    
                    dias_horas_extra.push(
                        {
                            'horas_extras': hrs_ext,
                            'dia': dia
                        }
                    );
                }
            }

        });

        setWorkedDaysLess(dias_trabajados.length);
        setExtraHours(horas_extra);

        console.log(dias_horas_extra)
    };

    useEffect(() => {
        if(showingModal) {
            searchCheckByRut(user.rut).then((response) => {
                countWorkedDays(response.data);
                countWorkedHours(response.data);
            }).catch((error)=>{
                console.error(error);
            });
        }
    }, [user.rut, showingModal])

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Reporte de Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Usuario RUT: {user.rut}</p>
                <p>Días trabajados: {workedDays} días</p>
                <p>Días con menos de 8 horas trabajadas: {workedDaysLess} días</p>
                <p>Horas extra trabajadas: {extraHours} horas</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalView;