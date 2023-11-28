import React, { useState } from 'react';
import {Button, Table} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut } from '../../services/check.service';
import { useNavigate } from 'react-router-dom';
import ModalMarcacion from "../../components/modalMarcacion/modalMarcacion";

const Reports = () => {
    const navigate = useNavigate();
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [marcaciones, setMarcaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fecha] = useState(null);
    
    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
        searchCheckByRut(rut).then(response => {
            setMarcaciones(response.data);
        });
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

    const calcularMenos8 = (marcaciones) => {
        let diasMenos8 = 0;
        for (let i = 0; i < marcaciones.length; i += 2) {
            if (i + 1 < marcaciones.length) {
                const entrada = new Date(marcaciones[i].fecha + ' ' + marcaciones[i].hora);
                const salida = new Date(marcaciones[i + 1].fecha + ' ' + marcaciones[i + 1].hora);
                const diferenciaHoras = (salida - entrada) / (1000 * 60 * 60);
                if (diferenciaHoras <= 8) {
                    diasMenos8++;
                }
            }
        }
        return diasMenos8;
    }

    return (
        <div>
            <h1>
                Reporte de marcaciones de trabajadores
                <button className="btn btn-outline-primary" onClick={() => handlePages("checkin")}><i className="bi bi-check2-circle"></i></button>
            </h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>
            {usuario ? <div>
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
            </div> : <h2>Sin Resultados</h2> }
            {marcaciones.length!==0 ? <div>
                <div className="reporte">
                    <p>Días trabajados: {calcularDiasTrabajados(marcaciones)}</p>
                </div>
                <div className="dias-menos-o-igual-a-8-horas">
                    <p>Días trabajados menos de 8 horas: {calcularMenos8(marcaciones)}</p>
                </div>
            </div> : <h2> </h2>}
            <ModalMarcacion fecha={fecha} user={usuario} showingModal={showModal} closeModal={() => setShowModal(false)}/>
        </div>
    )
}

export default Reports;