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
  cpf: "",
  telefone: "",
  endereco: { rua: "", numero: "", estado: "" },
  dataNasc: "",
  cnh: "",
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
      cliente.cpf === "" ||
      cliente.endereco.rua === "" ||
      cliente.endereco.numero === "" ||
      cliente.endereco.estado === "" ||
      cliente.dataNasc === "" ||
      cliente.cnh === "" ||
      cliente.email === "" ||
      cliente.senha === ""
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }

    axios
      .post("http://localhost:5000/api/newClientes", cliente)
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
    if (name in cliente.endereco) {
      setCliente({
        ...cliente,
        endereco: {
          ...cliente.endereco,
          [name]: value,
        },
      });
    } else {
      setCliente({
        ...cliente,
        [name]: value,
      });
    }
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
              text="CPF"
              name="cpf"
              placeholder="Insira o CPF"
              handleOnChange={handleChange}
              value={cliente.cpf}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Rua"
              name="rua"
              placeholder="Insira a rua"
              handleOnChange={handleChange}
              value={cliente.endereco.rua}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Número"
              name="numero"
              placeholder="Insira o número"
              handleOnChange={handleChange}
              value={cliente.endereco.numero}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Estado"
              name="estado"
              placeholder="Insira o estado"
              handleOnChange={handleChange}
              value={cliente.endereco.estado}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="Data de Nascimento"
              name="dataNasc"
              placeholder="Insira a data de nascimento"
              handleOnChange={handleChange}
              value={cliente.dataNasc}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="text"
              text="CNH"
              name="cnh"
              placeholder="Insira número de CNH"
              handleOnChange={handleChange}
              value={cliente.cnh}
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
