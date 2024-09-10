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
  const [errors, setErrors] = useState({});
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
    
    // Resetar erros
    const validationErrors = {};

    // Validações
    if (cliente.nome.split(" ").length < 2) {
      validationErrors.nome = "Por favor, insira o nome e sobrenome.";
    }

    // Regex para validar o formato de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cliente.email)) {
      validationErrors.email = "Por favor, insira um e-mail válido.";
    }

    // Regex para validar o formato de telefone (exemplo: (99) 99999-9999)
    const telefonePattern = /^\d{2} \d{9}$/;
    if (!telefonePattern.test(cliente.telefone)) {
      validationErrors.telefone = "Por favor, insira um telefone válido no formato 99 999999999.";
    }

    // Valida o endereço
    const enderecoParts = cliente.endereco.split(", ");
    if (enderecoParts.length < 2) {
      validationErrors.endereco = "Por favor, insira o endereço no formato 'Cidade, Rua, Número'.";
    }

    // Valida a senha
    if (cliente.senha.length < 6) {
      validationErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Envia os dados para a API
    axios.post("http://localhost:5000/user", { 
      name: cliente.nome, 
      email: cliente.email, 
      senha: cliente.senha, 
      telefone: cliente.telefone, 
      endereco: cliente.endereco 
    })
      .then((response) => {
        console.log("Cliente cadastrado com sucesso:", response.data);
        setSubmitted(true);
        toast.success("Cadastro bem-sucedido!", {
          position: "top-center",
          autoClose: 2700,
        });
        timer();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar cliente:", error.response?.data?.message || error.message);
        toast.error("Erro ao cadastrar cliente. Tente novamente.", {
          position: "top-center",
          autoClose: 2700,
        });
      });
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
    setErrors({ ...errors, [name]: "" }); // Limpa o erro ao mudar o valor
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
            {errors.nome && <p className={styles.error}>{errors.nome}</p>}
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
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Telefone"
              name="telefone"
              placeholder="Insira o telefone (ex: (99) 99999-9999)"
              handleOnChange={handleChange}
              value={cliente.telefone}
            />
            {errors.telefone && <p className={styles.error}>{errors.telefone}</p>}
          </div>

          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Endereço"
              name="endereco"
              placeholder="Insira seu endereço (Cidade, Rua, Número)"
              handleOnChange={handleChange}
              value={cliente.endereco}
            />
            {errors.endereco && <p className={styles.error}>{errors.endereco}</p>}
          </div>

          <div className={styles.formGroup}>
            <Input
              type="password"
              text="Senha"
              name="senha"
              placeholder="Crie uma senha (mínimo 6 caracteres)"
              handleOnChange={handleChange}
              value={cliente.senha}
            />
            {errors.senha && <p className={styles.error}>{errors.senha}</p>}
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
