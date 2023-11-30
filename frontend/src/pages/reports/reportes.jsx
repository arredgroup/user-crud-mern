import React, { useState } from 'react';
import {Button, Table} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut } from '../../services/check.service';
import { useNavigate } from 'react-router-dom';

const Reportes = () => {
    const navigate = useNavigate();
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [marcaciones, setMarcaciones] = useState([]);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data); 
        })
        searchCheckByRut(rut).then(response => {
            setMarcaciones(response.data);
        })
    }

    const handlePages = (page) => {
        if(page === "checkin") {
            navigate("/checkin");
        }
    }
    const calcularDiasTrabajados = (marcaciones) => {
        const fechasUnicas = new Set();
        for (let i = 0; i < marcaciones.length; i++) {
            const fecha = marcaciones[i].fecha;
            fechasUnicas.add(fecha);
        }
        return fechasUnicas.size;
    }
    const calcular8 = (marcaciones) => {
        let diasMenos8 = 0;
        for (let i = 0; i < marcaciones.length; i += 2) {
            if (i + 1 < marcaciones.length) {
                const entrada = new Date(marcaciones[i].fecha + ' ' + marcaciones[i].hora).getTime();
                const salida = new Date(marcaciones[i + 1].fecha + ' ' + marcaciones[i + 1].hora).getTime();
                const diferenciaHoras = (salida - entrada) / (1000 * 60 * 60);
                if (diferenciaHoras < 8) {
                    diasMenos8++;
                }
            }
        }
        return diasMenos8;
    }
    return (
        <div>
            <h1>
                <span style={{ marginRight: '10px' }}>Reporte de los Trabajadores </span>
                <button className="btn btn-outline-primary" onClick={() => handlePages("checkin")}><i className="bi bi-check2-circle"></i></button>
            </h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>
            {usuario ? (
                <div>
                    <h2>Usuario</h2>
                    <Table>
                        <tr>
                            <th>Rut</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha Nacimiento</th>
                            <th>Fecha Contratación</th>
                        </tr>
                        <tr>
                            <td>{usuario.rut}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido_paterno}</td>
                            <td>{usuario.apellido_materno}</td>
                            <td>{usuario.fecha_nacimiento}</td>
                            <td>{usuario.fecha_contratacion}</td>
                        </tr>
                    </Table>
                    <h2>Reportes del Trabajador </h2>
                    <Table>
                        <tr>
                            <th>Total de Días Trabajados</th>
                            <th>Total de Días en los que se Trabajó Menos de 8 Horas</th>
                        </tr>
                        <tr>
                            <td>{calcularDiasTrabajados(marcaciones)}</td>
                            <td>{calcular8(marcaciones)}</td>
                        </tr>
                    </Table>
                </div>
            ) : null}
        </div>
    )
}

export default Reportes;
