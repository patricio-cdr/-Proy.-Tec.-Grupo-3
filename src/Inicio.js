
import React from 'react'
import logo from './assets/logo.png';
import './Login.css';
import { auth } from './firebase-config';
import { Link } from "react-router-dom";

function Inicio() {

    const signOut = () => {
        auth.signOut();
    }

  return (
    <section id='inicio-box' className='container  py-5 px-5'>
        <div className="log-out-box text-end">
            <button onClick={signOut} type='button' id="log-out" className='btn-logout'>CERRAR SESIÓN</button>
        </div>
        <div className="d-flex inicio-box-title mx-auto justify-content-center">
            <div className='logo-img-inicio'>
                <img src={logo} alt="" className='img-fluid' />
            </div>
            <div>
                <h2 className='text-center t-b'>BIENVENIDOS</h2>
            </div>
        </div>
        <div className='d-flex justify-content-between pt-3'>  
          <Link to="/buscador"><button type='button' id="crear-hrv" className='btn-hrv'>CREAR HRV</button></Link>
          <Link to="/hrvPaciente"><button type='button' id="buscar-paciente" className='btn-buscar-p'>BUSCAR PACIENTE</button></Link>
        </div>
    </section>
  )
}

export default Inicio;

