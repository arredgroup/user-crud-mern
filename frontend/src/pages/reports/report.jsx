import React, { useState } from 'react';
import {Button} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut } from '../../services/check.service';

const Report = () => {
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [marcaciones, setMarcaciones] = useState([]);

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
                    </div>
                    : <h2>Sin Resultados</h2>
                }
        </div>
    );
}

export default Report;