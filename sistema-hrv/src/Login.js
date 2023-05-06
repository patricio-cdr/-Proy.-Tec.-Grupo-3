import React from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import {
    signInWithEmailAndPassword,
} from "firebase/auth";
import "./Login.css";
import { auth } from "./firebase-config";



const Login = (props) => {

    //Variables para registrar e iniciar sesion
    //const [registerEmail, setRegisterEmail] = useState("");
    //const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // const register = async () => {
    //     try {
    //         const user = await createUserWithEmailAndPassword(
    //             auth,
    //             registerEmail,
    //             registerPassword
    //         );
    //         //window.open("registrado", "_blank");
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            ).then((fbUser) => {
                props.setUsuario(fbUser);
            });
            //navigate("/Inicio");
        } catch (error) {
            console.log(error.message);
        }
    };    

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
                            value={loginEmail}
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        />
                        <br/>
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
export default Login;