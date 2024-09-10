import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import Botaocriarcarro from "../../Components/Form/Botaocriarcarro";
import styles from "./FormUser.css";
import "./FormUser.css";

function FormUser({ handleSubmit, botaotxt, userData }) {
  const [user, setUser] = useState(userData || {});

  const submit = (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.email === "" ||
      user.telefone === "" ||
      user.endereco === ""
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }
    handleSubmit(user);
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  //<h2>Cadastrar user</h2>
  //<h6 style={{textAlign:"center", marginBottom:"25px"}}>Cadastre aqui seu user para ser alugado</h6>

  return (
    <form onSubmit={submit} className="form">
      
      {/* <div className="formGroup">
        <Input
          type="text"
          text="Seu nome"
          name="dono"
          placeholder="Insira o seu nome"
          handleOnChange={handleChange}
          value={user.dono}
        />
      </div> */}
      <div className="formGroup">
        <Input
          type="text"
          text="Usuário"
          name="name"
          placeholder="Insira o modelo do user"
          handleOnChange={handleChange}
          value={user.name}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="E-mail"
          name="email"
          placeholder="Insira o ano de fabricação"
          handleOnChange={handleChange}
          value={user.email}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Telefone"
          name="telefone"
          placeholder="Insira a cidade"
          handleOnChange={handleChange}
          value={user.telefone}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Endereço"
          name="endereco"
          placeholder="Insira o custo por dia de aluguel"
          handleOnChange={handleChange}
          value={user.endereco}
        />
      </div>
      {/*<div className="input-file">
                <Input
                    type="file"
                    text="Foto do user"
                    name="Image"
                    placeholder="Insira uma foto do user"
                    handleOnChange={handleChange}
                    value={user.Image}
                />
            </div>*/}
      <Botaocriarcarro text={botaotxt}/>
    </form>
  );
}

export default FormUser;
