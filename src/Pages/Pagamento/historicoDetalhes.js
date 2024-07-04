import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./styles.css";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import useAluguelStore from "../../Components/Zustand/storeAluguel";
import { useParams, Link } from "react-router-dom";

export default function HistoricoDetalhes() {
  const dados = useAluguelStore((state) => state.registros);
  const renovarAluguel = useAluguelStore((state) => state.renovarAluguel);
  const { index } = useParams();
  const [showOptions, setShowOptions] = useState(false);

  const handleRenovar = () => {
    setShowOptions(true);
  };

  const options = [
    { days: 1, price: dados[index].valorDiario * 1 },
    { days: 5, price: dados[index].valorDiario * 5 },
    { days: 10, price: dados[index].valorDiario * 10 }
  ];

  return (
    <div className="page-container">
      <HeaderMain />
      <div className="content-wrap">
        <div className="pagamentos">
          <h2>Detalhes do pagamento</h2>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Carro Alugado</th>
                <th>Valor diário</th>
                <th>Dias Alugado</th>
                <th>Total</th>
                <th>Forma de pagamento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dados[index].nome}</td>
                <td>{dados[index].carro}</td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(dados[index].valorDiario)}
                </td>
                <td>{dados[index].quantDias}</td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(dados[index].valorDiario * dados[index].quantDias)}
                </td>
                <td>{dados[index].formPagamento}</td>
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
                      currency: "BRL"
                    }).format(option.price)}
                  </p>
                  <button
                    onClick={() => {
                      renovarAluguel(index, option.days);
                      setShowOptions(false);
                    }}
                  >
                    Selecionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer className="footer" />
    </div>
  );
}
