import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from "./firebase-config";
import { doc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import './Paciente.css';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import completo from "./assets/completo.png";
import incompleto from "./assets/incompleto.png";
import { ReactComponent as Mapa} from './assets/hospital-map.svg';
import Loader from './Loader.js';


export default function Paciente() {

    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
    const [pacienteDocRef, setPacienteDocRef] = useState("");
    const [listaExamen, setListaExamen] = useState([]);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    let params = useParams();

    const buscarPaciente = async () => {
        const docRef = doc(db, "pacientes", params.numDoc);
        setPacienteDocRef(docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            const paciente = docSnap.data();
            setPacienteEncontrado(paciente);
            paciente.visitas.forEach((visita) => {
                if (visita.visitaTerminada === false) {
                    setListaExamen(visita.examenes);
                    visita.examenes.forEach((examen)=>{
                        if(examen.completado===false){
                            switch(examen.nombre){
                                case "oftalmo": return document.querySelector("#oftalmologia").style.fill = "#52bcc991";
                                case "triaje" : return document.querySelector("#triaje").style.fill = "#52bcc991";
                                case "ekg" : return document.querySelector("#cardiologia").style.fill = "#52bcc991";
                                case "radiologia" : return document.querySelector("#radiologia").style.fill = "#52bcc991";
                                case "medicina general" : return document.querySelector("#medicinageneral").style.fill = "#52bcc991";
                                case "odontologia" : return document.querySelector("#odontologia").style.fill = "#52bcc991";
                                case "laboratorio" : return document.querySelector("#laboratorio").style.fill = "#52bcc991";
                                case "psiquiatria" : return document.querySelector("#psiquiatria").style.fill = "#52bcc991";
                                case "psicologia" : return document.querySelector("#psicologia").style.fill = "#52bcc991";
                            default: return null;
                            }
                        }
                    })
                    
                    console.log("Lista examenes:", listaExamen);
                }
            });

            setError(false);
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            setPacienteEncontrado("");
            setListaExamen([]);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    // Used to make the effect function run everytime the component is rendered or the DOM is updated.
    useEffect(() => {
        buscarPaciente();
        
        // Create a Firestore document reference
        const docRef = doc(db, 'pacientes', params.numDoc);

        // Set up a snapshot listener for the document
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            // Update the state with the new data
            setData(snapshot.data());
            buscarPaciente()
        });

        // Clean up the listener when the component is unmounted
        return () => {
            unsubscribe();
        };
    }, [])


    return (
        <section id='pantalla-paciente' className='container mx-auto mt-5'>
            <Loader/>
            <h2>Hola </h2>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-examen" role="tabpanel" aria-labelledby="pills-examen-tab" tabIndex="0">
                    <table className="table table-paciente mt-5 text-center mx-auto">
                        <thead className='text-uppercase'>
                            <tr>
                                <th scope="col">Exámenes</th>
                                <th scope="col">Completado</th>
                            </tr>
                        </thead>
                        <tbody className='text-capitalize'>
                            {listaExamen.map((examen, index) => (
                                <tr key={index}>
                                    <th scope="row">{examen.nombre}</th>
                                    <td><img src={examen.completado ? completo : incompleto} alt="" /></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className="tab-pane fade" id="pills-mapa" role="tabpanel" aria-labelledby="pills-mapa-tab" tabIndex="0">
                    
                    <Mapa className='d-flex w-100 mx-auto'></Mapa>
                </div>
            </div>
            <ul className="nav nav-pills mb-3 d-flex justify-content-center mt-5 fw-semibold" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-examen-tab" data-bs-toggle="pill" data-bs-target="#pills-examen" type="button" role="tab" aria-controls="pills-examen" aria-selected="true">EXAMENES MEDICOS</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-mapa-tab" data-bs-toggle="pill" data-bs-target="#pills-mapa" type="button" role="tab" aria-controls="pills-mapa" aria-selected="false">MAPA CLINICA</button>
                </li>
            </ul>
        </section>
    )
}
