import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { updateUser } from '../../services/user.service';

const ModalEdit = (props) => {
    const { user, showingModal, closeModal } = props;

    const rut = user.rut;
    const [nombre, setNombre] = useState(null);
    const [apellidoPaterno, setApellidoPaterno] = useState(null);
    const [apellidoMaterno, setApellidoMaterno] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [fechaContratacion, setFechaContratacion] = useState(null);

    const hideModal = () => {
        closeModal();
    };

    const handleUpdate = () => {
        updateUser(rut, {
            rut,
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: fechaNacimiento,
            fecha_contratacion: fechaContratacion
        });
        hideModal();
    }

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Actualizar Usuario {rut}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Está seguro de actualizar al usuario rut {rut}, esta acción no se puede deshacer</p>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" placeholder={user.nombre} value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Apellido Paterno</label>
                    <input type="text" className="form-control" placeholder={user.apellido_paterno} value={apellidoPaterno} onChange={e => setApellidoPaterno(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Apellido Materno</label>
                    <input type="text" className="form-control" placeholder={user.apellido_materno} value={apellidoMaterno} onChange={e => setApellidoMaterno(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Fecha Nacimiento</label>
                    <input type="date" className="form-control" placeholder={user.fecha_nacimiento} value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Fecha Contratacion</label>
                    <input type="date" className="form-control" placeholder={user.fecha_contratacion} value={fechaContratacion} onChange={e => setFechaContratacion(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Cancelar</button>
                <button className="btn btn-warning" onClick={() => handleUpdate()}>Actualizar</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit;