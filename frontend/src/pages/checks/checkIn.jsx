import React, { useState } from 'react';
import {Button} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import ModalMarcacion from "../../components/modalMarcacion/modalMarcacion";

const CheckIn = () => {

    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fecha, setFecha] = useState(null);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
    }

    const processCheckIn = () => {
        setFecha(new Date());
        setShowModal(true);
    }

    return (
        <div>
            <h1>Check In</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>
            {usuario ? <div>
                <h2>Usuario</h2>
                <p>Rut: {usuario.rut}</p>
                <p>Nombre: {usuario.nombre}</p>
                <p>Apellido Paterno: {usuario.apellido_paterno}</p>
                <p>Apellido Materno: {usuario.apellido_materno}</p>
                <p>Fecha Nacimiento: {usuario.fecha_nacimiento}</p>
                <p>Fecha Contratación: {usuario.fecha_contratacion}</p>
                <h2>Marcación</h2>
                <Button variant="success" onClick={() => processCheckIn()}>Marcar</Button>
            </div> : <h4>Sin Resultados</h4> }
            <ModalMarcacion fecha={fecha} user={usuario} showingModal={showModal} closeModal={() => setShowModal(false)}/>
        </div>
    )
}

export default CheckIn;