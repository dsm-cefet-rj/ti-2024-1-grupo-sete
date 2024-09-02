import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "../../Assets/logo2-200-recortado.png";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async (email, senha) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/', {
        email,
        senha: senha,
      },
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      console.log(response.data);
      const { token, user } = response.data;
      //console.log("XUXA", response.data);
      console.log('Login bem-sucedido!', token);
      
      localStorage.setItem('token', token);
      console.log("XUXA TOKEN", localStorage.getItem('token'));
      localStorage.setItem('userId', user.id);
      history.push('/');

      
      setEmail("");
      setSenha("");
      setError(""); 

    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || "Erro no login. Tente novamente.");
      } else {
        setError("Erro ao tentar fazer login: " + error.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 
    handleLogin(email, senha);
    //console.log("XUXA", email, senha);
  };

  return (
    <>
      <div className="page-container">
        <HeaderMain />
        <div className="content-wrap">
          <form className="form" onSubmit={handleSubmit}>
            <span className="login-form-title">Bem Vindo!</span>
            <span className="login-form-title">
              <img src={logo} alt="Logo" />
            </span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="focus-input" data-placeholder="E-mail"></span>
            </div>

            <div className="wrap-input">
              <input
                className={senha !== "" ? "has-val input" : "input"}
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta?</span>
              <a className="txt2" href="#">
              <Link className="nav-link" aria-current="page" to="/clientes">Criar conta.</Link>
              </a>
            </div>
          </form>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Login;