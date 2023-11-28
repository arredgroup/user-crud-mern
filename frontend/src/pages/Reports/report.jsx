import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut } from '../../services/check.service';

;

function Report() {
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);

    // Varaibles m.D
    const [marcaciones, setMarcaciones] = useState([]);
    const [diasTrabajados, setDiasTrabajados] = useState(0);
    const [Dias8Horas, setDias8Horas] = useState(0);
    const [horasExtras, setHorasExtras] = useState(0);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
        searchCheckByRut(rut).then(response => {
            setMarcaciones(response.data);
            console.log(response.data);
        });
    }


    // useEffect para calcular los dias trabajados sin importat las horas
    useEffect(() => {
        const Dias = marcaciones.reduce((dates, marcacion) => {
            const [day, month, year] = marcacion.fecha.split("-");
            const date = new Date(`${month}/${day}/${year}`).toLocaleDateString();
            console.log(date);
            return dates.add(date);
        }, new Set());

        setDiasTrabajados(Dias.size);
    }, [marcaciones]);


    // useEffect para calcular los dias trabajados con menos de 8 horas
    useEffect(() => {
        const marcacionesPorFecha = marcaciones.reduce((acc, marcacion) => {
            const [day, month, year] = marcacion.fecha.split("-");
            const date = new Date(`${year}-${month}-${day}`);
            const time = new Date(`1970-01-01T${marcacion.hora}Z`).getTime();
            console.log(time)
            console.log(date)


            if (!acc[date]) {
                acc[date] = time;
            } else {
                acc[date] = Math.abs(acc[date] - time);
            }

            return acc;
        }, {});

        const Dias8Horas = Object.values(marcacionesPorFecha).filter(time => time < 8 * 60 * 60 * 1000).length;

        setDias8Horas(Dias8Horas);
    }, [marcaciones]);

    // useEffect para calcular las horas extras trabajadas
    useEffect(() => {
        const horasPorFecha = marcaciones.reduce((cont, marcacion) => {
            const [day, month, year] = marcacion.fecha.split("-");
            const date = new Date(`${year}-${month}-${day}`);
            const time = new Date(`1970-01-01T${marcacion.hora}Z`).getTime();

            if (!cont[date]) {
                cont[date] = time;
            } else {
                cont[date] = Math.abs(cont[date] - time);
            }

            return cont;
        }, {});

        const horasExtras = Object.values(horasPorFecha).reduce((total, time) => {
            const horas = time / (60 * 60 * 1000);
            return total + Math.max(0, horas - 8);
        }, 0);

        setHorasExtras(horasExtras);
    }, [marcaciones]);

    return (
        <div>
            <h1>Prueba pagina reportes</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>

            {usuario ?
                <div>
                    <h1>Días trabajados: {diasTrabajados} </h1>
                    <h2>Días trabajados menos de 8 horas: {Dias8Horas}</h2>
                    <h2>Horas extras: {horasExtras}</h2>
                </div> : <h2>Sin Resultados</h2>}
        </div>
    );
}

export default Report;
