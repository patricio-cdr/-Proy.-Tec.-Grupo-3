import React, { useEffect } from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import "./Register.css";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  /*
    const [registerNames, setRegisterNames] = useState("");
    const [registerLastnames, setRegisterLastnames] = useState("");
    const [registerBirth, setRegisterBirth] = useState("");
    const [registerNumber, setRegisterNumber] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    */
    
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {    
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );    
      if(user){
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /*var showDoctor= document.querySelector("#register .select-doctor");
    var showTecnico = document.querySelector("#register .select-tecnico");
    var showRecepcionista = document.querySelector("#register .select-recepcionista");*/
/*
  useEffect(() => {
    document.querySelector("#register .select-doctor").style.display = "none";
    document.querySelector("#register .select-tecnico").style.display = "none";
    document.querySelector("#register .select-recepcionista").style.display =
      "none";
  });

  const displayDoctor = () => {
    document.querySelector("#register .select-doctor").style.display = "block";
    document.querySelector("#register .select-tecnico").style.display = "none";
    document.querySelector("#register .select-recepcionista").style.display =
      "none";
  };

  const displayTecnico = () => {
    document.querySelector("#register .select-doctor").style.display = "none";
    document.querySelector("#register .select-tecnico").style.display = "block";
    document.querySelector("#register .select-recepcionista").style.display =
      "none";
  };

  const displayRecepcionista = () => {
    document.querySelector("#register .select-doctor").style.display = "none";
    document.querySelector("#register .select-tecnico").style.display = "none";
    document.querySelector("#register .select-recepcionista").style.display =
      "block";
  };

  const selectDoctor = () => {
    return (
      <div className="select-doctor">
        <br />
        <select className="form-select" aria-label="Default select example">
          <option selected>Seleccione su especialidad</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    );
  };

  const selectTecnico = () => {
    return (
      <div className="select-tecnico">
        <br />
        <select className="form-select" aria-label="Default select example">
          <option selected>Seleccione su especialidad</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    );
  };

  const selectRecepcionista = () => {
    return (
      <div className="select-recepcionista">
        <br />
        <select className="form-select" aria-label="Default select example">
          <option selected>Seleccione su turno</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    );
  };
*/
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
              placeholder="Ingrese su correo electrónico"
              className="form-control"              
              value={registerEmail}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="form-control mt-3"              
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />                   
            
            <div className="register-button buttons">
              <button id="register-button" type="button" className="button1 d-flex mx-auto" onClick={register}>
                REGISTRAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
