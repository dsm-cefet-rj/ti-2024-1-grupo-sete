import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import { Button } from "reactstrap";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Criarcarro.css";
import {criarCarro} from "../Services/carrosServices.js" ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

/**
 * Componente para criar um novo carro para alugar.
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {Function} props.handleSubmit - Função chamada ao enviar o formulário.
 * @param {string} props.botaotxt - Texto exibido no botão de envio.
 * @param {Object} [props.carroData] - Dados iniciais do carro, se disponíveis.
 * @param {string} [props.clienteId] - ID do cliente, se disponível.
 * @returns {React.ReactElement} A página de criação de carro.
 * @description
 * O componente 'Criarcarro' permite que um usuário cadastre um novo carro para ser alugado. O formulário coleta informações como modelo, ano de 
 * fabricação, cidade, preço por dia, detalhes adicionais e um link para uma foto do carro. 
 * Após o envio do formulário, os dados do carro são enviados para um serviço externo e o usuário é notificado sobre o sucesso ou falha do processo.
 */
function Criarcarro({ handleSubmit, botaotxt, carroData, clienteId }) {
  const [carro, setCarro] = useState(carroData || {});
  const [submitted, setSubmitted] = useState(false); 

  const history = useHistory();
  const timer = () => {
    setTimeout(() => {
      //history.push('/');  // Redireciona após o tempo definido
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Isso adiciona uma rolagem suave
      });
    }, 3000);  // 3000 ms = 3 segundos
  };
  
  /**
   * Função chamada ao enviar o formulário. Valida os dados e envia para o serviço de criação de carro.
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envio do formulário.
   */
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
      toast.warning("Por favor, preencha todos os campos.", {
        position: "top-center",
        autoClose: 2700,
        containerId: "shared-toast-container"
      });
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
    
      toast.success("Carro cadastrado com sucesso!", {
        position: "top-center",
        autoClose: 2700,
        containerId: "shared-toast-container"
      });
      timer();


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

  /**
   * Função chamada ao mudar o valor dos campos do formulário.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança no campo de input.
   */
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
