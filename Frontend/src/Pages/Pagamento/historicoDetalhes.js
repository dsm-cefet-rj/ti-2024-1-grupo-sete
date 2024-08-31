import React, { useState, useEffect } from "react";
import { Table, Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import useAluguelStore from "../../Components/Zustand/storeAluguel";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import qrCodeImage from "./qrcode.png"; 
import { useHistory } from "react-router-dom";

const HistoricoDetalhes = () => {
  const [dados, setDados] = useState([]);
  const { index } = useParams();
  const renovarAluguel = useAluguelStore((state) => state.renovarAluguel);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedDays, setSelectedDays] = useState(null);
  const [formValues, setFormValues] = useState({
    titular: "",
    numeroCartao: "",
    validade: "",
    cvv: "",
    formaPagamento: "cartao",
  });
  const [successMessage, setSuccessMessage] = useState(""); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/registros",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setDados(response.data);
      } catch (error) {
        console.error(
          "Erro ao carregar dados:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchDados();
  }, [token]);

  const handleRenovar = () => {
    setShowOptions(true);
  };

  const handleRenovarConfirm = async () => {
    if (
      formValues.formaPagamento === "cartao" &&
      (!formValues.titular ||
        !formValues.numeroCartao ||
        !formValues.validade ||
        !formValues.cvv)
    ) {
      alert("Por favor, preencha todas as informações do cartão de crédito.");
      return;
    }
  
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toLocaleDateString('pt-BR'); 
    const currentTime = currentDateTime.toLocaleTimeString('pt-BR'); 
  
    try {
      await axios.put(
        `http://localhost:5000/api/registros/${dados[index].id}`,
        {
          diasAdicionais: selectedDays,
          dataLocacao: currentDate,
          horaLocacao: currentTime, 
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
  
      renovarAluguel(index, selectedDays);
  
      const updatedDados = [...dados];
      updatedDados[index].quantDias += selectedDays;
      updatedDados[index].dataLocacao = currentDate; 
      updatedDados[index].horaLocacao = currentTime; 
      setDados(updatedDados);
  
      setSuccessMessage("Pagamento realizado com sucesso!");
      setShowOptions(false);
    } catch (error) {
      console.error(
        "Erro ao renovar aluguel:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  const options = [
    { days: 1, price: dados[index]?.valorDiario * 1 },
    { days: 5, price: dados[index]?.valorDiario * 5 },
    { days: 10, price: dados[index]?.valorDiario * 10 },
  ];

  if (!dados[index]) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="page-container">
      <HeaderMain />
      <div className="content-wrap">
        <div className="historicoTabela">
          <h1 style={{ marginTop: "30px", marginBottom: "30px" }}>
            Detalhes do pagamento
          </h1>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Carro Alugado</th>
                <th>Valor diário</th>
                <th>Dias Alugado</th>
                <th>Total</th>
                <th>Forma de pagamento</th>
                <th>Data de Locação</th>
                <th>Hora de Locação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dados[index].nome}</td>
                <td>{dados[index].carro}</td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(dados[index].valorDiario)}
                </td>
                <td>{dados[index].quantDias}</td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    dados[index]?.valorDiario * dados[index]?.quantDias
                  )}
                </td>
                <td>{dados[index].formPagamento}</td>
                <td>{dados[index].dataLocacao}</td>
                <td>{dados[index].horaLocacao}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="button-container">
          <Link className="pagPag" aria-current="page" to={"/historico"}>
            <button className="button-cancel">Voltar</button>
          </Link>
          <button className="button-renovar" onClick={handleRenovar}>
            Renovar Aluguel
          </button>
        </div>
        {showOptions && (
          <div className="renew-options">
            <h3>Escolha a nova duração do aluguel:</h3>
            <div className="options-container">
              {options.map((option) => (
                <div key={option.days} className="option-card">
                  <p>{option.days} dia(s)</p>
                  <p>
                    Preço:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(option.price)}
                  </p>
                  <button onClick={() => setSelectedDays(option.days)}>
                    Selecionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedDays && successMessage === "" ? (
          <Container className="pagamento-container">
            <h1>Pagamento</h1>
            <Form className="form">
              <Form.Group className="formGroup" controlId="formaPagamento">
                <Form.Label>Forma de Pagamento</Form.Label>
                <Form.Select
                  name="formaPagamento"
                  value={formValues.formaPagamento}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      formaPagamento: e.target.value,
                    })
                  }
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
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          titular: e.target.value,
                        })
                      }
                      placeholder="Nome completo"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="formGroup" controlId="numeroCartao">
                    <Form.Label>Número do Cartão</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroCartao"
                      value={formValues.numeroCartao}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          numeroCartao: e.target.value,
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="formGroup" controlId="validade">
                    <Form.Label>Validade</Form.Label>
                    <Form.Control
                      type="text"
                      name="validade"
                      value={formValues.validade}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          validade: e.target.value,
                        })
                      }
                      placeholder="MM/AA"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="formGroup" controlId="cvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="text"
                      name="cvv"
                      value={formValues.cvv}
                      onChange={(e) =>
                        setFormValues({ ...formValues, cvv: e.target.value })
                      }
                      placeholder="123"
                      required
                    />
                  </Form.Group>
                </>
              )}

              {formValues.formaPagamento === "pix" && (
                <>
                  <p>
                    Pagamento via Pix. Siga as instruções no QR Code abaixo:
                  </p>
                  <img src={qrCodeImage} alt="QR Code" />
                </>
              )}

              {formValues.formaPagamento === "boleto" && (
                <p>
                  Pagamento via Boleto. Siga as instruções no boleto gerado.
                </p>
              )}

              <Button variant="primary" onClick={handleRenovarConfirm}>
                Confirmar Pagamento
              </Button>
            </Form>
          </Container>
        ) : (
          successMessage && (
            <div className="success-message">
              <h3>{successMessage}</h3>
              {formValues.formaPagamento === "pix"}
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HistoricoDetalhes;
