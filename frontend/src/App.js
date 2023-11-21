import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import CheckIn from "./pages/checks/checkIn";
import DiasTrabajadosReporte from "./pages/reporte/reportetrabajo"
import "./styles/main.css";
import { UserContext } from './services/UserContext'; 

export default function App() {
    const [usuario, setUsuario] = useState(null);

    return (
        <UserContext.Provider value={{ usuario, setUsuario }}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<UserList />} />
                    <Route path="/createUser" element={<UserCreate />} />
                    <Route path="/checkIn" element={<CheckIn />} />
                    <Route path="/reportetrabajo" element={<DiasTrabajadosReporte />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}

