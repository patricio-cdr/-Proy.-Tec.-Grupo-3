//import React, { useEffect } from "react";
import React from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth, db, dbCollection, dbDoc, dbSet } from "./firebase-config";
import { auth, db } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
    const [registerNames, setRegisterNames] = useState("");
    const [registerLastnames, setRegisterLastnames] = useState("");
    const [registerBirth, setRegisterBirth] = useState("");
    const [registerNumber, setRegisterNumber] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedTurn, setSelectedTurn] = useState("");

    const navigate = useNavigate();

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            if (userCredential && userCredential.user) {
                const { uid } = userCredential.user;
                await saveUserData(uid);
                navigate("/");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const saveUserData = async (uid) => {
        const userData = {
            nombres: registerNames,
            apellidos: registerLastnames,
            fec_nacimiento: registerBirth,
            telefono: registerNumber,
            uid: uid,
        };

        if (selectedOption === "doctor") {
            userData.especialidad = selectedSpecialty;
            //await dbCollection(db, "doctor").dbDoc(uid).set(userData);
            //await doc(db, "doctor", uid).set(userData);
            await setDoc(doc(db, "doctor", uid), userData);
        } else if (selectedOption === "tecnico") {
            userData.area = selectedArea;
            //await dbCollection(db, "tecnico").dbDoc(uid).set(userData);
            //await doc(db, "tecnico", uid).set(userData);
            await setDoc(doc(db, "tecnico", uid), userData);
        } else if (selectedOption === "recepcionista") {
            userData.turno = selectedTurn;
            //await dbCollection(db, "recepcionista").dbDoc(uid).set(userData);
            //await doc(db, "recepcionista", uid).set(userData);
            await setDoc(doc(db, "recepcionista", uid), userData);
        }
    };

    const displayDoctor = () => {
        setSelectedOption("doctor");
    };

    const displayTecnico = () => {
        setSelectedOption("tecnico");
    };

    const displayRecepcionista = () => {
        setSelectedOption("recepcionista");
    };

    const selectDoctor = () => {
        if (selectedOption === "doctor") {
            return (
                <div className="select-doctor">
                    <br />
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedSpecialty}
                        onChange={(event) => {
                            setSelectedSpecialty(event.target.value);
                        }}
                    >
                        <option value="" defaultValue>
                            Seleccione su especialidad
                        </option>
                        <option value="Cardiologia">Cardiologia</option>
                        <option value="Dermatologia">Dermatologia</option>
                        <option value="Gastroenterologia">Gastroenterologia</option>
                    </select>
                </div>
            );
        }
        return null;
    };

    const selectTecnico = () => {
        if (selectedOption === "tecnico") {
            return (
                <div className="select-tecnico">
                    <br />
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedArea}
                        onChange={(event) => {
                            setSelectedArea(event.target.value);
                        }}
                    >
                        <option value="" defaultValue>
                            Seleccione su area
                        </option>
                        <option value="Triage">Triage</option>
                        <option value="Laboratorio">Laboratorio</option>
                        <option value="Enfermeria">Enfermeria</option>
                    </select>
                </div>
            );
        }
        return null;
    };

    const selectRecepcionista = () => {
        if (selectedOption === "recepcionista") {
            return (
                <div className="select-recepcionista">
                    <br />
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedTurn}
                        onChange={(event) => {
                            setSelectedTurn(event.target.value);
                        }}
                    >
                        <option value="" defaultValue>
                            Seleccione un turno
                        </option>
                        <option value="Dia">Dia</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noche">Noche</option>
                    </select>
                </div>
            );
        }
        return null;
    };

    return (
        <section id="register" className="container mx-auto">
            <div className="pt-5 pb-5">
                <div className="form mx-auto">
                    <h2 className="position-relative text-center title">Regístrate</h2>
                    <div className="mt-4 position-relative form-content">
                        <div className="logo position-absolute top-0 start-50 translate-middle">
                            <img
                                src={logo}
                                alt=""
                                className="img-fluid w-100 h-100 logo-img"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Ingrese un email..."
                            className="form-control"
                            value={registerEmail}
                            onChange={(event) => {
                                setRegisterEmail(event.target.value);
                            }}
                            required
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            title="Por favor, ingrese un email válido"
                        /><br />
                        <input
                            type="password"
                            placeholder="Ingrese una contraseña..."
                            className="form-control "
                            onChange={(event) => {
                                setRegisterPassword(event.target.value);
                            }}
                            required
                            minLength={6}
                        /><br />
                        <input
                            type="text"
                            placeholder="Ingrese sus nombres..."
                            className="form-control "
                            value={registerNames}
                            onChange={(event) => {
                                setRegisterNames(event.target.value);
                            }}
                            required
                            minLength={3}
                        /><br />
                        <input
                            type="text"
                            placeholder="Ingrese sus apellidos..."
                            className="form-control "
                            value={registerLastnames}
                            onChange={(event) => {
                                setRegisterLastnames(event.target.value);
                            }}
                            required
                            minLength={3}
                        /><br />
                        <div className="row-display">
                            <div>
                                Fecha de nacimiento
                                <input
                                    type="date"
                                    className="form-control"
                                    value={registerBirth}
                                    onChange={(event) => {
                                        setRegisterBirth(event.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                Celular
                                <input
                                    type="text"
                                    pattern="[0-9]{9}"
                                    maxLength="9"
                                    className="form-control"
                                    placeholder="Numero..."
                                    value={registerNumber}
                                    onChange={(event) => {
                                        setRegisterNumber(event.target.value);
                                    }}
                                    required
                                />
                            </div>
                        </div><br />
                        <div className="d-flex justify-content-center">
                            <div className="row-display flex-column">
                                Doctor
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="option1"
                                    onClick={() => displayDoctor()}
                                />
                            </div>
                            <div className="row-display flex-column">
                                Técnico
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="option2"
                                    onClick={() => displayTecnico()}
                                />
                            </div>
                            <div className="row-display flex-column">
                                Recepcionista
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="option3"
                                    onClick={() => displayRecepcionista()}
                                />
                            </div>
                        </div>
                        {selectDoctor()}
                        {selectTecnico()}
                        {selectRecepcionista()}
                        <div className="register-button buttons">
                            <button
                                type="button"
                                className="button1 d-flex mx-auto"
                                onClick={register}
                            >
                                REGISTRAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
