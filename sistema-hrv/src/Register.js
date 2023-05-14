import React, { useEffect } from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import "./Register.css";

export default function Register() {

    const [registerNames, setRegisterNames] = useState("");
    const [registerLastnames, setRegisterLastnames] = useState("");
    const [registerBirth, setRegisterBirth] = useState("");
    const [registerNumber, setRegisterNumber] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    /*var showDoctor= document.querySelector("#register .select-doctor");
    var showTecnico = document.querySelector("#register .select-tecnico");
    var showRecepcionista = document.querySelector("#register .select-recepcionista");*/

    useEffect(() => {
        document.querySelector("#register .select-doctor").style.display = "none";
        document.querySelector("#register .select-tecnico").style.display = "none";
        document.querySelector("#register .select-recepcionista").style.display = "none";
    })

    const displayDoctor = () => {
        document.querySelector("#register .select-doctor").style.display = "block";
        document.querySelector("#register .select-tecnico").style.display = "none";
        document.querySelector("#register .select-recepcionista").style.display = "none";
    }

    const displayTecnico = () => {
        document.querySelector("#register .select-doctor").style.display = "none";
        document.querySelector("#register .select-tecnico").style.display = "block";
        document.querySelector("#register .select-recepcionista").style.display = "none";
    }

    const displayRecepcionista = () => {
        document.querySelector("#register .select-doctor").style.display = "none";
        document.querySelector("#register .select-tecnico").style.display = "none";
        document.querySelector("#register .select-recepcionista").style.display = "block";
    }

    const selectDoctor = () => {
        return (
            <div className="select-doctor">
                <br /><select className="form-select" aria-label="Default select example">
                    <option selected>Seleccione su especialidad</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        )
    }

    const selectTecnico = () => {
        return (
            <div className="select-tecnico">
                <br /><select className="form-select" aria-label="Default select example">
                    <option selected>Seleccione su especialidad</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        )
    }

    const selectRecepcionista = () => {
        return (
            <div className="select-recepcionista">
                <br /><select className="form-select" aria-label="Default select example">
                    <option selected>Seleccione su turno</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        )
    }

    return (

        <section id="register" className="container mx-auto">
            <div className="pt-5 pb-5">
                <div className="form mx-auto">
                    <h2 className="position-relative text-center title">Regístrate</h2>
                    <div className="mt-4 position-relative form-content">
                        <div className="logo position-absolute top-0 start-50 translate-middle">
                            <img src={logo} alt="" className="img-fluid w-100 h-100 logo-img" />
                        </div>
                        <input
                            type="email"
                            placeholder="Ingrese su correo electrónico"
                            className="form-control"
                        /><br />
                        <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            className="form-control mt-3"
                        /><br />
                        <input
                            type="text"
                            placeholder="Ingrese sus nombres..."
                            className="form-control mt-3"
                        /><br />
                        <input
                            type="text"
                            placeholder="Ingrese sus apellidos..."
                            className="form-control mt-3"
                        /><br />
                        <div className='row-display'>
                            <div>
                                Fecha de nacimiento
                                <input
                                    type="date"
                                    className="form-control"
                                />
                            </div>
                            <div>
                                Celular
                                <input
                                    type="number"
                                    className="form-control"
                                    min="100000000"
                                    max="999999999"
                                />
                            </div>
                        </div><br />
                        <div className='d-flex justify-content-center'>
                            <div className='row-display flex-column'>
                                Doctor
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"
                                    onClick={() => displayDoctor()} />
                            </div>
                            <div className='row-display flex-column'>
                                Técnico
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option2"
                                    onClick={() => displayTecnico()} />
                            </div>
                            <div className='row-display flex-column'>
                                Recepcionista
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option3"
                                    onClick={() => displayRecepcionista()} />
                            </div>
                        </div>
                        {selectDoctor()}
                        {selectTecnico()}
                        {selectRecepcionista()}
                        <div className="register-button buttons">
                            <button type='button' className='button1 d-flex mx-auto'>REGISTRAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
