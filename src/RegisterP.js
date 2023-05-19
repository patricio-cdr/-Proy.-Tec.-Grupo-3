import React, { useEffect } from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import "./RegisterP.css";
export default function RegisterP() {

    return (

        <section id="registerP" className="container mx-auto">
            <div className="pt-5 pb-5">
                <div className="form mx-auto">
                    <h2 className="text-center title">Ingrese datos del paciente</h2>
                    <div className="form-content">
                        <input
                            type="email"
                            placeholder="Ingrese sus nombres..."
                            className="form-control"
                        /><br />
                        <input
                            type="password"
                            placeholder="Ingrese sus apellidos..."
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
                            <div className="w-47">
                                Perfil
                                <div className="select-patient">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected></option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-47">
                                DNI
                                <input
                                    type="number"
                                    className="form-control"
                                />
                            </div>
                        </div><br />
                        <div className='row-display'>
                            <div className="w-47">
                                F. nacimiento
                                <input
                                    type="date"
                                    className="form-control"
                                />
                            </div>
                            <div className="w-47">
                                Telefono celular
                                <input
                                    type="number"
                                    className="form-control"
                                />
                            </div>
                        </div><br />
                        <input
                            type="email"
                            placeholder="Ingrese nombre de su empresa..."
                            className="form-control mt-3"
                        />
                        <div className="register-button buttons pb-0">
                            <button type='button' className='button1 d-flex mx-auto'>CREAR Y GENERAR HRV</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
