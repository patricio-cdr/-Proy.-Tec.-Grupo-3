import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import './HrvPaciente.css';

export default function HrvPaciente() {

    const [searchDNI, setSearchDNI] = useState('');
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
    const [error, setError] = useState(false);
    const [listaExamen, setListaExamen] = useState([]);

    const buscarPaciente = async () => {
        const docRef = doc(db, "pacientes", searchDNI);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const paciente = docSnap.data();
            setPacienteEncontrado(paciente);
            setListaExamen(paciente.visitas[Array.length - 1].perfiles[paciente.perfil].examenes);
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
        <div className="buscador-container" id='#hrv-paciente'>
            <div className="botones-superiores">
                <Link to="/"><button className="boton-regresar">Regresar</button></Link>
            </div>
            <div className="buscador-content">
                <h2>Ingrese DNI del paciente</h2>
                <div className="input-container">
                    <input type="text" id="search-paciente" placeholder="Buscar" value={searchDNI} onChange={handleInputChange} />
                    <div id="icon-box"><i className="fas fa-search" onClick={buscarPaciente}></i></div>
                </div>
                {pacienteEncontrado && (
                    <div className='datos-paciente mx-auto mt-5'>
                        <h6 className='text-uppercase'>{pacienteEncontrado.nombres} {pacienteEncontrado.apellidos}</h6>
                        <p>Correo electrónico: {pacienteEncontrado.email}</p>
                        <p>DNI: {pacienteEncontrado.dni}</p>
                        <p>Teléfono celular: {pacienteEncontrado.telefono}</p>
                        <p>Empresa: {pacienteEncontrado.empre}</p>
                        <p>Fecha de nacimiento: {pacienteEncontrado.fecNac}</p>
                    </div>
                )}
                <div>
                    <table class="table mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Examenes</th>
                                <th scope="col">Atendido por</th>
                                <th scope="col">H.ingreso</th>
                                <th scope="col">H.salida</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                </div>
                {error && <span id="msg-dni-error" className="text-danger mt-5 ">No se encontró paciente con ese DNI</span>}

            </div>
            <div className='row-display buttons'>
                <button className="boton-regresar">REGISTRAR HRV</button>
                <button className="btn-buscar-p">TERMINAR VISITA</button>
            </div>
        </div>
    )
}
