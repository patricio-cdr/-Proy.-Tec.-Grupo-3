import React, { useEffect } from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import "./RegisterP.css";
import { db } from "./firebase-config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function RegisterP() {

    const [pacEmail, setPacEmail] = useState('');
    const [pacNombre, setPacNombre] = useState('');
    const [pacApe, setPacApe] = useState('');
    const [pacDni, setPacDni] = useState('');
    const [pacEmpre, setPacEmpre] = useState('');
    const [pacFecNac, setPacFecNac] = useState('');
    const [pacTelef, setPacTelef] = useState('');
    const [pacPerfil, setPacPerfil] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const registerPac = async () => {
        try {

            if (!pacEmail ||
                !pacNombre ||
                !pacApe ||
                !pacDni ||
                !pacEmpre ||
                !pacFecNac ||
                !pacTelef ||
                !pacPerfil) {
                setErrorMsg('Por favor, complete todos los campos.');
                setTimeout(() => {
                    setErrorMsg('');
                }, 2000);
                return
            }

            const docData = {
                dni: pacDni,
                email: pacEmail,
                empre: pacEmpre,
                fecNac: pacFecNac,
                nombres: pacNombre,
                apellidos: pacApe,
                telefono: pacTelef,
                perfil: pacPerfil,
            }
            console.log(docData)
            await setDoc(doc(db, "pacientes", pacDni), docData);
            alert("PACIENTE CREADO")

        } catch (error) {
            alert(error.message);
        }
    }


    return (

        <section id="registerP" className="container mx-auto">
            <div className="botones-superiores">
                <Link to="/buscador"><button className="boton-regresar">Regresar</button></Link>
            </div>
            <div className="pt-2 pb-5">
                <div className="form mx-auto">
                    <h2 className="text-center title">Ingrese datos del paciente</h2>
                    <div className="form-content">
                        {errorMsg && <p className="text-danger">{errorMsg}</p>}
                        <input
                            type="email"
                            placeholder="Ingrese su email..."
                            className="form-control"
                            onChange={(event) => {
                                setPacEmail(event.target.value);
                            }}
                        /><br />
                        <input
                            type="text"
                            placeholder="Ingrese sus nombres..."
                            className="form-control mt-3"
                            onChange={(event) => {
                                setPacNombre(event.target.value);
                            }}
                        /><br />
                        <input
                            type="text"
                            placeholder="Ingrese sus apellidos..."
                            className="form-control mt-3"
                            onChange={(event) => {
                                setPacApe(event.target.value);
                            }}
                        /><br />
                        <div className='row-display'>
                            <div className="w-47">
                                Perfil
                                <div className="select-patient">
                                    <select className="form-select" aria-label="Default select example" onChange={(event) => {
                                        setPacPerfil(event.target.value);
                                    }}>
                                        <option selected></option>
                                        <option value="OPE-1">OPE-1</option>
                                        <option value="OPE-2">OPE-2</option>
                                        <option value="OPE-3">OPE-3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-47">
                                DNI
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={(event) => {
                                        setPacDni(event.target.value);
                                    }}
                                />
                            </div>
                        </div><br />
                        <div className='row-display'>
                            <div className="w-47">
                                F. nacimiento
                                <input
                                    type="date"
                                    className="form-control"
                                    onChange={(event) => {
                                        setPacFecNac(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="w-47">
                                Telefono celular
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={(event) => {
                                        setPacTelef(event.target.value);
                                    }}
                                />
                            </div>
                        </div><br />
                        <input
                            type="text"
                            placeholder="Ingrese nombre de su empresa..."
                            className="form-control mt-3"
                            onChange={(event) => {
                                setPacEmpre(event.target.value);
                            }}
                        />
                        <div className="register-button buttons pb-0">
                            <button type='button' className='button1 d-flex mx-auto' onClick={registerPac}>CREAR Y GENERAR HRV</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
