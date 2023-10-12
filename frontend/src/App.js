import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";

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
            </Routes>
        </Router>
    )
}

