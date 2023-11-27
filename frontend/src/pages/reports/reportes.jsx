import React, { useState } from 'react';
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut, deleteCheck } from '../../services/check.service';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import ErrorComponent from '../../components/error/errorComponent';

const Reportes = () => {

    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [marcaciones, setMarcaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [error, setError] = useState(null);
    
    const searchUser = () => {
        searchUserByRut(rut)
            .then(response => {
                if (!response.data) {
                    throw new Error('No se encontró el usuario');
                }
                setUsuario(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
        searchCheckByRut(rut)
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    throw new Error('No se encontraron marcaciones');
                }
                setMarcaciones(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }



    return (
        <div>
            <h1>Reportes</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Generar Reporte</Button>
            </div>
            <div>
                {error && <ErrorComponent message={error} />}
            </div>
        </div>
    )
}

export default Reportes;