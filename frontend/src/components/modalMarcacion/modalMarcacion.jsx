import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { TIPO_MARCACION } from '../../constants/marcacion';
import { createCheck } from '../../services/check.service';

const ModalMarcacion = (props) => {
    const { user, fecha, showingModal, closeModal } = props;

    const [checkStatus, setCheckStatus] = useState(TIPO_MARCACION.ENTRADA);

    const hideModal = () => {
        closeModal();
    };

    const handleCheck = () => {
      const check = {
          rut: user.rut,
          fecha: fecha.toLocaleDateString(),
          hora: fecha.toLocaleTimeString(),
          tipo: checkStatus
      }
      createCheck(check);
    };

    return (
        <Modal show={showingModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>Marcación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            checked={checkStatus===(TIPO_MARCACION.ENTRADA) ? 'checked' : null}
                            onClick={() => setCheckStatus(TIPO_MARCACION.ENTRADA)}
                        />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Entrada
                            </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked={checkStatus===(TIPO_MARCACION.SALIDA) ? 'checked' : null}
                            onClick={() => setCheckStatus(TIPO_MARCACION.SALIDA)}
                        />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Salida
                            </label>
                    </div>
                </div>
                <p>Usuario {user?.nombre} usted marcará su {checkStatus===(TIPO_MARCACION.ENTRADA)? 'Entrada' : 'Salida'} con fecha {fecha?.toLocaleString()}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={hideModal}>Volver</button>
                <button className="btn btn-primary" onClick={() => handleCheck()}>Marcar</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMarcacion;