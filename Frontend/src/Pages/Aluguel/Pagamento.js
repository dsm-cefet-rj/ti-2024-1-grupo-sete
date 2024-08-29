import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import HeaderMain from "../../Components/Header";
import qrCodeImage from "./qrcode.png"; 
import "./aluguel.css"; 
import axios from 'axios';

const Pagamento = () => {
  const location = useLocation();
  const { quantidadeDias, carro } = location.state || {}; 

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
  
  useEffect(() => {
    const fetchNomeCliente = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:5000/api/registros", {
          headers: {
            'x-auth-token': token,
          },
        });

        if (response.data && response.data.nome) {
          setNomeCliente(response.data.nome); 
        }
      } catch (error) {
        console.error("Erro ao buscar nome do cliente:", error.response ? error.response.data : error.message);
      }
    };

    fetchNomeCliente();
  }, []); 

  const handleConfirmarPagamento = async () => {
    const token = localStorage.getItem("token");
    const clienteId = localStorage.getItem("id");
    const clienteNome = localStorage.getItem("nome"); 
    console.log("Cliente Nome:", clienteNome);
  
    if (
      formValues.formaPagamento === "cartao" &&
      (!formValues.titular || !formValues.numeroCartao || !formValues.validade || !formValues.cvv)
    ) {
      alert("Por favor, preencha todas as informações do cartão de crédito.");
      return;
    }
  
    const novoRegistro = {
      clienteId: clienteId,  
      carro: carro?.modelo || "Carro não encontrado",
      nome: clienteNome || "Nome não disponível",
      valorDiario: carro?.preco || 0, 
      quantDias: quantidadeDias,
      formPagamento: formValues.formaPagamento,
      status: 'Alugado',
      dataLocacao: new Date().toISOString().split('T')[0],
      horaLocacao: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/registros", novoRegistro, {
        headers: {
          'x-auth-token': token,
        },
      });
  
      console.log("Registro adicionado:", response.data);
      setSuccessMessage("Pagamento realizado com sucesso!");
      setPagamentoConfirmado(true); 
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
