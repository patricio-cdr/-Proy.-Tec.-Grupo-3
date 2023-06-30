import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { db, app } from "./firebase-config";
import { db } from "./firebase-config";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
//import {  doc,  getDoc,  setDoc,  Timestamp,  updateDoc,  arrayUnion,  FieldValue,  getDocs,  collection} from "firebase/firestore";
import "./HrvPaciente.css";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { whatsAppToken, hostUrl } from "./globalVariables";

export default function HrvPaciente() {
    const [searchDNI, setSearchDNI] = useState("");
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
    const [error, setError] = useState(false);
    const [listaExamen, setListaExamen] = useState([]);
    const [pacienteDocRef, setPacienteDocRef] = useState("");
    const [visitaActual, setVisitaActual] = useState("");
    const [activeHRV, setActiveHRV] = useState(false);
    const [smsSent, setSmsSent] = useState(false);

    const navigate = useNavigate();

    const buscarPaciente = async () => {
        console.log("Volvio a entrar a funcion buscarPaciente")
        const docRef = doc(db, "pacientes", searchDNI);
        setPacienteDocRef(docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            const paciente = docSnap.data();
            setPacienteEncontrado(paciente);

            let hasActiveVisit = false;

            paciente.visitas.forEach((visita) => {
                if (visita.visitaTerminada === false) {
                    setListaExamen(visita.examenes);
                    setActiveHRV(true)
                    hasActiveVisit = true;
                }
            });

            if (!hasActiveVisit) {
                alert("Paciente no tiene una HRV activa.")

            }

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

                            let atendidoPorObj = await loadTecnicoData(auth.currentUser.uid)

                            if (accion === "horaSalida") {
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].atendidoPorUid = auth.currentUser.uid;
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].atendidoPorNombre = atendidoPorObj.nombres
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].atendidoPorApellido = atendidoPorObj.apellidos;
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].horaSalida = new Date(Date.now()).toLocaleString();
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].horaIngreso = docSnap.visitas[visitaIndex].examenes[examenIndex].horaIngreso;
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].completado = true;

                                let pacienteActualizado = JSON.parse(
                                    JSON.stringify(pacienteActualizar)
                                );

                                await setDoc(
                                    doc(db, "pacientes", searchDNI),
                                    pacienteActualizado
                                );
                                alert("Paciente actualizado con éxito.");

                            } else if (accion === "horaIngreso") {
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].atendidoPorUid = auth.currentUser.uid;
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].atendidoPorNombre = atendidoPorObj.nombres
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].atendidoPorApellido = atendidoPorObj.apellidos;
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].horaSalida = "";
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].horaIngreso = new Date(Date.now()).toLocaleString();
                                pacienteActualizar.visitas[visitaIndex].examenes[examenIndex].completado = false;

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

                        }
                    });
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const [isRecepcionista, setIsRecepcionista] = useState(false);
    useEffect(() => {
        getRecepcionista().then((result) => {
            setIsRecepcionista(result);
        });
    }, []);

    const getRecepcionista = async () => {
        const recepcionistaSnapshot = await getDocs(
            collection(db, "recepcionista")
        );
        const currentUserUID = auth.currentUser.uid;

        let isRecepcionista = false;
        recepcionistaSnapshot.forEach((doc) => {
            const recepcionistaUID = doc.data().uid;
            if (recepcionistaUID === currentUserUID) {
                isRecepcionista = true;
            }
        });
        return isRecepcionista;
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
        const recepcionistasSnapshot = await getDocs(
            collection(db, "recepcionista")
        );
        const currentUserUID = auth.currentUser.uid;

        let terminarVisitaActual = false;
        recepcionistasSnapshot.forEach((doc) => {
            const recepcionistaUID = doc.data().uid;
            if (recepcionistaUID === currentUserUID) {
                terminarVisitaActual = true;
            }
        });

        if (terminarVisitaActual) {

            let noFinishedVisits = true

            docSnap.visitas.forEach(async (visita, index) => {
                if (visita.visitaTerminada === false) {
                    noFinishedVisits = false

                    setVisitaActual(visita);
                    var visitaIndex = index;
                    var pacienteActualizar = pacienteEncontrado;
                    pacienteActualizar.visitas[visitaIndex].visitaTerminada = true;
                    pacienteActualizar.visitas[visitaIndex].finVisita = new Date(
                        Date.now()
                    ).toLocaleString();

                    var pacienteActualizado = JSON.parse(
                        JSON.stringify(pacienteActualizar)
                    );

                    await setDoc(doc(db, "pacientes", searchDNI), pacienteActualizado);
                    alert("Visita terminada con éxito.");
                    navigate("/");
                }
            });

            if (noFinishedVisits) {
                alert("El paciente no tiene visitas por terminar.");
            }
        } else {
            alert("No tienes permiso para terminar la visita.");
        }
    };

    const handleInputChange = (event) => {
        setSearchDNI(event.target.value);
    };

    const prepSMS = () => async () => {

        if (!pacienteEncontrado) {
            alert("Busque a un paciente.")
            return
        } else if (!pacienteEncontrado.telefono) {
            alert("El paciente no tiene un telefono asociado.")
            return
        } else if (!activeHRV) {
            alert("Paciente no tiene una HRV activa.")
            return
        } else if (smsSent) {
            alert("Ya se envió un SMS.")
            return
        } else {
            setSmsSent(true)
            console.log("preppingSMS")
            return
        }

        console.log("preppingSMS")
        setSmsSent(true)

        const url = 'https://inteltech.p.rapidapi.com/send.php';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '9a08f7174cmsh97c0e79447bb259p128fc2jsneb961b98d417',
                'X-RapidAPI-Host': 'inteltech.p.rapidapi.com'
            },
            body: new URLSearchParams({
                sms: "51" + pacienteEncontrado.telefono,
                message: hostUrl + "/pantallaPaciente/" + pacienteEncontrado.numDoc,
                key: '63882049-04C7-7B4E-1F61-497E35D242A8',
                username: 'patriciocc98@gmail.com'
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    const loadTecnicoData = async (uid) => {
    
            const docRef = doc(db, "tecnico", uid);
            const atendidoPorData = (await getDoc(docRef)).data();
            console.log(atendidoPorData)
            return atendidoPorData
    }

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
                                    <td>{examen.atendidoPorNombre + " " + examen.atendidoPorApellido}</td>
                                    <td></td>
                                    <td>{examen.horaIngreso}</td>
                                    <td>
                                        {!isRecepcionista && (
                                            <button
                                                className="editbtn"
                                                onClick={insertarHoraPara(examen.nombre, "horaIngreso")}
                                            >
                                                Iniciar
                                            </button>
                                        )}
                                    </td>
                                    <td>{examen.horaSalida}</td>
                                    <td>
                                        {!isRecepcionista && (
                                            <button
                                                className="editbtn"
                                                onClick={insertarHoraPara(examen.nombre, "horaSalida")}
                                            >
                                                Finalizar
                                            </button>
                                        )}
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
                <button className="boton-regresar"
                    onClick={prepSMS()}>REENVIAR HRV</button>
                <button className="btn-buscar-p" onClick={terminarVisita()}>
                    TERMINAR VISITA
                </button>
            </div>
        </div>
    );
}
