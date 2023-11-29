import React, { useState,useEffect } from 'react';
import {Button} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut } from '../../services/check.service';
import moment from 'moment';

const Report = () => {
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [marcaciones, setMarcaciones] = useState([]);
    const [menos8Horas, setMenos8Horas] = useState(0);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
        searchCheckByRut(rut).then(response => {
            setMarcaciones(response.data);
        });
    }

    const diasTrabajados = marcaciones.reduce((contador, marcador) => {
        if (!contador.includes(marcador.fecha)) {
            contador.push(marcador.fecha);
        }
        return contador;
    }, []).length;

    useEffect(() => {
        const marcacionesPorFecha = marcaciones.reduce((contador, marcador) => {
            const fecha = marcador.fecha;
            if (!contador[fecha]) {
                contador[fecha] = [];
            }
            contador[fecha].push(marcador);
            return contador;
        }, {});
    
        const horasPorFecha = {};
        for (const fecha in marcacionesPorFecha) {
            const marcacionesDelDia = marcacionesPorFecha[fecha];
            const entrada = marcacionesDelDia.find(marcador => marcador.tipo === 1);
            const salida = marcacionesDelDia.find(marcador => marcador.tipo === 2);
            if (entrada && salida) {
                const horaEntrada = moment(entrada.hora, 'HH:mm:ss');
                const horaSalida = moment(salida.hora, 'HH:mm:ss');
                const horas = horaSalida.diff(horaEntrada, 'hours');
                horasPorFecha[fecha] = horas;
            }
        }
    
        const menos8Horas = Object.values(horasPorFecha).filter(horas => horas < 8).length;
        setMenos8Horas(menos8Horas);

    }, [marcaciones]);

    return (
        <div>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>{
                usuario ?
                    <div>
                        <h1>Reporte</h1>
                        <p>Días trabajados: {diasTrabajados}</p>
                        <p>Dias en que trabajó menos de ocho horas: {menos8Horas}</p>
                    </div>
                    : <h2>Sin Resultados</h2>
                }
        </div>
    );
}

export default Report;