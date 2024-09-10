import React, { useState } from "react";
import Input from "../../Components/Form/Input";
import { Button } from "reactstrap";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import { criarCarro } from "../Services/carrosServices.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import "./Criarcarro.css";

/**
 * Schema de validação com Yup
 * @type {Yup.ObjectSchema}
 */
const validationSchema = Yup.object({
  modelo: Yup.string().required('Modelo é obrigatório'),
  ano: Yup.number()
    .typeError('Ano deve ser um número')
    .integer('Ano deve ser um número inteiro')
    .positive('Ano deve ser um número positivo')
    .required('Ano é obrigatório'),
  precoPorDia: Yup.number()
    .typeError('Preço deve ser um número')
    .integer('Preço deve ser um número inteiro')
    .positive('Preço deve ser um número positivo')
    .required('Preço por dia é obrigatório'),
  cidade: Yup.string()
    .matches(/^[A-Za-z\s]+, [A-Z]{2}$/, 'Formato da cidade deve ser "Cidade, UF"')
    .required('Cidade é obrigatória'),
  detalhes: Yup.string().required('Detalhes são obrigatórios'),
  fotoLink1: Yup.string()
    .url('Link da foto deve ser uma URL válida')
    .required('Link da foto é obrigatório'),
  enderecoRetirada: Yup.string().required('Endereço de retirada é obrigatório')
});

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
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  /**
   * Função chamada ao enviar o formulário. Valida os dados e envia para o serviço de criação de carro.
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envio do formulário.
   */
  const submit = async (e) => {
    e.preventDefault();

    try {
      // Valida os dados usando o esquema Yup
      await validationSchema.validate(carro, { abortEarly: false });
      
      // Envia os dados para o serviço de criação de carro
      const carroComCliente = { ...carro };
      console.log("CARRO COM CLIENTE:", carroComCliente);

      const token = localStorage.getItem('token'); 
      console.log("XUXA TESTEEEEEEEEEEE", carro, token);

      await criarCarro(carroComCliente);

      toast.success("Carro cadastrado com sucesso!", {
        position: "top-center",
        autoClose: 2700,
        containerId: "shared-toast-container"
      });

      setSubmitted(true);
      setErrors({});
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 3000);

    } catch (err) {
      if (err.inner) {
        // Captura erros de validação e exibe mensagens
        const validationErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        console.error("Erro ao cadastrar carro:", err);
        toast.error("Erro ao cadastrar carro. Tente novamente.", {
          position: "top-center",
          autoClose: 2700,
          containerId: "shared-toast-container"
        });
      }
    }
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
                {errors.modelo && <div className="error">{errors.modelo}</div>}
              </div>
              <div className="formGroup">
                <Input
                  type="number"
                  text="Ano de fabricação"
                  name="ano"
                  placeholder="Insira o ano de fabricação"
                  handleOnChange={handleChange}
                  value={carro.ano}
                />
                {errors.ano && <div className="error">{errors.ano}</div>}
              </div>
              <div className="formGroup">
                <Input
                  type="number"
                  text="Preço por dia"
                  name="precoPorDia"
                  placeholder="Insira o custo por dia de aluguel"
                  handleOnChange={handleChange}
                  value={carro.precoPorDia}
                />
                {errors.precoPorDia && <div className="error">{errors.precoPorDia}</div>}
              </div>
              <div className="formGroup">
                <Input
                  type="text"
                  text="Cidade"
                  name="cidade"
                  placeholder="Insira a cidade no formato 'Cidade, UF'"
                  handleOnChange={handleChange}
                  value={carro.cidade}
                />
                {errors.cidade && <div className="error">{errors.cidade}</div>}
              </div>
              <div className="formGroup">
                <Input
                  type="text"
                  text="Endereço de retirada"
                  name="enderecoRetirada"
                  placeholder="Insira o endereço de retirada"
                  handleOnChange={handleChange}
                  value={carro.enderecoRetirada}
                />
                {errors.enderecoRetirada && <div className="error">{errors.enderecoRetirada}</div>}
              </div>
              <div className="formGroup">
                <Input
                  type="text"
                  text="Mais detalhes sobre o carro"
                  name="detalhes"
                  placeholder="Insira detalhes sobre o carro (opcional)"
                  handleOnChange={handleChange}
                  value={carro.detalhes}
                />
                {errors.detalhes && <div className="error">{errors.detalhes}</div>}
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
                {errors.fotoLink1 && <div className="error">{errors.fotoLink1}</div>}
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
      <ToastContainer />
    </>
  );
}

export default Criarcarro;
