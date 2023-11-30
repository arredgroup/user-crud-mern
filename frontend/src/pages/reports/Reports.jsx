import React, { useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut } from '../../services/check.service';

const Reports = () => {
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [marcaciones, setMarcaciones] = useState(null);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
        searchCheckByRut(rut).then(response => {
            setMarcaciones(response.data);
        });
    }

    let diasTrabajados = 0;
    let diasMenosDeOchoHoras = 0;
    let horasExtras = 0;

    // Agrupar las marcaciones por fecha
    if (marcaciones) {
        const grouped = marcaciones.reduce((acc, curr) => {
            const date = curr.fecha;
            if (!acc[date]) {
                acc[date] = { entradas: [], salidas: [] };
            }
            if (curr.tipo === 1) {
                acc[date].entradas.push(curr);
            } else if (curr.tipo === 2) {
                acc[date].salidas.push(curr);
            }
            return acc;
        }, {});

        // Recorrer los grupos de marcaciones por fecha
        // y calcular las horas trabajadas por día
        Object.keys(grouped).forEach(date => {
            const entradas = grouped[date].entradas.sort((a, b) => new Date(`1970-01-01T${a.hora}Z`) - new Date(`1970-01-01T${b.hora}Z`));
            const salidas = grouped[date].salidas.sort((a, b) => new Date(`1970-01-01T${a.hora}Z`) - new Date(`1970-01-01T${b.hora}Z`));
            let totalHours = 0;
            for (let i = 0; i < entradas.length && i < salidas.length; i++) {
                const entrada = new Date(`1970-01-01T${entradas[i].hora}Z`);
                const salida = new Date(`1970-01-01T${salidas[i].hora}Z`);
                const hours = (salida - entrada) / 1000 / 60 / 60;
                totalHours += hours;
                // Contar las horas extras trabajadas
                if (hours > 8) {
                    horasExtras += hours - 8;
                }
            }
            if (totalHours < 8) {
                diasMenosDeOchoHoras++;
            }
        });

        // Recorrer los grupos de marcaciones por fecha
        // y contar los días que trabajó
        Object.keys(grouped).forEach(date => {
            const entradas = grouped[date].entradas;
            const salidas = grouped[date].salidas;
            if (entradas.length === 1 && salidas.length === 1) {
                diasTrabajados++;
            }
        });
    }

    //const entradas = marcaciones ? marcaciones.filter(marcacion => marcacion.tipo == 1).length : 0;
    //const salidas = marcaciones ? marcaciones.filter(marcacion => marcacion.tipo == 2).length : 0;

    return (
        <div>
            <h1>Reportes</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>
            {marcaciones && usuario && (
                marcaciones.length > 0 ? (
                    <div>
                        <Table>
                            <tr>
                                <th>Rut</th>
                                <th>Nombre</th>
                                <th>Fecha contratación</th>
                                <th>Cantidad de días trabajados</th>
                                <th>Días trabajados menos de 8 horas</th>
                                <th>Cantidad de horas extras total</th>
                            </tr>
                            <tr>
                                <td>{usuario.rut}</td>
                                <td>{usuario.nombre} {usuario.apellido_paterno}</td>
                                <td>{usuario.fecha_contratacion}</td>
                                <td>{diasTrabajados}</td>
                                <td>{diasMenosDeOchoHoras}</td>
                                <td>{horasExtras}</td>
                            </tr>
                        </Table>
                    </div>
            ) : (
                    <div>
                        <p>Sin marcaciones</p>
                    </div>
                )
            )}
        </div>
    )
}

export default Reports;