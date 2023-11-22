import React, { useState, useContext, useEffect } from 'react';
import {Button, Table} from "react-bootstrap";
import { UserContext } from '../../services/UserContext';
import { searchUserByRut } from '../../services/user.service';


const DiasTrabajadosReporte = () => {
    const { usuario, setUsuario } = useContext(UserContext);
    const [rut, setRut] = useState('');
    const [diasTrabajados, setDiasTrabajados] = useState(0);

    useEffect(() => {
        if (usuario && usuario.fecha_contratacion) {
            const fechaContratacion = new Date(usuario.fecha_contratacion);
            const fechaActual = new Date();
            let diasTrabajados = 0;
    
            for(let dia = fechaContratacion; dia <= fechaActual; dia.setDate(dia.getDate() + 1)) {
                if(dia.getDay() !== 0 && dia.getDay() !== 6) {
                    diasTrabajados++;
                }
            }
    
            setDiasTrabajados(diasTrabajados);
        }
    }, [usuario]);

    const handleRutChange = (e) => {
        setRut(e.target.value);
    };

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
    }

    return (
        <div>
            <h1>Reporte de Trabajo</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>
            {usuario ? (
                <div>
                    <h2>Reporte de días trabajados</h2>
                    <p>Has trabajado {diasTrabajados} días desde tu fecha de contratación ({usuario.fecha_contratacion}).</p>
                </div>
            ) : (
                <p>No se encontró un usuario con el RUT ingresado.</p>
            )}
        </div>
    );
}

export default DiasTrabajadosReporte;