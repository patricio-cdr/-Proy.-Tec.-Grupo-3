import React, { useState } from 'react';
import './Buscador.css';
import { Link } from "react-router-dom";
import { db } from "./firebase-config";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { async } from 'q';
import datosPerfil from './datosPerfil.json'

export default function Buscador() {
    const [searchDNI, setSearchDNI] = useState('');
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
    const [error, setError] = useState(false);

    const buscarPaciente = async () => {
        const docRef = doc(db, "pacientes", searchDNI);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const paciente = docSnap.data();
            setPacienteEncontrado(paciente);
            setError(false);
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            setPacienteEncontrado("");
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    const crearHrv = () => async () => {

        const docRef = doc(db, "pacientes", searchDNI);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const paciente = docSnap.data();
            setPacienteEncontrado(paciente);

            //console.log(paciente.visitas)

            if (paciente.visitas.every(visita => visita.visitaTerminada === true)) {
                var parsedPerfil = JSON.parse(JSON.stringify(datosPerfil))
                
                parsedPerfil.initVisita = new Date(Date.now()).toLocaleString();
                
                await updateDoc(docRef, {
                    visitas: arrayUnion(parsedPerfil)
                });
                alert("Hoja de ruta virtual creada.");
            } else {
                alert("EL PACIENTE TIENE UNA HRV ACTIVA.");
            }

            setError(false);
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            setPacienteEncontrado("");
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };


    const handleInputChange = event => {
        setSearchDNI(event.target.value);
    };


    return (
        <div className="buscador-container">
            <div className="botones-superiores">
                <Link to="/"><button className="boton-regresar">Regresar</button></Link>
                <Link to="/nuevopaciente"><button className="boton-nuevo-paciente">Nuevo paciente</button></Link>
            </div>
            <div className="buscador-content">
                <h2>Ingrese DNI del paciente</h2>
                <div className="input-container">
                    <input type="text" id="search-paciente" placeholder="Buscar" value={searchDNI} onChange={handleInputChange} />
                    <div id="icon-box"><i className="fas fa-search" onClick={buscarPaciente}></i></div>
                </div>
                {pacienteEncontrado && (
                    <table class="table mt-4 bbw">
                        <thead>
                            <tr>
                                <th scope="col">Paciente</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" className='text-uppercase'>{pacienteEncontrado.nombres + " " + pacienteEncontrado.apellidos}</th>
                                <button className='boton-paciente text-center' onClick={crearHrv()}>Crear HRV <i class="bi bi-plus-lg"></i></button>
                                <Link to={"/editarPaciente/" + pacienteEncontrado.numDoc}><td className='boton-paciente text-center'>Editar <i class="bi bi-pencil-fill"></i></td></Link>
                            </tr>
                        </tbody>
                    </table>
                )}
                {error && <span id="msg-dni-error" className="text-danger mt-5 ">No se encontró paciente con ese DNI</span>}
            </div>
        </div>
    );
};

