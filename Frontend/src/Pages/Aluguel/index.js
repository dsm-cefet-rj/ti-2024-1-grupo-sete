import React, { useEffect, useState } from "react";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import { Link, useParams, useHistory } from "react-router-dom";
import carros from "../../Components/Carros/carros";
import "./aluguel.css";

export default function Alugar() {
    const { id } = useParams();
    const [carro, setCarro] = useState();
    const [diasAluguel, setDiasAluguel] = useState(1);
    const history = useHistory();
  
    useEffect(() => {
      const carroOfList = carros[id];
      setCarro(carroOfList);
    }, [id]);
  
    const total = diasAluguel * (carro?.preco || 0); 
  
    const handleConfirmar = () => {
      history.push({
        pathname: `/pagamento/${id}`,
        state: { 
          quantidadeDias: diasAluguel, 
          carro: carro 
        },
      });
    };
  
  
  return (
    <>
      <HeaderMain />
      <div className="titulo">
        <h2>Detalhes do Pedido</h2>
      </div>
      <div className="containerAluguel">
        <div className="colunm coluna-1">
          <img src={carro?.Image} alt={`${carro?.modelo} - ${carro?.ano}`} className="img-carro" />
        </div>
        <div className="culunm coluna-2">
          <p className="item"><b>Proprietário: </b> {carro?.dono}</p>
          <p className="item"><b>Modelo: </b> {carro?.modelo} {carro?.ano}</p>
          <p className="item"><b>Cidade: </b> {carro?.cidade}</p>
          <p className="item"><b>Preço/dia: </b> R$ {carro?.preco.toFixed(2)}</p>
        </div>
      </div>

      <div className="container">
        <div className="diasAluguel">
          <p className="titulo2">Quantidade de dias para alugar:</p>
          <input
            type="number"
            value={diasAluguel}
            onChange={(e) => setDiasAluguel(Math.max(1, e.target.value))}
            min={1}
            className="input-dias"
          />
        </div>
      </div>

      <div className="container-preco">
        <div className="precos">
          <p className="total">Total a pagar: R$ {total.toFixed(2)}</p>
        </div>
      </div>

      <div className="button-container">
        <Link className="pagPag" to={`/detalhes/${id}`}>
          <button className="button-voltar">Voltar</button>
        </Link>
        <button className="button-confirm" onClick={handleConfirmar}>
          Confirmar
        </button>
      </div>

      <Footer />
    </>
  );
}
