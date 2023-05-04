import React from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "./Login.css";
import { auth } from "./firebase-config";

export default function Login() {
    //Variables para registrar e iniciar sesion
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  //Revisar -> Guardar usuario logueado 
/*
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
*/
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      //window.open("registrado", "_blank");
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //Cambiar esto para que cuando el usuario se logue pase a la siguiente pagina
      window.open("logueado", "_blank");
    } catch (error) {
      console.log(error.message);
    }
  };
  //Revisar -> Cerrar sesion
/*
  const logout = async () => {
    await signOut(auth);
  };
*/
  return (
    <section id="login" className="container mx-auto">
      <div className="pt-5 pb-5">
        <h2 className="text-center">CLINICA</h2>
        <div className="form-login mx-auto">
          <div className="mt-5 position-relative">
            <div className="logo position-absolute top-0 start-50 translate-middle">
              <img src={logo} alt="" className="img-fluid w-100 h-100" />
            </div>
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              className="form-control"              
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="form-control mt-3"              
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <div className="login-button">
              <button                
                className="button1 d-flex mx-auto"
                onClick={login}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}