import React, { useState } from 'react';
import { createUsers } from "../../services/user.service";

const UserCreate = () => {

    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [fechaContratacion, setFechaContratacion] = useState('');

    const handleSubmit = () => {
        console.log("Botón apretado");
        createUsers({
            rut,
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: fechaNacimiento,
            fecha_contratacion: fechaContratacion
        });
    }

    return (
        <div>
            <h1>Crear Usuario</h1>
            <div>
                <div className="form-group">
                    <label>Rut</label>
                    <input type="text" className="form-control" placeholder="11.111.111-1" value={rut} onChange={e => setRut(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" placeholder="Juan" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Apellido Paterno</label>
                    <input type="text" className="form-control" placeholder="Martinez" value={apellidoPaterno} onChange={e => setApellidoPaterno(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Apellido Materno</label>
                    <input type="text" className="form-control" placeholder="Arriagada" value={apellidoMaterno} onChange={e => setApellidoMaterno(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Fecha Nacimiento</label>
                    <input type="date" className="form-control" placeholder="" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Fecha Contratacion</label>
                    <input type="date" className="form-control" placeholder="" value={fechaContratacion} onChange={e => setFechaContratacion(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Crear</button>
            </div>
        </div>
    );
}

export default UserCreate;