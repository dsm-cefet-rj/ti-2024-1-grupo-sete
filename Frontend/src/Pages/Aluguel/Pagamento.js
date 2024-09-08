import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import HeaderMain from "../../Components/Header";
import qrCodeImage from "./qrcode.png"; 
import "./aluguel.css"; 
import axios from 'axios';
import useAluguelStore from "../../Components/Zustand/storeAluguel";
import useUserStore from "../../Components/Zustand/storeUser";
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import { updateDiasAlugado } from "../Services/carrosServices.js";
import { createRegistro } from "../Services/registroServices.js";
import { ToastContainer, toast } from 'react-toastify';

const Pagamento = () => {
  const location = useLocation();
  const user = useUserStore((state)=> state.usuario.userId);
  const clienteNome = useUserStore((state) => state.usuario.name);
  const carro = useAluguelStore((state)=> state.carroId);
  const carroID = useAluguelStore((state)=>state.carroId.id);
  const quantidadeDias = useAluguelStore((state)=>state.diasAluguel)
  const formattedDias = quantidadeDias.map(date => format(date, 'dd/MM/yyyy'));

  const [formValues, setFormValues] = useState({
    titular: "",
    numeroCartao: "",
    validade: "",
    cvv: "",
    formaPagamento: "cartao",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [_nomeCliente, setNomeCliente] = useState(""); 

  //console.log("\n\nDias", formattedDias)

  const updateDiasAlugadoCarro = async (carroID, dias) => {
    const responseDias = await updateDiasAlugado(carroID, dias);
    return responseDias;
  }

  const criarRegistro = async (body, id) => {
    const responseRegistro = await createRegistro(body, id);
    return responseRegistro;
  }

  const handleConfirmarPagamento = async () => {
    const token = localStorage.getItem("token");

    //console.log("Cliente Nome:", clienteNome);
  
    if (
      formValues.formaPagamento === "cartao" &&
      (!formValues.titular || !formValues.numeroCartao || !formValues.validade || !formValues.cvv)
    ) {
      alert("Por favor, preencha todas as informações do cartão de crédito.");
      return;
    }
  
    const novoAluguel = {
      valorDia: carro?.precoPorDia|| 0, 
      valorTotal: carro?.precoPorDia * quantidadeDias.length,
      quantidadeDias: formattedDias
    };

    const formaPagamentoParaRegistro = formValues.formaPagamento;
    const novoRegistro = {
      valorDia: carro?.precoPorDia|| 0, 
      valorTotal: carro?.precoPorDia * quantidadeDias.length,
      quantidadeDias: formattedDias,
      formaPagamento: formaPagamentoParaRegistro
    };
  
    try {
      //console.log(novoAluguel)
      //console.log(carroID)
      const response = await axios.post(`http://localhost:5000/aluguel/${carroID}`, novoAluguel, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  
      console.log("Registro adicionado:", response.data);
      setSuccessMessage("Pagamento realizado com sucesso!");
      setPagamentoConfirmado(true); 

      const responseDiasEdited = await updateDiasAlugadoCarro(carroID, formattedDias);
      console.log(responseDiasEdited);

      console.log("\n\nformaPagamentoParaRegistro", formValues.formaPagamento);

      const registroCriado = await criarRegistro(novoRegistro, carroID);
      console.log("\n\nREGISTRO CRIADO: ", registroCriado);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error.response ? error.response.data : error.message);
    }
  };
  
  

  return (
    <>
      <HeaderMain />
      <Container className="pagamento-container">
        <h1>Pagamento</h1>
        {!pagamentoConfirmado ? ( 
          <Form className="form">
            <Form.Group className="formGroup" controlId="formaPagamento">
              <Form.Label>Forma de Pagamento</Form.Label>
              <Form.Select
                name="formaPagamento"
                value={formValues.formaPagamento}
                onChange={(e) => setFormValues({
                  ...formValues,
                  formaPagamento: e.target.value,
                })}
              >
                <option value="cartao">Cartão de Crédito</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
              </Form.Select>
            </Form.Group>

            {formValues.formaPagamento === "cartao" && (
              <>
                <Form.Group className="formGroup" controlId="titular">
                  <Form.Label>Titular do Cartão</Form.Label>
                  <Form.Control
                    type="text"
                    name="titular"
                    value={formValues.titular}
                    onChange={(e) => setFormValues({
                      ...formValues,
                      titular: e.target.value,
                    })}
                    placeholder="Nome completo"
                    required />
                </Form.Group>

                <Form.Group className="formGroup" controlId="numeroCartao">
                  <Form.Label>Número do Cartão</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroCartao"
                    value={formValues.numeroCartao}
                    onChange={(e) => setFormValues({
                      ...formValues,
                      numeroCartao: e.target.value,
                    })}
                    placeholder="1234 5678 9012 3456"
                    required />
                </Form.Group>

                <Form.Group className="formGroup" controlId="validade">
                  <Form.Label>Validade</Form.Label>
                  <Form.Control
                    type="text"
                    name="validade"
                    value={formValues.validade}
                    onChange={(e) => setFormValues({
                      ...formValues,
                      validade: e.target.value,
                    })}
                    placeholder="MM/AA"
                    required />
                </Form.Group>

                <Form.Group className="formGroup" controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={formValues.cvv}
                    onChange={(e) => setFormValues({ ...formValues, cvv: e.target.value })}
                    placeholder="123"
                    required />
                </Form.Group>
              </>
            )}

            {formValues.formaPagamento === "pix" && (
              <>
                <p>Pagamento via Pix. Siga as instruções no QR Code abaixo:</p>
                <img src={qrCodeImage} alt="QR Code" />
              </>
            )}

            {formValues.formaPagamento === "boleto" && (
              <p>Pagamento via Boleto. O boleto foi enviado via e-mail. Após o pagamento, confirme.</p>
            )}

            <Button variant="primary" onClick={handleConfirmarPagamento}>
              Confirmar Pagamento
            </Button>
          </Form>
        ) : (
          <div className="success-message">
            <h3>{successMessage}</h3>
          </div>
        )}
      </Container>
    </>
  );
};

export default Pagamento;
