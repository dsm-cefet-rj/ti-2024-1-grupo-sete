import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";

const Historico = () => {
  const [registros, setRegistros] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarRegistros() {
      try {
        const response = await axios.get('http://localhost:5000/api/registros', {
          headers: {
            'x-auth-token': token,
          },
        });
        setRegistros(response.data);
      } catch (error) {
        console.error("Erro ao carregar registros:", error.response ? error.response.data : error.message);
      }
    }
  
    carregarRegistros();
  }, [token]);

  return (
    <div className="page-container">
      <HeaderMain />
      <div className="content-wrap">
        <div className="historicoTabela">
          <h1 style={{ marginTop: "30px", marginBottom: "30px" }}>
            Histórico de Aluguéis
          </h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Carro Alugado</th>
                <th>Valor total</th>
                <th>Método</th>
                {/* Remove a coluna de Status */}
                <th>Data de Locação</th>
                <th>Hora de Locação</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {registros?.map((registro, index) => (
                <tr key={index}>
                  <td>{registro?.nome}</td>
                  <td>{registro?.carro}</td>
                  <td>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(registro?.valorDiario * registro?.quantDias)}
                  </td>
                  <td>{registro?.formPagamento}</td>
                  <td>{registro?.dataLocacao}</td>
                  <td>{registro?.horaLocacao}</td>
                  <td>
                    <Link to={`/historico/${index}`}>
                      <button className="visu">Visualizar</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Historico;
