import React, { useEffect, useState } from "react";
import './Detalhes.css'
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
//import carros from "../../Components/Carros/carros";
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { FaUser, FaCar, FaCity, FaDollarSign } from 'react-icons/fa';
import { findCarroById } from '../Services/carrosServices';
//import useAluguelStore from "../../Components/Zustand/storeAluguel";

/**
 * Componente para exibir os detalhes de um veículo específico.
 * @returns {React.ReactElement} A página de detalhes do veículo com informações e imagens do carro.
 * @description
 * O componente 'Detalhes' é responsável por exibir informações detalhadas sobre um veículo específico, incluindo o nome do proprietário, modelo, 
 * ano, cidade e preço por dia. Utiliza um carrossel para exibir as fotos do carro e possui botões para voltar à página principal e para iniciar o 
 * processo de aluguel do veículo.
 * Ele utiliza o hook 'useParams' para obter o ID do veículo da URL e o hook 'useHistory' para redirecionar o usuário.
 * Os dados do veículo são obtidos através de uma chamada assíncrona para a função 'findCarroById'.
 */
export default function Detalhes() {
  
    const { id } = useParams();
    const history = useHistory();
    const [carro, setCarro] = useState();
    
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
    
    
    console.log('paraams: ', id)
    console.log('Car: ', carro)
    console.log('Modelo: ', carro?.modelo)
    //const diasArray = useAluguelStore((state) => state.diasAluguel);
    //console.log(diasArray);

    /**
     * Função para redirecionar o usuário para a página de aluguel do carro.
     * @param {string} id - O ID do carro para ser alugado.
     */
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
                <h4><FaUser/> Proprietário: {carro?.userName}</h4>
            </div>
            <div className="flex-item">
                <h4><FaCar/> Modelo: {carro?.modelo} {carro?.ano}</h4>
            </div>
            <div className="flex-item">
                <h4><FaCity/> Cidade: {carro?.cidade}</h4>
            </div>
            <div className="flex-item">
                <h4><FaDollarSign/> Preço/dia: R$ {carro?.precoPorDia}</h4>
            </div>
        </section>

        <section className="flex-container-2">
        <Carousel  indicators={false} variant="dark">
                <Carousel.Item>
                    <img className="img-carrossel" src= {carro?.fotoLink1}/>
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
                    <p>{carro?.detalhes}</p>
                </li>
            </ul>
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