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
            {marcaciones && (
                marcaciones.length > 0 ? (
                    <>
                        <p>{`Total de marcaciones: ${marcaciones.length}`}</p>
                        <p>{`Total de entradas: ${entradas}`}</p>
                        <p>{`Total de salidas: ${salidas}`}</p>
                    </>
            ) : (
                    <p>Sin marcaciones</p>
                )
            )}
        </div>
    )
}

export default Reports;