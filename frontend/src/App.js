import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import CheckIn from "./pages/checks/checkIn";
import "./styles/main.css";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<UserList />}
                />
                <Route path="/createUser" element={<UserCreate />} />
                <Route path="/checkIn" element={<CheckIn />} />
            </Routes>
        </Router>
    )
}

