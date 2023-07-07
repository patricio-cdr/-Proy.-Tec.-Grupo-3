import './App.css';
import Login from './Login';
import Inicio from './Inicio'
import React from 'react';
import { auth } from "./firebase-config";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from './Register';
import Buscador from './Buscador';
import RegisterP from './RegisterP';
import HrvPaciente from './HrvPaciente';
import EditarP from './EditarP';
import Paciente from './Paciente';


function App() {

    const [usuario, setUsuario] = React.useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((fbUser) => {
            setUsuario(fbUser);
        })

    }, [])

    return (
        <>
            <main id="main-content">
                <Routes>
                    <Route path="/" element={usuario ? <Inicio /> : <Login setUsuario={setUsuario} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/buscador" element={<Buscador />} />
                    <Route path="/nuevopaciente" element={<RegisterP />} />
                    <Route path="/hrvPaciente" element={<HrvPaciente/>} />
                    <Route path="/editarPaciente/:numDoc" element={<EditarP/>} />
                    <Route path="/pantallaPaciente/:numDoc" element={<Paciente/>} />

                </Routes>
            </main>
        </>
    );
}

export default App;
