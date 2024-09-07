import React, { useEffect, useState } from "react";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import { Link, useParams, useHistory } from "react-router-dom";
import carros from "../../Components/Carros/carros";
import "./aluguel.css";
import { findCarroById } from '../Services/carrosServices';
import useAluguelStore from '../../Components/Zustand/storeAluguel.js';
import format from 'date-fns/format';

export default function Alugar() {
    const { id } = useParams();
    const [carro, setCarro] = useState();
    //const [diasAluguel, setDiasAluguel] = useState(0);
    const history = useHistory();

    //Zustand
    const diasEntreDatas = useAluguelStore((state) => state?.diasAluguel);
    console.log("diasEntreDatas", diasEntreDatas);
    let primeiroDia = diasEntreDatas?.length > 0 ? format(diasEntreDatas[0], "dd/MM/yyyy") : '';
    let ultimoDia = diasEntreDatas?.length > 0 ? format(diasEntreDatas[diasEntreDatas.length - 1], "dd/MM/yyyy") : '';
  
    useEffect(() => {
      const carroOfList = carros[id];
      setCarro(carroOfList);
    }, [id]);
  
    const total = diasEntreDatas * (carro?.preco || 0); 

    useEffect(() => {
      const fetchCarrosById = async (id) => {
          try{
              const response = await findCarroById(id);
              console.log("Carro encontrado:", response.data.carros);
              setCarro(response.data.carros);
          }catch(error){
              console.error("Erro ao buscar carros:", error.response.data.message);
          }
      };
      fetchCarrosById(id);
    }, [])
  
    const handleConfirmar = () => {
      history.push({
        pathname: `/pagamento/${id}`,
        state: { 
          quantidadeDias: diasEntreDatas, 
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
          <img src={carro?.fotoLink1} alt={`${carro?.modelo} - ${carro?.ano}`} className="img-carro" />
        </div>
        <div className="culunm coluna-2">
          <p className="item"><b>Proprietário: </b> {carro?.userName}</p>
          <p className="item"><b>Modelo: </b> {carro?.modelo} {carro?.ano}</p>
          <p className="item"><b>Cidade: </b> {carro?.cidade}</p>
          <p className="item"><b>Preço/dia: </b> R$ {carro?.precoPorDia}</p>
        </div>
      </div>

      <div className="container">
        <div className="diasAluguel">
          <p className="titulo2">Dias para alugar:</p>
          {/* <input
            type="number"
            value={diasEntreDatas}
            onChange={(e) => setDiasAluguel(Math.max(1, e.target.value))}
            min={1}
            className="input-dias"
          /> */}
          <p className="item">{`${diasEntreDatas.length} dias (${primeiroDia} até ${ultimoDia})`}</p>
        </div>
      </div>

      <div className="container-preco">
        <div className="precos">
          <p className="total">Total a pagar: R$ {total}</p>
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
