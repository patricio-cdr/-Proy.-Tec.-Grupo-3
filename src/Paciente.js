import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from "./firebase-config";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import './Paciente.css';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import completo from "./assets/completo.png";
import incompleto from "./assets/incompleto.png";


export default function Paciente() {
    return (
        <section id='pantalla-paciente' className='container mx-auto mt-5'>
            <h2>Hola </h2>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-examen" role="tabpanel" aria-labelledby="pills-examen-tab" tabindex="0">
                    <table className="table table-paciente mt-5 text-center mx-auto">
                        <thead className='text-uppercase'>
                            <tr>
                                <th scope="col">Exámenes</th>
                                <th scope="col">Completado</th>
                            </tr>
                        </thead>
                        <tbody className='text-capitalize'>
                            <tr>
                                <th scope="row">Triaje</th>
                                <td><img src={completo} alt="" /></td>
                            </tr>
                            <tr>
                                <th scope="row">Osteomuscular</th>
                                <td><img src={incompleto} alt="" /></td>
                            </tr>
                            <tr>
                                <th scope="row">Examen 3</th>
                                <td><img src={completo} alt="" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tab-pane fade" id="pills-mapa" role="tabpanel" aria-labelledby="pills-mapa-tab" tabindex="0">
                    MAPA CLINICA
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
