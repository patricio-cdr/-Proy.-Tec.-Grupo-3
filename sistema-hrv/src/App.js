import './App.css';
import Login from './Login';
import Inicio from './Inicio'
import React from 'react';
import { auth } from "./firebase-config";
import { useState, useEffect } from "react";

function App() {

    const [usuario, setUsuario] = React.useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((fbUser) => {
            setUsuario(fbUser);
        })

    }, [])

    return (
        <>
            {usuario ? <Inicio /> : <Login setUsuario={setUsuario} />}
        </>
    );
}

export default App;
