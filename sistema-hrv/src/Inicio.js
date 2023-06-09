
import React from 'react'
import logo from './assets/logo.png';
import './Login.css';
import { auth } from './firebase-config';

function Inicio() {

    const signOut = () => {
        auth.signOut();
    }

  return (
    <section id='inicio-box' className='container  py-5 px-5'>
        <div className="log-out-box text-end">
            <button onClick={signOut} type='button' id="log-out" className='btn-logout'>Cerrar sesion</button>
        </div>
        <div className="d-flex inicio-box-title">
            <div className=''>
                <img src={logo} alt="" className='img-fluid' />
            </div>
            <div>
                <h2 className='text-center t-b'>BIENVENIDOS</h2>
            </div>
        </div>
        <div className=' d-flex justify-content-between'>  
            <button type='button' id="crear-hrv" className='btn-hrv'>CREAR HRV</button>
            <button type='button' id="buscar-paciente" className='btn-buscar-p'>BUSCAR PACIENTE</button>
        </div>
    </section>
  )
}

export default Inicio;

