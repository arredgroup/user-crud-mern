import React, { useState } from 'react';
import { Button } from "react-bootstrap";
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

    let diasMenosDeOchoHoras = 0;

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

        Object.keys(grouped).forEach(date => {
            const entradas = grouped[date].entradas.sort((a, b) => new Date(`1970-01-01T${a.hora}Z`) - new Date(`1970-01-01T${b.hora}Z`));
            const salidas = grouped[date].salidas.sort((a, b) => new Date(`1970-01-01T${a.hora}Z`) - new Date(`1970-01-01T${b.hora}Z`));
            let totalHours = 0;
            for (let i = 0; i < entradas.length && i < salidas.length; i++) {
                const entrada = new Date(`1970-01-01T${entradas[i].hora}Z`);
                const salida = new Date(`1970-01-01T${salidas[i].hora}Z`);
                const hours = (salida - entrada) / 1000 / 60 / 60;
                totalHours += hours;
            }
            if (totalHours < 8) {
                diasMenosDeOchoHoras++;
            }
        });
    }

    const entradas = marcaciones ? marcaciones.filter(marcacion => marcacion.tipo == 1).length : 0;
    const salidas = marcaciones ? marcaciones.filter(marcacion => marcacion.tipo == 2).length : 0;

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
                    <>
                        <p>{`Fecha de contratacion: ${usuario.fecha_contratacion}`}</p>
                        <p>{`Total de marcaciones: ${marcaciones.length}`}</p>
                        <p>{`Total de entradas: ${entradas}`}</p>
                        <p>{`Total de salidas: ${salidas}`}</p>
                        <p>{`Días trabajados menos de 8 horas: ${diasMenosDeOchoHoras}`}</p>
                    </>
            ) : (
                    <p>Sin marcaciones</p>
                )
            )}
        </div>
    )
}

export default Reports;