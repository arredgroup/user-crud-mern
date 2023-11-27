import React, { useState } from 'react';
import {Button, Table} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import { searchCheckByRut, deleteCheck } from '../../services/check.service';
import { useNavigate } from 'react-router-dom';
import ModalMarcacion from "../../components/modalMarcacion/modalMarcacion";

const CheckIn = () => {
    const navigate = useNavigate();
    const [rut, setRut] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [marcaciones, setMarcaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fecha, setFecha] = useState(null);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
        searchCheckByRut(rut).then(response => {
            setMarcaciones(response.data);
        });
    }

    const processCheckIn = () => {
        setFecha(new Date());
        setShowModal(true);
    }

    const handleDelete = (check) => {
        deleteCheck(check).then(response => {
            searchCheckByRut(rut).then(response => {
                setMarcaciones(response.data);
            });
        });
    }

    const handlePages = (page) => {
        if(page === "userlist") {
            navigate("/");
        }
        // Eliminar redirección a reports en caso de aplicar en la página general de trabajadores
        if(page === "reports") {
            navigate("/reports");
        }
    }

    return (
        <div>
            <h1>
                Check In
                <button className="btn btn-outline-info" onClick={() => handlePages("userlist")}><i className="bi bi-person-lines-fill"></i></button>
                <button className="btn btn-outline-primary" onClick={() => handlePages("reports")}><i className="bi bi-clipboard2-data"></i></button>
                { /* Eliminar botón reports en caso de aplicar en la página general de trabajadores */}
            </h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
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
                    </tr>
                    <tr>
                        <td>{usuario.rut}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.apellido_paterno}</td>
                        <td>{usuario.apellido_materno}</td>
                        <td>{usuario.fecha_nacimiento}</td>
                        <td>{usuario.fecha_contratacion}</td>
                    </tr>
                </Table>
            </div> : <h2>Sin Resultados</h2> }
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
        </div>
    )
}

export default CheckIn;