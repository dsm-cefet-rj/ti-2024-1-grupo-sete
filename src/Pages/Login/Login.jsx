import React, { useState } from "react";
import './Login.css'
import logo from '../../Assets/logo2-200-recortado.png'

function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <body>
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form">
                        <span className="login-form-title">Bem Vindo!</span>
                        <span className="login-form-title">
                            <img src={logo} alt="Logo" />
                        </span>

                        <div className="wrap-input">
                            <input 
                            className={email !== "" ? 'has-val input' : 'input'} 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            />
                            <span className="focus-input" data-placeholder="E-mail"></span>
                        </div>

                        <div className="wrap-input">
                            <input
                             className={senha !== "" ? 'has-val input' : 'input'} 
                             type="Senha" 
                             value={senha}
                            onChange={e => setSenha(e.target.value)}
                             />
                            <span className="focus-input" data-placeholder="Senha"></span>
                        </div>

                        <div className="container-login-form-btn">
                            <button className="login-form-btn">Login</button>
                        </div>

                        <div className="text-center">
                            <span className="txt1">Não possui conta?</span>

                            <a className="txt2 "href="#">Criar conta.</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        </body>
    )
}

export default Login