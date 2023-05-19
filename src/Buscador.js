import React, { useState } from 'react';
import './Buscador.css';
import datos from './datos.json';
import { Link } from "react-router-dom";
import { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { async } from 'q';

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


        /*  if (dniEncontrado) {
           setPacienteEncontrado(dniEncontrado);
           setError(false);
         } else {
           setError(true);
           setTimeout(() => setError(false), 5000); // Mostrar el mensaje de error durante 5 segundos
         }*/
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
                    <div className="paciente-encontrado">
                        <div className='paciente-encontrado-box'>
                            <h3 className='mb-3'>Datos del paciente</h3>
                            <p>Nombre: {pacienteEncontrado.nombres}</p>
                            <p>Teléfono: {pacienteEncontrado.telefono}</p>
                            <p>Empresa: {pacienteEncontrado.empre}</p>
                        </div>
                    </div>
                )}
                {error && <span id="msg-dni-error" className="text-danger mt-5 ">No se encontró paciente con ese DNI</span>}
            </div>
        </div>
    );
};

