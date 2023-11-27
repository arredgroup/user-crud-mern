import React, { useState, useContext, useEffect } from 'react';
import {Button, Table} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import {searchCheckByRut} from '../../services/check.service';

const DiasTrabajadosReporte = () => {
    const [usuario, setUsuario] = useState(null);
    const [rut, setRut] = useState('');
    const [diasTrabajados, setDiasTrabajados] = useState(0);
    const [diasMenosDeOchoHoras, setDiasMenosDeOchoHoras] = useState(0);
    const [horasExtras, sethorasExtras] = useState(0);
    const [marcaciones, setMarcaciones] = useState([]);

    useEffect(() => {
        if (usuario) {
            searchCheckByRut(usuario.rut).then(response => {
                setMarcaciones(response.data);
            });
        }
    }, [usuario]);

    useEffect(() => {
        const horasTrabajadasPorDia = {};
    
        marcaciones.forEach(marcacion => {
            const fechaParts = marcacion.fecha.split('-');
            const fecha = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
            const fechaStr = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
            const horaParts = marcacion.hora.split(':');
            const hora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), horaParts[0], horaParts[1]);
    
            if (!horasTrabajadasPorDia[fechaStr]) {
                horasTrabajadasPorDia[fechaStr] = [];
            }
            horasTrabajadasPorDia[fechaStr].push(hora);
        });
    
        let diasMenosDeOchoHoras = 0;
        for (const fecha in horasTrabajadasPorDia) {
            const horasTrabajadas = horasTrabajadasPorDia[fecha];
            horasTrabajadas.sort((a, b) => a - b);
    
            let totalHorasTrabajadas = 0;
            for (let i = 0; i < horasTrabajadas.length; i += 2) {
                const inicio = horasTrabajadas[i];
                const fin = horasTrabajadas[i + 1];
                if (fin) {
                    const duracion = (fin - inicio) / (1000 * 60 * 60);
                    totalHorasTrabajadas += duracion;
                }
            }
            if (totalHorasTrabajadas < 8) {
                diasMenosDeOchoHoras++;
            }
        }


        let horasExtras = 0;
        for (const fecha in horasTrabajadasPorDia) {
            const horasTrabajadas = horasTrabajadasPorDia[fecha];
            horasTrabajadas.sort((a, b) => a - b);

            let totalHorasTrabajadas = 0;
            for (let i = 0; i < horasTrabajadas.length; i += 2) {
                const inicio = horasTrabajadas[i];
                const fin = horasTrabajadas[i + 1];
                if (fin) {
                    const duracion = (fin - inicio) / (1000 * 60 * 60);
                    totalHorasTrabajadas += duracion;
                }
            }
            if (totalHorasTrabajadas > 8) {
                horasExtras+= totalHorasTrabajadas - 8;
            }
            

        }
    
        setDiasTrabajados(Object.keys(horasTrabajadasPorDia).length);
        setDiasMenosDeOchoHoras(diasMenosDeOchoHoras);
        sethorasExtras(horasExtras);

    }, [marcaciones]);
    
        

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
    }

    return (
        <div>
            <h1>Reporte de Trabajo</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>
            {usuario ? (
                <div>
                    <h2>Reporte de días trabajados</h2>
                    <p>{usuario.nombre} {usuario.apellido_paterno} trabajó {diasTrabajados} días desde su fecha de contratación ({usuario.fecha_contratacion}), con un total de {diasMenosDeOchoHoras} días en los cuales trabajó menos de 8 horas y trabajó un total de {horasExtras} horas extras.</p>
                </div>
            ) : (
                <p>No se encontró un usuario con el RUT ingresado.</p>
            )}
        </div>
    );
}

export default DiasTrabajadosReporte;