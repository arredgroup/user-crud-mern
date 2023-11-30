import React, { useState, useEffect } from 'react';
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
    const [diasTrabajados, setDiasTrabajados] = useState(0);
    const [diasCortos, setDiasCortos] = useState(0);
    const [horasExtras, sethorasExtras] = useState(0);
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

    const contarDiasTrabajados = () => {
        const marcacionesPorFecha = marcaciones.reduce((acc, marcacion) => {
            const fecha = marcacion.fecha;
            if (!acc[fecha]) {
                acc[fecha] = [];
            }
            acc[fecha].push(marcacion);
            return acc;
        }, {});

        let totalDiasTrabajados = 0;
        for (let fecha in marcacionesPorFecha) {
            const marcacionesDelDia = marcacionesPorFecha[fecha];
            const tieneEntrada = marcacionesDelDia.some(marcacion => marcacion.tipo === 1);
            const tieneSalida = marcacionesDelDia.some(marcacion => marcacion.tipo === 2);
    
            if (tieneEntrada && tieneSalida) {
                totalDiasTrabajados++;
            }
        }
        return totalDiasTrabajados;
    }
    
    useEffect(() => {
        if (usuario) {
            searchCheckByRut(usuario.rut)
                .then(response => {
                    setMarcaciones(response.data);
                    setDiasTrabajados(contarDiasTrabajados(response.data));
                })
                .catch(error => {
                    setError(`Ocurrió un error al buscar los datos: ${error.message}`);
                });
        }
    }, [usuario]);
    
    useEffect(() => {
        const marcacionesPorFecha = marcaciones.reduce((acc, marcacion) => {
            const fecha = marcacion.fecha;
            if (!acc[fecha]) {
                acc[fecha] = [];
            }
            acc[fecha].push(marcacion);
            return acc;
        }, {});

        let totalHorasExtras = 0;
        let totalDiasCortos = 0;
    
        for (let fecha in marcacionesPorFecha) {
            const marcacionesDelDia = marcacionesPorFecha[fecha];
            const entrada = marcacionesDelDia.find(marcacion => marcacion.tipo === 1);
            const salida = marcacionesDelDia.find(marcacion => marcacion.tipo === 2);
    
            if (entrada && salida) {
                const horasEntrada = parseInt(entrada.hora.split(":")[0]);
                const horasSalida = parseInt(salida.hora.split(":")[0]);
                const horasTrabajadas = horasSalida - horasEntrada;
    
                if (horasTrabajadas > 8) {
                    totalHorasExtras += horasTrabajadas - 8;
                } else if (horasTrabajadas <= 8) {
                    totalDiasCortos++;
                }
            }
        }
        setDiasTrabajados(contarDiasTrabajados());
        sethorasExtras(totalHorasExtras);
        setDiasCortos(totalDiasCortos);
    }, [marcaciones]);

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
                <div className="input-group mb-3 display:flex " >
                    <input type="text" className="form-control" placeholder="22222222-2" style={{maxWidth: '600px'}} value={rut} onChange={e => setRut(e.target.value)} />
                    <Button variant="primary" style={{marginLeft: '5px'}} onClick={() => searchUser()}>Buscar</Button>
                <div/>
                {error && <ErrorComponent message={error} />}
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
                        <td><Button className="btn btn-outline-info text-light" onClick={() => handleViewUser(usuario)}><i className="bi bi-eye" ></i></Button>
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
                            <td><Button className={"btn-danger"} onClick={()=>handleDelete(marcacion)}><i className="bi bi-trash"></i></Button></td>
                        </tr>
                    ))}
                </Table>
            </div> : <h2>Sin Marcaciones {usuario ?<Button variant="success" onClick={() => processCheckIn()}>Marcar</Button> : null}</h2>}
            <ModalMarcacion fecha={fecha} user={usuario} showingModal={showModal} closeModal={() => setShowModal(false)}/>
            <ReportView
                usuario={userToView}
                diasTrabajados={diasTrabajados}
                diasCortos={diasCortos}
                horasExtras={horasExtras}
                showingReport={showingViewReport}
                closeReport={() => setShowingViewReport(false)}
            />
        </div>
    </div>)
}

export default CheckIn;