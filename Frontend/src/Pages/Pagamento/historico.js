import { Table } from "react-bootstrap";
import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import HeaderMain from "../../Components/Header";
import useAluguelStore from "../../Components/Zustand/storeAluguel";
import Footer from "../../Components/Footer/footer";

export default function Historico(params) {
  const registros = useAluguelStore((state) => state.registros);

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
                <th>Status</th>
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
                      currency: "BRL"
                    }).format(registro?.valorDiario * registro?.quantDias)}
                  </td>
                  <td>{registro?.formPagamento}</td>
                  <td>
                    {registro?.status === "Alugado" && (
                      <span className="status-alugado">Alugado</span>
                    )}
                    {registro?.status === "Devolvido" && (
                      <span className="status-devolvido">Devolvido</span>
                    )}
                    {registro?.status === "Pendente" && (
                      <span className="status-pendente">Pendente</span>
                    )}
                  </td>
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
}
