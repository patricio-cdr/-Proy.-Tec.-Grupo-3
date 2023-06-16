import React, { useState, useEffect } from "react";
import "./Buscador.css";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase-config";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
} from "firebase/firestore";
//import { async } from "q";
import datosPerfil from "./datosPerfil.json";

export default function Buscador() {
  const [searchDNI, setSearchDNI] = useState("");
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

      if (paciente.visitas.every((visita) => visita.visitaTerminada === true)) {
        const recepcionistaSnapshot = await getDocs(
          collection(db, "recepcionista")
        );
        const currentUserUID = auth.currentUser.uid;
        let recepcionistaActual = null;
        recepcionistaSnapshot.forEach((doc) => {
          const recepcionistaUID = doc.data().uid;
          if (recepcionistaUID === currentUserUID) {
            recepcionistaActual = doc;
          }
        });

        if (recepcionistaActual) {
          var parsedPerfil = JSON.parse(JSON.stringify(datosPerfil));
          parsedPerfil.initVisita = new Date(Date.now()).toLocaleDateString();
          await updateDoc(docRef, {
            visitas: arrayUnion(parsedPerfil),
          });
          alert("Hoja de ruta virtual creada.");
        } else {
          alert("No tienes permisos para crear la hoja de ruta virtual.");
        }
      } else {
        alert("El paciente tiene una HRV activa.");
      }
      setError(false);
    } else {
      console.log("No such document!");
      setPacienteEncontrado("");
      setError(true);
      setTimeout(() => setError(false), 3000);
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

  const handleInputChange = (event) => {
    setSearchDNI(event.target.value);
  };

  return (
    <div className="buscador-container">
      <div className="botones-superiores">
        <Link to="/">
          <button className="boton-regresar">Regresar</button>
        </Link>
        {isRecepcionista && (
          <Link to="/nuevopaciente">
            <button className="boton-nuevo-paciente">Nuevo paciente</button>
          </Link>
        )}
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
          <table class="table mt-4 bbw">
            <thead>
              <tr>
                <th scope="col">Paciente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="text-uppercase">
                  {pacienteEncontrado.nombres +
                    " " +
                    pacienteEncontrado.apellidos}
                </th>
                <button
                  className="boton-paciente text-center"
                  onClick={crearHrv()}
                >
                  Crear HRV <i class="bi bi-plus-lg"></i>
                </button>
                {isRecepcionista && (
                  <Link to={"/editarPaciente/" + pacienteEncontrado.numDoc}>
                    <td className="boton-paciente text-center">
                      Editar <i class="bi bi-pencil-fill"></i>
                    </td>
                  </Link>
                )}
              </tr>
            </tbody>
          </table>
        )}
        {error && (
          <span id="msg-dni-error" className="text-danger mt-5 ">
            No se encontró paciente con ese DNI
          </span>
        )}
      </div>
    </div>
  );
}
