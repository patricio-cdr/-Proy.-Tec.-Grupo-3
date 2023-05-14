import './App.css';
import Login from './Login';
import Inicio from './Inicio'
import React from 'react';
import { auth } from "./firebase-config";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from './Register';

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
                    <Route path="/" element={usuario ? <Inicio /> :
                        <Login setUsuario={setUsuario} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
