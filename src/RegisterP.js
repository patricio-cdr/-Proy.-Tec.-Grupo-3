//import React, { useEffect } from "react";
import React, { useState } from "react";
//import logo from "./assets/logo.png";
//import { useState } from "react";
import "./RegisterP.css";
import { db } from "./firebase-config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RegisterP() {
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

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const registerPac = async () => {
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
        setErrorMsg("Por favor, complete todos los campos.");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
        return;
      }

      const docData = {
        tipoDoc: tipoDoc,
        numDoc: numDoc,
        email: pacEmail,
        empre: pacEmpre,
        fecNac: pacFecNac,
        nombres: pacNombre,
        apellidos: pacApe,
        telefono: pacTelef,
        perfil: pacPerfil,
      };
      console.log(docData);
      await setDoc(doc(db, "pacientes", numDoc), docData);
      alert("Paciente registrado con exito.");
      navigate("/buscador");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section id="registerP" className="container mx-auto">
      <div className="botones-superiores">
        <Link to="/buscador">
          <button className="boton-regresar">Regresar</button>
        </Link>
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
            />
            <input
              type="text"
              placeholder="Ingrese sus nombres..."
              className="form-control mt-3"
              onChange={(event) => {
                setPacNombre(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Ingrese sus apellidos..."
              className="form-control mt-3"
              onChange={(event) => {
                setPacApe(event.target.value);
              }}
            />
            <div className="row-display">
              <div className="w-100">
                Perfil
                <div className="select-patient">
                  <select
                    className="form-select"
                    aria-label="Default select example"
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
            </div>

            <div className="row-display">
              <div className="w-5">
                Documento
                <div className="select-tipoDoc">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => {
                      setTipoDoc(event.target.value);
                    }}
                  >
                    <option value="">Seleccionar</option>
                    <option value="dni">DNI</option>
                    <option value="carnet">C. Extranjeria</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                </div>
              </div>
              <div className="w-80">
                <input
                  type="text"
                  placeholder="Ingrese num doc..."
                  className="form-control mt-4"
                  onChange={(event) => {
                    setNumDoc(event.target.value);
                  }}
                  minLength={tipoDoc === "carnet" ? 12 : 1}
                  maxLength={tipoDoc === "dni" ? 8 : 12}
                  pattern={tipoDoc === "dni" ? "[0-9]{8}" : "[A-Za-z0-9]{1,12}"}                  
                />
              </div>
            </div>

            <div className="row-display">
              <div className="w-47">
                F. Nacimiento
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
                  type="text"
                  pattern="[0-9]{9}"
                  maxLength="9"
                  className="form-control"
                  onChange={(event) => {
                    setPacTelef(event.target.value);
                  }}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Ingrese nombre de su empresa..."
              className="form-control mt-3"
              onChange={(event) => {
                setPacEmpre(event.target.value);
              }}
            />
            <div className="register-button buttons pb-0">
              <button
                type="button"
                className="button1 d-flex mx-auto"
                onClick={registerPac}
              >
                CREAR Y GENERAR HRV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
