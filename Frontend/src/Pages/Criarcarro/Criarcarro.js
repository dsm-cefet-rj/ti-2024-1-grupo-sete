import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import { Button } from "reactstrap";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Criarcarro.css";
import axios from "axios"; 

function Criarcarro({ handleSubmit, botaotxt, carroData, clienteId }) {
  const [carro, setCarro] = useState(carroData || {});
  const [submitted, setSubmitted] = useState(false); 

  const submit = (e) => {
    e.preventDefault();
    if (
      carro.modelo === "" ||
      carro.ano === "" ||
      carro.preco === "" ||
      carro.cidade === "" ||
      carro.detalhe === "" ||
      carro.fotolink1 === ""
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }


    const carroComCliente = { ...carro, clienteId };

    console.log("XUXA TESTEEEEEEEEEEE", carro, token);
    const token = localStorage.getItem("token"); 

    axios
    .post(`http://localhost:5000/carros`, {modelo: carro.modelo, ano: carro.ano, cidade: carro.cidade, precoPorDia: carro.preco, detalhes: carro.detalhe, fotoLink1: carro.fotoLink1}, {
        headers: {
          'x-auth-token': token, 
        },
      })
      .then((response) => {
        console.log("Carro cadastrado com sucesso:", response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar carro:", error);
      });
  };

  function handleChange(e) {
    setCarro({ ...carro, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="page-container">
        <HeaderMain />
        <form onSubmit={submit} className="form">
          {submitted ? (
            <div className="thank-you-message">
              <h2>Obrigado pelo envio dos dados!</h2>
              <p>Em breve estaremos entrando em contato após a análise.</p>
            </div>
          ) : (
            <>
              <h2>Cadastrar carro</h2>
              <h6 style={{ textAlign: "center", marginBottom: "25px" }}>
                Cadastre aqui seu carro para ser alugado
              </h6>
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
                  name="preco"
                  placeholder="Insira o custo por dia de aluguel"
                  handleOnChange={handleChange}
                  value={carro.preco}
                />
              </div>
              <div className="formGroup">
                <Input
                  type="text"
                  text="Mais detalhes sobre o carro"
                  name="detalhe"
                  placeholder="Insira detalhes sobre o carro"
                  handleOnChange={handleChange}
                  value={carro.detalhe}
                />
              </div>
              <div className="formGroup">
                <Input
                  type="text"
                  text="Link da foto do seu carro"
                  name="fotolink1"
                  placeholder="Insira o link da foto do seu carro"
                  handleOnChange={handleChange}
                  value={carro.fotolink1}
                />
              </div>
              <div className="buttonContainer">
                <Button type="submit">Enviar para análise</Button>
              </div>
            </>
          )}
        </form>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Criarcarro;
