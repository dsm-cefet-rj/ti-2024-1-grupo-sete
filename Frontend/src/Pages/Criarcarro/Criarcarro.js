import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import { Button } from "reactstrap";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Criarcarro.css";
import {criarCarro} from "../Services/carrosServices.js" ;

function Criarcarro({ handleSubmit, botaotxt, carroData, clienteId }) {
  const [carro, setCarro] = useState(carroData || {});
  const [submitted, setSubmitted] = useState(false); 

  const submit = async (e) => {
    e.preventDefault();
    if (
      carro.modelo === "" ||
      carro.ano === "" ||
      carro.precoPorDia === "" ||
      carro.cidade === "" ||
      carro.detalhes === "" ||
      carro.fotoLink1 === ""
    ) {
      console.error("Por favor, preencha todos os campos.");
      return;
    }

    const carroComCliente = { ...carro };
    console.log("CARRO COM CLIENTE:", carroComCliente);

    const token = localStorage.getItem('token'); 
    console.log("XUXA TESTEEEEEEEEEEE", carro, token);

      try{
        console.log("POST CARRO AQUI", carroComCliente);
        await criarCarro(carroComCliente);
        //console.log("\n\n\LOG DO RESPONSE\n\n", response.data);
        //const {carroCriado} = response.data;
        //const { token, user } = response.data;
        //console.log("Carro cadastrado com sucesso:", carroCriado);
        setSubmitted(true);
  
      }catch(error){
        console.error("Erro ao cadastrar carro:", error);
      };


    // axios
    // .post(`http://localhost:5000/carros/`, {modelo: carro.modelo, ano: carro.ano, cidade: carro.cidade, precoPorDia: carro.preco, detalhes: carro.detalhe, fotoLink1: carro.fotoLink1}, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then((response) => {
    //     console.log("Carro cadastrado com sucesso:", response.data);
    //     setSubmitted(true);
    //   })
    //   .catch((error) => {
    //     console.error("Erro ao cadastrar carro:", error);
    //   });
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
                  text="Link da foto do seu carro"
                  name="fotoLink1"
                  placeholder="Insira o link da foto do seu carro"
                  handleOnChange={handleChange}
                  value={carro.fotoLink1}
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
