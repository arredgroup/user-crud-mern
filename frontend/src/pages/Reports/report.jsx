import React, { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut } from '../../services/check.service';

;

function Report() {
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [nombreCompleto, setNombreCompleto] = useState("");

    // Varaibles m.D
    const [marcaciones, setMarcaciones] = useState([]);
    const [diasTrabajados, setDiasTrabajados] = useState(0);
    const [Dias8Horas, setDias8Horas] = useState(0);
    const [horasExtras, setHorasExtras] = useState(0);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
            setNombreCompleto((response.data.nombre) + " " + (response.data.apellido_paterno) + " " + (response.data.apellido_materno));
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
            const horas = time / (1000 * 60 * 60);
            return total + Math.max(0, horas - 8);
        }, 0);

        setHorasExtras(horasExtras);
    }, [marcaciones]);

    return (
        <div className='text-center'>
            <h1>Prueba pagina reportes</h1>
            <div className="form-group">

                <label className='bold-text'>Rut: </label>
                <input type="text" className="form-control bold-text" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>

            </div>

            {usuario ?

                <div className='text-center'>
                    <h2>Usuario: {nombreCompleto} </h2>
                    <div className='d-flex justify-content-center'>
                        <Table id="Tabla_report" striped bordered hover className="w-50 table-sm  text-center rounded mt-4">

                            <tr>
                                <th>Días trabajados:</th>
                                <td>{diasTrabajados}</td>
                            </tr>
                            <tr>
                                <th>Días trabajados menos de 8 horas:</th>
                                <td>{Dias8Horas}</td>
                            </tr>
                            <tr>
                                <th>Horas extras:</th>
                                <td>{horasExtras}</td>
                            </tr>

                        </Table>
                    </div>
                </div>
                : <h2>Sin Resultados</h2>}
        </div>
    );
}

export default Report;
