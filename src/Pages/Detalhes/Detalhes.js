import React, { useEffect, useState } from "react";
import './Detalhes.css'
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import carros from "../../Components/Carros/carros";
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { FaUser, FaCar, FaCity, FaDollarSign } from 'react-icons/fa';

export default function Detalhes() {
  
    const {id } = useParams();
    const history = useHistory();
    const [carro, setCarro] = useState();
    


    useEffect(() => {
      const carroOfList = carros[id];
      setCarro(carroOfList)
    }, [])
    
    
    console.log('paraams: ', id)
    console.log('Car: ', carro)
    console.log('Modelo: ', carro?.modelo)

    const handleButtonClick = (id) => {
        history.push(`/aluguel/${id}`);
      };
  

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

        <div className="detalhes-linha">
        </div>

        <div className="detalhes-tecnicos-data">
            <div className="detalhes-tecnicos">
                
                <div className="detalhes-titulo">
                    <h3>Detalhes técnicos do modelo:</h3>
                </div>

            <ul className="flex-container-3">
                <li className="flex-container-item-3">
                    <p>Média de consumo estrada: {carro?.consumoEstrada}</p>
                </li>

                <li className="flex-container-item-3">
                    <p>Média de consumo cidade: {carro?.consumoCidade}</p>
                </li>

                <li className="flex-container-item-3">
                    <p>Câmbio: {carro?.cambio}</p>
                </li>

                <li className="flex-container-item-3">
                    <p>{carro?.multimidia}</p>
                </li>

                <li className="flex-container-item-3">
                    <p>Motor: {carro?.motor}</p>
                </li>

                <li className="flex-container-item-3">
                    <p>{carro?.detalheAdicional}</p>
                </li>
            </ul>
            </div>

            
            <div className="data">
                <div className="data-titulo">
                    <h3>Datas Indisponíveis:</h3>
                </div>
                <div className="data-container-datas">
                    <div className="data-item">
                    <p>De {carro?.diaAlugadoInicio} até {carro?.diaAlugadoFinal}</p>
                    </div>
                </div>
                
            </div>
        </div>

        <div className="button-container">
            <Link className="pagPag" aria-current="page" to={'/'}>
                <button className="button-voltar">Voltar</button>
            </Link>
            <Link className="aluPag" aria-current="page" to={`/Aluguel/${id}`}>
                <button className="button-alugar" onClick={() => handleButtonClick(id)}>Alugar</button>
            </Link>
        </div>

        </body>

        <footer>
            <Footer />
        </footer>
        </>
);
}
