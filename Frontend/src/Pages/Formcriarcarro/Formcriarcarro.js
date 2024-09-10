import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import Botaocriarcarro from "../../Components/Form/Botaocriarcarro";
import styles from "./Formcriarcarro.css";
import "./Formcriarcarro.css";

/**
 * Componente para criar ou editar um carro.
 * @param {Object} props - Propriedades do componente.
 * @param {Function} props.handleSubmit - Função chamada ao submeter o formulário com os dados do carro.
 * @param {string} props.botaotxt - Texto para o botão de submit.
 * @param {Object} [props.carroData] - Dados do carro para edição (opcional).
 * @returns {React.ReactElement} O formulário para criar ou editar um carro.
 * @description
 * O componente 'Formcriarcarro' é utilizado para criar ou editar um carro. Ele exibe um formulário com campos para o modelo do carro, ano de 
 * fabricação, cidade, preço por dia, detalhes e foto do carro.
 * Quando o formulário é enviado, ele verifica se todos os campos obrigatórios estão preenchidos e chama a função 'handleSubmit' com os dados do 
 * carro.
 * O componente utiliza um estado local para gerenciar os dados do carro e atualiza este estado conforme o usuário preenche os campos do formulário.
 */
function Formcriarcarro({ handleSubmit, botaotxt, carroData }) {
  const [carro, setCarro] = useState(carroData || {});

  /**
   * Função para lidar com o envio do formulário.
   * @param {React.FormEvent} e - O evento de envio do formulário.
   */
  const submit = (e) => {
    e.preventDefault();
    if (
      carro.detalhes === "" ||
      carro.preco === "" ||
      carro.cidade === "" ||
      carro.modelo === "" ||
      carro.fotoLink1 === "" ||
      carro.enderecoRetirada === ""
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }
    handleSubmit(carro);
  };

  /**
   * Função para lidar com mudanças nos campos do formulário.
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança do campo.
   */
  function handleChange(e) {
    setCarro({ ...carro, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={submit} className="form">
      <div className="formGroup">
        <Input
          type="text"
          text="Modelo do carro"
          name="modelo"
          placeholder="Insira o modelo do carro"
          handleOnChange={handleChange}
          value={carro.modelo}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Ano de fabricação"
          name="ano"
          placeholder="Insira o ano de fabricação"
          handleOnChange={handleChange}
          value={carro.ano}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Cidade"
          name="cidade"
          placeholder="Insira a cidade"
          handleOnChange={handleChange}
          value={carro.cidade}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Preço por dia"
          name="precoPorDia"
          placeholder="Insira o custo por dia de aluguel"
          handleOnChange={handleChange}
          value={carro.precoPorDia}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Mais detalhes sobre o carro"
          name="detalhes"
          placeholder="Insira detalhes sobre o carro"
          handleOnChange={handleChange}
          value={carro.detalhes}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Foto"
          name="fotoLink1"
          placeholder="Insira detalhes sobre o carro"
          handleOnChange={handleChange}
          value={carro.fotoLink1}
        />
      </div>
      <div className="formGroup">
        <Input
          type="text"
          text="Endereço de retirada"
          name="enderecoRetirada"
          placeholder="Insira endereço de retirada do seu carro"
          handleOnChange={handleChange}
          value={carro.enderecoRetirada}
        />
      </div>
      <Botaocriarcarro text={botaotxt}/>
    </form>
  );
}

export default Formcriarcarro;
