import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import Botaocriarcarro from "../../Components/Form/Botaocriarcarro";
import styles from "./FormUser.css";
import "./FormUser.css";

/**
 * Formulário de criação/edição de usuários.
 * @component
 * @param {Object} props
 * @param {Function} props.handleSubmit - Função chamada ao enviar o formulário.
 * @param {string} props.botaotxt - Texto exibido no botão de submissão.
 * @param {Object} [props.userData] - Dados do usuário para edição (opcional).
 * @returns {React.ReactElement} Formulário de criação/edição de usuário.
 * @description
 * O 'FormUser' é um componente que exibe um formulário para criar ou editar informações de um usuário.
 * O formulário inclui campos para nome, e-mail, telefone e endereço, com validação para garantir que todos os campos sejam preenchidos antes da 
 * submissão.
 * Ao submeter o formulário, a função 'handleSubmit' é chamada com os dados do usuário.
 */
function FormUser({ handleSubmit, botaotxt, userData }) {
  // Estado para os dados do usuário, inicializando com os dados passados via props ou um objeto vazio
  const [user, setUser] = useState(userData || {});

   /**
   * Função de submissão do formulário.
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de formulário.
   * @description 
   * A função previne o comportamento padrão de recarregar a página ao enviar o formulário.
   * Se algum campo estiver vazio, a função exibe um erro no console. Caso contrário, chama 'handleSubmit' com os dados do usuário.
   */
  const submit = (e) => {
    e.preventDefault();

    // Validação básica para verificar se todos os campos foram preenchidos
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

  /**
   * Função para atualizar o estado do usuário ao alterar os inputs.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança dos inputs.
   * @description
   * Atualiza dinamicamente os valores dos campos do formulário.
   */
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
