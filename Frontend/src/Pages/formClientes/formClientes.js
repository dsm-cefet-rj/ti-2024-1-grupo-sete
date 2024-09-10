import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import styles from "./style.module.css";
import HeaderMain from "../../Components/Header";
import { Button } from "reactstrap";
import Footer from "../../Components/Footer/footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

/**
 * Dados iniciais do cliente.
 * @type {Object}
 * @property {string} nome - Nome completo do cliente.
 * @property {string} email - Endereço de e-mail do cliente.
 * @property {string} telefone - Número de telefone do cliente.
 * @property {string} endereco - Endereço do cliente.
 * @property {string} senha - Senha do cliente.
 */
const initialClienteData = {
  nome: "",
  email: "",
  telefone: "",
  endereco: "",
  senha: "",
};

/**
 * Componente para o formulário de cadastro de clientes.
 * @returns {React.ReactElement} O formulário de cadastro de clientes.
 * @description
 * O componente 'FormClientes' é utilizado para criar um novo cliente. Ele exibe um formulário com campos para nome, e-mail, telefone, endereço e 
 * senha.
 * Quando o formulário é enviado, ele valida se todos os campos obrigatórios estão preenchidos e envia os dados do cliente para a API.
 * Após o envio, o usuário é redirecionado para a página de login após um intervalo de tempo e recebe uma notificação de sucesso.
 */
function FormClientes() {
  const [cliente, setCliente] = useState(initialClienteData);

  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  /**
   * Função para redirecionar o usuário após um intervalo de tempo.
   */
  const timer = () => {
    setTimeout(() => {
      history.push('/login');  // Redireciona após o tempo definido
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Isso adiciona uma rolagem suave
      });
    }, 3000);
  };

  /**
   * Função para lidar com o envio do formulário.
   * @param {React.FormEvent} e - O evento de envio do formulário.
   */
  const submit = (e) => {
    e.preventDefault();
    
    if (
      cliente.nome === "" ||
      cliente.telefone === "" ||
      cliente.endereco === "" ||
      cliente.email === "" ||
      cliente.senha === ""
    ) {
      toast.error("Por favor, preencha todos os campos.", {
        position: "top-center",
        autoClose: 2700,
    }
      );
      console.error("Por favor, preencha todos os campos.");

      return;
    }

    axios.post("http://localhost:5000/user", { name: cliente.nome, email:cliente.email, senha: cliente.senha, telefone: cliente.telefone, endereco: cliente.endereco })

      .then((response) => {
        console.log("Cliente cadastrado com sucesso:", response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar cliente:", error.response.data.message);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 2700,
          }
        );
      }
    );

    //Notificação
        toast.success("Cadastro bem-sucedido!", {
          position: "top-center",
          autoClose: 2700,
        });
        timer();
  };


  /**
   * Função para lidar com mudanças nos campos do formulário.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança do campo.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });

  };

  return (
    <>
      <HeaderMain />
      <ToastContainer />
      {submitted ? (
        <div className={styles.thankYouMessage}>
          <p>Enviamos um e-mail para confirmação.</p>
        </div>
      ) : (
        <form onSubmit={submit} className={styles.form}>
          <h2>Cadastro de Clientes</h2>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Nome"
              name="nome"
              placeholder="Insira o nome completo"
              handleOnChange={handleChange}
              value={cliente.nome}
            />

          </div>
          <div className={styles.formGroup}>
            <Input
              type="email"
              text="E-mail"
              name="email"
              placeholder="Insira o endereço de e-mail"
              handleOnChange={handleChange}
              value={cliente.email}
            />

          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Telefone"
              name="telefone"
              placeholder="Insira o telefone"
              handleOnChange={handleChange}
              value={cliente.telefone}
            />

          </div>

          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Endereço"
              name="endereco"
              placeholder = "Insira seu endereço"
              handleOnChange={handleChange}
              value={cliente.endereco}
            />

          </div>

          <div className={styles.formGroup}>
            <Input
              type="password"
              text="Senha"
              name="senha"
              placeholder="Crie uma senha"
              handleOnChange={handleChange}
              value={cliente.senha}
            />

          </div>
          <div className={styles.buttonContainer}>
            <Button type="submit">Criar Conta</Button>
          </div>
        </form>
      )}
      <Footer className="footer" />
    </>
  );
}

export default FormClientes;