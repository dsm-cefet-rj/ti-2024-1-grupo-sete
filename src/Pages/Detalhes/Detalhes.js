import React, { useEffect, useState } from "react";
import './Detalhes.css'
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import carros from "../../Components/Carros/carros";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";

import "./Detalhes.css";

export default function Detalhes() {
  
    const {id } = useParams();
    const [carro, setCarro] = useState();
  
    useEffect(() => {
      const carroOfList = carros[id];
      setCarro(carroOfList)
    }, [])
    
    
    console.log('paraams: ', id)
    console.log('Car: ', carro)
    console.log('Modelo: ', carro?.modelo)
  

    return(      
        <>
        <HeaderMain />
        <body>
        <div className="titulo">
            <h2>Detalhes do veículo</h2>
        </div>


        <section className="flex-container-1">
            <div className="flex-item">
                <h4>Proprietário: {carro?.dono}</h4>
            </div>
            <div className="flex-item">
                <h4>Modelo: {carro?.modelo} {carro?.ano}</h4>
            </div>
            <div className="flex-item">
                <h4>Cidade: {carro?.cidade}</h4>
            </div>
            <div className="flex-item">
                <h4>Preço/dia: R$ {carro?.preco}</h4>
            </div>
        </section>

        <section className="flex-container-2">
            <img src={carro?.Image} className="img-carro"/>
        </section>

        <div className="button-container">
        <button className="button-alugar">
            <Link className="aluPag" aria-current="page" to={`/Aluguel/${id}`}>Alugar</Link>
        </button>
        </div>


        <div className="detalhes-tecnicos">
            <div className="detalhes-titulo">
                <h3>Detalhes técnicos do modelo:</h3>
            </div>

        <ul className="flex-container-3">
            <li className="flex-container-item-3">
                <p>Média de consumo entrada: 14km/l</p>
            </li>

            <li className="flex-container-item-3">
                <p>Média de consumo cidade: 10km/l</p>
            </li>

            <li className="flex-container-item-3">
                <p>Câmbio: automático</p>
            </li>

            <li className="flex-container-item-3">
                <p>Central multimídia de 9" conexão Android Auto e Apple CarPlay</p>
            </li>

            <li className="flex-container-item-3">
                <p>Motor: 2.0</p>
            </li>

            <li className="flex-container-item-3">
                <p>Controle adaptativo de velocidade de cruzeiro</p>
            </li>
        </ul>
        </div>
        </body>

        <footer>
            <Footer />
        </footer>
        </>
);
}