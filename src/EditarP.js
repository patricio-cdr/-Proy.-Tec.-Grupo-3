import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from "./firebase-config";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import './EditarP.css';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function EditarP() {
    const [paciente, setPaciente] = useState([]);
    const [error, setError] = useState(false);
    const [pacEmail, setPacEmail] = useState("");
    const [pacNombre, setPacNombre] = useState("");
    const [pacApe, setPacApe] = useState("");
    //const [pacDni, setPacDni] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");
    const [numDoc, setNumDoc] = useState("");
    const [pacEmpre, setPacEmpre] = useState("");
    const [pacFecNac, setPacFecNac] = useState("");
    const [pacTelef, setPacTelef] = useState("");
    const [pacPerfil, setPacPerfil] = useState("");
    const navigate = useNavigate();

    let params = useParams();

    const buscarPaciente = async () => {
        const docRef = doc(db, "pacientes", params.numDoc);
        const docSnap = await getDoc(docRef);
        const paciente = docSnap.data();
        setPaciente(paciente);
        setPacEmail(paciente.email);
        setPacNombre(paciente.nombres);
        setPacApe(paciente.apellidos);
        setNumDoc(paciente.numDoc);
        setPacFecNac(paciente.fecNac);
        setPacTelef(paciente.telefono);
        setPacEmpre(paciente.empre);
        setTipoDoc(paciente.tipoDoc);
        setPacPerfil(paciente.perfil);
    };

    const editPac = async () => {
        try {
            if (
                !pacEmail ||
                !pacNombre ||
                !pacApe ||
                !tipoDoc ||
                !numDoc ||
                !pacEmpre ||
                !pacFecNac ||
                !pacTelef ||
                !pacPerfil
            ) {
                setError("Por favor, complete todos los campos.");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }

            const docData = {
                email: pacEmail,
                empre: pacEmpre,
                telefono: pacTelef,
                perfil: pacPerfil,
                visitas: paciente.visitas
            };
            const docRef = doc(db, "pacientes", numDoc);
            const docSnap = await getDoc(docRef);

            if(!docSnap.exists()){
                await setDoc(doc(db, "pacientes", numDoc), docData);
                await deleteDoc(doc(db, "pacientes", params.numDoc));
            }else{
                await updateDoc(doc(db, "pacientes", numDoc), docData);
            }
            alert("Paciente actualizado con exito.");
            navigate("/buscador");
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        buscarPaciente();
    }, [])

    return (
        <section id="editP" className="container mx-auto">
            <div className="botones-superiores">
                <Link to="/buscador">
                    <button className="boton-regresar">Regresar</button>
                </Link>
            </div>
            <div className="pt-2 pb-5">
                <div className="form mx-auto">
                    <h2 className="text-center title">Edite datos del paciente</h2>
                    <div className="form-content">
                        {error && <p className="text-danger">{error}</p>}

                        <input
                            type="email"
                            placeholder="Ingrese su email..."
                            className="form-control"
                            value={pacEmail}
                            onChange={(event) => {
                                setPacEmail(event.target.value);
                            }}
                        /><br />
                        <input
                            readOnly
                            type="text"
                            placeholder="Ingrese sus nombres..."
                            className="form-control"
                            value={pacNombre}
                            onChange={(event) => {
                                setPacNombre(event.target.value);
                            }}
                        /><br />
                        <input
                            readOnly
                            type="text"
                            placeholder="Ingrese sus apellidos..."
                            className="form-control "
                            value={pacApe}
                            onChange={(event) => {
                                setPacApe(event.target.value);
                            }}
                        /><br />
                        <div className="row-display">
                            <div className="w-100">
                                Perfil
                                <div className="select-patient">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={pacPerfil}
                                        onChange={(event) => {
                                            setPacPerfil(event.target.value);
                                        }}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="OPE-1">OPE-1</option>
                                        <option value="OPE-2">OPE-2</option>
                                        <option value="OPE-3">OPE-3</option>
                                    </select>
                                </div>
                            </div>
                        </div><br />

                         <div className="row-display"> 
                            <div className="w-5">
                                Documento
                                <div className="select-tipoDoc">
                                    <select
                                        disabled
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={tipoDoc}
                                        onChange={(event) => {
                                            setTipoDoc(event.target.value);
                                        }}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="dni"  >DNI</option>
                                        <option value="carnet">C. Extranjeria</option>
                                        <option value="pasaporte">Pasaporte</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-80">
                                <input
                                    readOnly
                                    type="text"
                                    placeholder="Ingrese num doc..."
                                    className="form-control mt-4"
                                    value={numDoc}
                                    minLength={paciente.tipoDoc === "carnet" ? 12 : 1}
                                    maxLength={paciente.tipoDoc === "dni" ? 8 : 12}
                                    pattern={paciente.tipoDoc === "dni" ? "[0-9]{8}" : "[A-Za-z0-9]{1,12}"}
                                    onChange={(event) => {
                                        setNumDoc(event.target.value);
                                    }}
                                />
                            </div>
                        </div><br />

                        <div className="row-display">
                            <div className="w-47">
                                F. Nacimiento
                                <input
                                    readOnly
                                    type="date"
                                    className="form-control"
                                    value={pacFecNac}
                                    onChange={(event) => {
                                        setPacFecNac(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="w-47">
                                Telefono celular
                                <input
                                    type="text"
                                    pattern="[0-9]{9}"
                                    maxLength="9"
                                    className="form-control"
                                    value={pacTelef}
                                    onChange={(event) => {
                                        setPacTelef(event.target.value);
                                    }}
                                />
                            </div>
                        </div><br />
                        <input
                            type="text"
                            placeholder="Ingrese nombre de su empresa..."
                            className="form-control "
                            value={pacEmpre}
                            onChange={(event) => {
                                setPacEmpre(event.target.value);
                            }}
                        />
                        <div className="register-button buttons pb-0">
                            <button
                                type="button"
                                className="button1 d-flex mx-auto"
                                onClick={editPac}
                            >
                                ACTUALIZAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
}
