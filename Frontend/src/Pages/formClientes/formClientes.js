import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import styles from "./style.module.css";
import HeaderMain from "../../Components/Header";
import { Button } from "reactstrap";
import Footer from "../../Components/Footer/footer";
import axios from "axios";

const initialClienteData = {
  nome: "",
  email: "",
  telefone: "",
  endereco: "",
  senha: "",
};

function FormClientes() {
  const [cliente, setCliente] = useState(initialClienteData);
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    if (
      cliente.nome === "" ||
      cliente.telefone === "" ||
      cliente.endereco === "" ||
      cliente.email === "" ||
      cliente.senha === ""
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }

    axios.post("http://localhost:5000/user", { name: cliente.nome, email:cliente.email, senha: cliente.senha, telefone: cliente.telefone, endereco: cliente.endereco })
      .then((response) => {
        console.log("Cliente cadastrado com sucesso:", response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar cliente:", error);
      });
  };

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
