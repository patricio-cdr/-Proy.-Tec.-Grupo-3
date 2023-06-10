import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { db, app } from "./firebase-config";
import { db } from "./firebase-config";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
//import {  doc,  getDoc,  setDoc,  Timestamp,  updateDoc,  arrayUnion,  FieldValue,  getDocs,  collection} from "firebase/firestore";
import "./HrvPaciente.css";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

export default function HrvPaciente() {
    const [searchDNI, setSearchDNI] = useState("");
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
    const [error, setError] = useState(false);
    const [listaExamen, setListaExamen] = useState([]);
    const [pacienteDocRef, setPacienteDocRef] = useState("");
    const [visitaActual, setVisitaActual] = useState("");

    const navigate = useNavigate();

    const buscarPaciente = async () => {
        const docRef = doc(db, "pacientes", searchDNI);
        setPacienteDocRef(docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            const paciente = docSnap.data();
            setPacienteEncontrado(paciente);

            paciente.visitas.forEach((visita) => {
                if (visita.visitaTerminada === false) {
                    setListaExamen(visita.examenes);
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

    const insertarHoraPara = (examenNombre, accion) => async () => {
        try {
            const docSnap = (await getDoc(pacienteDocRef)).data();

            docSnap.visitas.forEach((visita, index) => {
                if (visita.visitaTerminada === false) {
                    setVisitaActual(visita);
                    let visitaIndex = index;

                    visitaActual.examenes.forEach(async (examenEnBD, indexTwo) => {
                        if (examenEnBD.nombre === examenNombre) {
                            let examenIndex = indexTwo;
                            let pacienteActualizar = pacienteEncontrado;

                            if (accion === "horaSalida") {
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].atendidoPor = auth.currentUser.uid;
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].horaSalida = new Date(Date.now()).toLocaleString();
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].horaIngreso =
                                    docSnap.visitas[visitaIndex].examenes[
                                        examenIndex
                                    ].horaIngreso;
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].completado = true;

                                let pacienteActualizado = JSON.parse(
                                    JSON.stringify(pacienteActualizar)
                                );

                                await setDoc(
                                    doc(db, "pacientes", searchDNI),
                                    pacienteActualizado
                                );
                                alert("Paciente actualizado con éxito.");
                            } else {
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].atendidoPor = auth.currentUser.uid;
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].horaSalida = "";
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].horaIngreso = new Date(Date.now()).toLocaleString();
                                pacienteActualizar.visitas[visitaIndex].examenes[
                                    examenIndex
                                ].completado = false;
                                console.log("Hizo click en hora ingreso ");

                                let pacienteActualizado = JSON.parse(
                                    JSON.stringify(pacienteActualizar)
                                );

                                await setDoc(
                                    doc(db, "pacientes", searchDNI),
                                    pacienteActualizado
                                );
                                alert("Paciente actualizado con éxito.");
                            }

                            //let fieldPath = `visitas.[${visitaIndex}].examenes.[${examenIndex}]`;
                        }
                    });
                }
            });
        } catch (error) { }
    };

    const reiniciar = (examenNombre) => async () => {
        const docSnap = (await getDoc(pacienteDocRef)).data();

        docSnap.visitas.forEach((visita, index) => {
            if (visita.visitaTerminada === false) {
                setVisitaActual(visita);
                var visitaIndex = index;

                visitaActual.examenes.forEach(async (examenEnBD, indexTwo) => {
                    if (examenEnBD.nombre === examenNombre) {
                        var examenIndex = indexTwo;
                        var pacienteActualizar = pacienteEncontrado;

                        pacienteActualizar.visitas[visitaIndex].examenes[
                            examenIndex
                        ].atendidoPor = "";
                        pacienteActualizar.visitas[visitaIndex].examenes[
                            examenIndex
                        ].horaSalida = "";
                        pacienteActualizar.visitas[visitaIndex].examenes[
                            examenIndex
                        ].horaIngreso = "";
                        pacienteActualizar.visitas[visitaIndex].examenes[
                            examenIndex
                        ].completado = false;

                        var pacienteActualizado = JSON.parse(
                            JSON.stringify(pacienteActualizar)
                        );

                        await setDoc(doc(db, "pacientes", searchDNI), pacienteActualizado);
                        alert("Paciente actualizado con éxito.");
                    }
                });
            }
        });
    };

    const terminarVisita = () => async () => {
        const docSnap = (await getDoc(pacienteDocRef)).data();
        const recepcionistasSnapshot = await getDocs(collection(db, "recepcionista"));
        const currentUserUID = auth.currentUser.uid;

        let terminarVisitaActual = false;
        recepcionistasSnapshot.forEach((doc) => {
            const recepcionistaUID = doc.data().uid;
            if (recepcionistaUID === currentUserUID) {
                terminarVisitaActual = true;
            }
        });

        if (terminarVisitaActual) {
            docSnap.visitas.forEach(async (visita, index) => {
                if (visita.visitaTerminada === false) {
                    setVisitaActual(visita);
                    var visitaIndex = index;
                    var pacienteActualizar = pacienteEncontrado;
                    pacienteActualizar.visitas[visitaIndex].visitaTerminada = true;
                    pacienteActualizar.visitas[visitaIndex].finVisita = new Date(Date.now()).toLocaleString();

                    var pacienteActualizado = JSON.parse(
                        JSON.stringify(pacienteActualizar)
                    );

                    await setDoc(doc(db, "pacientes", searchDNI), pacienteActualizado);
                    alert("Visita terminada con éxito.");
                    navigate("/");
                }
            });
        } else {
            alert("No tienes permiso para terminar la visita.");
        }
    };


    const handleInputChange = (event) => {
        setSearchDNI(event.target.value);
    };

    return (
        <div className="buscador-container" id="#hrv-paciente">
            <div className="botones-superiores">
                <Link to="/">
                    <button className="boton-regresar">Regresar</button>
                </Link>
            </div>
            <div className="buscador-content">
                <h2>Ingrese DNI del paciente</h2>
                <div className="input-container">
                    <input
                        type="text"
                        id="search-paciente"
                        placeholder="Buscar"
                        value={searchDNI}
                        onChange={handleInputChange}
                    />
                    <div id="icon-box">
                        <i className="fas fa-search" onClick={buscarPaciente}></i>
                    </div>
                </div>
                {pacienteEncontrado && (
                    <div className="datos-paciente mx-auto mt-5">
                        <h6 className="text-uppercase">
                            {pacienteEncontrado.nombres} {pacienteEncontrado.apellidos}
                        </h6>
                        <p>Correo electrónico: {pacienteEncontrado.email}</p>
                        <p>DNI: {pacienteEncontrado.numDoc}</p>
                        <p>Teléfono celular: {pacienteEncontrado.telefono}</p>
                        <p>Empresa: {pacienteEncontrado.empre}</p>
                        <p>Fecha de nacimiento: {pacienteEncontrado.fecNac}</p>
                    </div>
                )}
                <div>
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Examenes</th>
                                <th scope="col">Atendido por</th>
                                <th scope="col">Especificaciones</th>
                                <th scope="col">H.ingreso</th>
                                <th scope="col"></th>
                                <th scope="col">H.salida</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaExamen.map((examen, index) => (
                                <tr key={index}>
                                    <td>{examen.nombre}</td>
                                    <td>{examen.atendidoPor}</td>
                                    <td></td>
                                    <td>{examen.horaIngreso}</td>
                                    <td>
                                        <button
                                            className="editbtn"
                                            onClick={insertarHoraPara(examen.nombre, "horaIngreso")}
                                        >
                                            Iniciar
                                        </button>
                                    </td>
                                    <td>{examen.horaSalida}</td>
                                    <td>
                                        <button
                                            className="editbtn"
                                            onClick={insertarHoraPara(examen.nombre, "horaSalida")}
                                        >
                                            Finalizar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            disabled="true"
                                            className="editbtn"
                                            onClick={reiniciar(examen.nombre)}
                                        >
                                            Reiniciar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {error && (
                    <span id="msg-dni-error" className="text-danger mt-5 ">
                        No se encontró paciente con ese DNI
                    </span>
                )}
            </div>
            <div className="row-display buttons">
                <button className="boton-regresar">REENVIAR HRV</button>
                <button className="btn-buscar-p" onClick={terminarVisita()}>
                    TERMINAR VISITA
                </button>
            </div>
        </div>
    );
}