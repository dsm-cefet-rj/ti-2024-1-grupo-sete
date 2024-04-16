import React, { useEffect, useState } from "react";
import './Detalhes.css'
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import carros from "../../Components/Carros/carros";
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";

import { FaUser, FaCar, FaCity, FaDollarSign } from 'react-icons/fa';

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
            <h1>Detalhes do veículo</h1>
        </div>


        <section className="flex-container-1">
            <div className="flex-item">
                <h4><FaUser/> Proprietário: {carro?.dono}</h4>
            </div>
            <div className="flex-item">
                <h4><FaCar/> Modelo: {carro?.modelo} {carro?.ano}</h4>
            </div>
            <div className="flex-item">
                <h4><FaCity/> Cidade: {carro?.cidade}</h4>
            </div>
            <div className="flex-item">
                <h4><FaDollarSign/> Preço/dia: R$ {carro?.preco}</h4>
            </div>
        </section>

        <section className="flex-container-2">
        <Carousel  indicators={false} variant="dark">
                <Carousel.Item>
                    <img className="img-carrossel" src= {carro?.Image}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="img-carrossel" src={carro?.Image2} />
                </Carousel.Item>
        </Carousel>
          
        </section>

        <div className="button-container">
        <button className="button-alugar">
            <Link className="aluPag" aria-current="page" to={`/Aluguel/${id}`}>Alugar</Link>
        </button>
        </div>


        <div className="detalhes-linha">
        </div>

        <div className="detalhes-tecnicos-data">
            <div className="detalhes-tecnicos">
                
                <div className="detalhes-titulo">
                    <h3>Detalhes técnicos do modelo:</h3>
                </div>

            <ul className="flex-container-3">
                <li className="flex-container-item-3">
                    <p>Média de consumo estrada: 14km/l</p>
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

            
            <div className="data">
            <div className="detalhes-linha-2">
            </div>
                <div className="data-titulo">
                    <h3>Datas disponíveis</h3>
                </div>
                <div className="data-datas">
                    <p>De 12/05/2024 até 30/06/2024</p>
                </div>
                
            </div>
        </div>
        </body>

        <footer>
            <Footer />
        </footer>
        </>
);
}