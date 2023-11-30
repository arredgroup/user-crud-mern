import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";
import { searchCheckByRut } from '../../services/check.service';

const ModalView = (props) => {
    const { user, showingModal, closeModal } = props;
    const [workedDaysData, setWorkedDaysData] = useState([])

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
        let dias_trabajados = []
        let dias_menos_trabajados = [];
        let dias_horas_extra = [];
        let horas_extra = 0;

        entradas.map(elemento => {
            let dia = data.filter(el => elemento.fecha === el.fecha);
            dias_trabajados.push(dia);

            if(dia.length < 2){
                dias_menos_trabajados.push(dia);
            } else {
                let fecha1 = new Date(dia[0].fecha + " " + dia[0].hora);
                let fecha2 = new Date(dia[1].fecha + " " + dia[1].hora);

                let segundos = Math.floor((fecha2 - fecha1) / 1000);
                let minutos = Math.floor(segundos / 60);
                let horas = Math.floor(minutos / 60);

                if(horas < 8) {
                    dias_menos_trabajados.push(dia);
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

        setWorkedDaysLess(dias_menos_trabajados.length);
        setExtraHours(horas_extra);
        setWorkedDaysData(dias_trabajados);

        console.log(dias_trabajados)
    };

    const localeDate = (fecha) => {
        let fecha_ = new Date(fecha);
        return fecha_.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
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
        <Modal show={showingModal} onHide={hideModal} size="lg">
            <Modal.Header>
                <Modal.Title>Reporte de Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Usuario RUT {user.rut}</p>
                <p>Días trabajados: {workedDays} días</p>

                <p>Días con menos de 8 horas trabajadas: {workedDaysLess} días</p>
                <p>Horas extra trabajadas: {extraHours} horas</p>
                <Table striped bordered hover size="sm">
                    <tr>
                        <th>Día</th>
                        <th>Hora de entrada</th>
                        <th>Hora de salida</th>
                    </tr>
                    
                    {workedDaysData.map((elemento, indice) => {
                        return <tr key={elemento[0].fecha + indice}>
                        <td>{localeDate(elemento[0].fecha)}</td>
                        <td>{elemento[0].hora}</td>
                        <td>{elemento[1] ? elemento[1].hora: '---'}</td>
                        </tr>
                    })}
                        
                    
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalView;