import React, { useState } from 'react';
import {Button, Table} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut, deleteCheck } from '../../services/check.service';
import ModalMarcacion from "../../components/modalMarcacion/modalMarcacion";
import ReportView from '../../components/reportView/reportView';
import ErrorComponent from '../../components/error/errorComponent';

const CheckIn = () => {

    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [userToView, setUserToView] = useState(false);
    const [marcaciones, setMarcaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [showingViewReport, setShowingViewReport] = useState(false);

    const searchUser = () => {
        searchUserByRut(rut)
            .then(response => {
                if (!response.data) {
                    throw new Error('No se encontró el usuario');
                }
                setUsuario(response.data);
            })
            .catch(error => {
                setError(`Ocurrió un error al buscar los datos: ${error.message}`);
            });

        searchCheckByRut(rut)
            .then(response => {
                if (!response.data || response.data.length === 0) {
                    throw new Error('No se encontraron marcaciones');
                }
                setMarcaciones(response.data);
            })
            .catch(error => {
                setError(`Ocurrió un error al buscar los datos: ${error.message}`);
            });
    }
    
    

    const processCheckIn = () => {
        setFecha(new Date());
        setShowModal(true);
    }

    const handleViewUser = (usuario) => {
        setUserToView(usuario);
        setShowingViewReport(true);
    }

    const handleDelete = (check) => {
        deleteCheck(check).then(response => {
            searchCheckByRut(rut).then(response => {
                setMarcaciones(response.data);
            });
        });
    }

    return (
        <div>
            <h1>Check In</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
                <ErrorComponent message={error} />
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
                        <th>Acciones</th>
                    </tr>
                    <tr>
                        <td>{usuario.rut}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.apellido_paterno}</td>
                        <td>{usuario.apellido_materno}</td>
                        <td>{usuario.fecha_nacimiento}</td>
                        <td>{usuario.fecha_contratacion}</td>
                        <td><Button className="btn btn-outline-info" onClick={() => handleViewUser(usuario)}><i className="bi bi-eye"></i></Button>
                        </td> 
                    </tr>
                </Table>
            </div> : null}
            {marcaciones.length!==0 ? <div>
                <h2>Marcaciones <Button variant="success" onClick={() => processCheckIn()}>Marcar</Button></h2>
                <Table>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                    {marcaciones.map(marcacion => (
                        <tr>
                            <td>{marcacion.fecha}</td>
                            <td>{marcacion.hora}</td>
                            <td>{marcacion.tipo}</td>
                            <td><Button className={"btn btn-outline-danger"} onClick={()=>handleDelete(marcacion)}><i className="bi bi-trash"></i></Button></td>
                        </tr>
                    ))}
                </Table>
            </div> : <h2>Sin Marcaciones {usuario ?<Button variant="success" onClick={() => processCheckIn()}>Marcar</Button> : null}</h2>}
            <ModalMarcacion fecha={fecha} user={usuario} showingModal={showModal} closeModal={() => setShowModal(false)}/>
            <ReportView
                usuario={userToView}
                showingReport={showingViewReport}
                closeReport={() => setShowingViewReport(false)}
            />
        </div>
    )
}

export default CheckIn;