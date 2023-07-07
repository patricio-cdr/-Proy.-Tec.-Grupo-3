import React from "react";
import logo from "./assets/logo.png";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { auth } from "./firebase-config";
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './Loader.js';

const Login = (props) => {
  
  //Variables para registrar e iniciar sesion
  //const [registerEmail, setRegisterEmail] = useState("");
  //const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState('');



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
  /*
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
*/
  const validateForm = () => {
    if (!loginEmail || !loginPassword) {
      setError('Por favor, complete todos los campos.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginEmail)) {
      setError('Por favor, ingrese un email válido.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return false
    }

    // Completar demas lógica de validación de email y contraseña aquí

    return true;
  };

  const login = async () => {
    
    let attempts = 5; // Número máximo de intentos
    setError('');
    try {
      if (validateForm()) {
        while (attempts > 0) {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          // Inicio de sesión exitoso
          props.setUsuario(user);
          //navigate("/Inicio");
          break; // Salir del bucle while
        }
        if (attempts === 0) {
          // Si se alcanza el límite de intentos, muestra un mensaje de error con alert
          alert("Límite de intentos alcanzado");
        }
      }

    } catch (error) {
      alert(error.message); // Mostrar mensaje de error con alert
      attempts--; // Disminuir el contador de intentos en caso de error
      console.log("consulte a sistemas");
    }
  };

    


  return (
    <section id="login" className="container mx-auto">
      <Loader/>
      <div className="pt-5 pb-5">
        <div className="form mx-auto">
          <h2 className="position-relative text-center title">CLINICA</h2>
          <div className="mt-4 position-relative form-content">
            <div className="logo position-absolute top-0 start-50 translate-middle">
              <img
                src={logo}
                alt=""
                className="img-fluid w-100 h-100 logo-img"
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              className="form-control"
              value={loginEmail}
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
            
                
           
            <div className="row-display buttons">
            
            
              <div className="register-button">
              <Link to="/register">
                  <button id="register-button" className="button2">
                    REGISTRAR
                  </button>
                  </Link>

              </div>
              
              <div className="login-button">
                <button id="login-button" className="button1" onClick={login}>
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
           
}     
  

export default Login;
