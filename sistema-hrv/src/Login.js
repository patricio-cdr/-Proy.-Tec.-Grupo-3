import React from 'react'
import logo from './assets/logo.png';
import './Login.css';

export default function Login() {
    return (
        <section id='login' className='container mx-auto'>
            <div className='pt-5 pb-5'>
                <h2 className='text-center'>CLINICA</h2>
                <div className='form-login mx-auto'>
                    <div className='mt-5 position-relative'>
                        <div className='logo position-absolute top-0 start-50 translate-middle'>
                            <img src={logo} alt="" className='img-fluid w-100 h-100' />
                        </div>
                        <input type="email" placeholder='Ingrese su correo electrónico' className="form-control" id="exampleInputEmail1" /><br />
                        <input type="password" placeholder='Ingrese su contraseña' className="form-control mt-3" id="exampleInputPassword1" />
                        <div className="login-button">
                            <button type='button' className='button1 d-flex mx-auto'>LOGIN</button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
