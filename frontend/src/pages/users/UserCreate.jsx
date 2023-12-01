import React, { useState } from 'react';
import { createUsers } from "../../services/user.service";
import { validate } from 'rut.js';

const UserCreate = () => {

    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [fechaContratacion, setFechaContratacion] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setSuccess(false);
        if(!checkFormValues()) {
            setLoading(false);
            return;
        }
        createUsers({
            rut,
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: fechaNacimiento,
            fecha_contratacion: fechaContratacion
        }).then((response) => {
            setSuccess(true);
            setLoading(false);
            setRut('');
            setNombre('');
            setApellidoPaterno('');
            setApellidoMaterno('');
            setFechaNacimiento('');
            setFechaContratacion('');
        }).catch((error) => {
            console.log(error);
            setAlertMessage("Error al crear usuario");
            setLoading(false);
        });
    }

    const checkFormValues = () => {
        if (rut === '') {
            setAlertMessage("Debe ingresar un rut");
            return false;
        }
        if (!validate(rut)) {
            setAlertMessage("Debe ingresar un rut válido");
            return false;
        }
        if (nombre === '') {
            setAlertMessage("Debe ingresar un nombre");
            return false;
        }
        if (apellidoPaterno === '') {
            setAlertMessage("Debe ingresar un apellido paterno");
            return false;
        }
        if (apellidoMaterno === '') {
            setAlertMessage("Debe ingresar un apellido materno");
            return false;
        }
        if (fechaNacimiento === '') {
            setAlertMessage("Debe ingresar una fecha de nacimiento");
            return false;
        }
        if (fechaContratacion === '') {
            setAlertMessage("Debe ingresar una fecha de contratación");
            return false;
        }
        setAlertMessage("");
        return true;
    }

    return (
        <div>
            <h1>Crear Usuario</h1>
            { alertMessage!==''? <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {alertMessage}
                <button type="button" className="btn btn-link bi bi-x" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setAlertMessage('')}></button>
            </div> : null}
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
            { loading?
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                : null }
            { success?
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Usuario Creado Correctamente
                    <button type="button" className="btn btn-link bi bi-x" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setSuccess(false)}></button>
                </div> : null }
        </div>
    );
}

export default UserCreate;