import React, { useEffect, useState } from "react";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import { Link, useParams} from "react-router-dom/cjs/react-router-dom";
import carros from "../../Components/Carros/carros";
import './aluguel.css';
import useAluguelStore from "../../Components/Zustand/storeAluguel";


export default function Alugar(props){
    const {id } = useParams();
    const [carro, setCarro] = useState();

    const diasArray = useAluguelStore((state) => state.diasAluguel);
    
  
    useEffect(() => {
      const carroOfList = carros[id];
      setCarro(carroOfList);
    }, [])
    
    
    console.log('paraams: ', id)
    console.log('Car: ', carro)
    console.log('Modelo: ', carro?.modelo)
    
    let dias = diasArray.length;
    const total = dias*(carro?.preco);

    return(      
        <>
        <HeaderMain />
        <body>
            <div className="titulo">
                <h2>Detalhes do Pedido</h2>
            </div>
            <div className="containerAluguel">
                <div className="colunm coluna-1">
                    <img src={carro?.Image} className="img-carro"/>
                </div>  
                <div className="culunm coluna-2">
                    <p className="item"> <b>Proprietário: </b> {carro?.dono}</p>
                    <p className="item"> <b>Modelo: </b>{carro?.modelo} {carro?.ano}</p>
                    <p className="item"> <b>Cidade: </b> {carro?.cidade}</p>
                    <p className="item"> <b>Preço/dia: </b>R$ {carro?.preco}</p>
                </div>
            </div>

            <div className="container ">
                <div className="diasAluguel">
                    <p className="titulo2">Dias que deseja alugar:</p>
                    <div className="container-item-dias">
                    {diasArray.map((dia, index) => (
                        <span key={index} className="item"> {new Date(dia).toLocaleDateString()}</span>
                    ))}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="precos">
                    <p className="total">Total a pagar: R$ {total} </p>
                </div>
            </div>
            
            <div className="button-container">
                <Link className="pagPag" aria-current="page" to={`/detalhes/${id}`}>
                    <button  className="button-voltar">voltar</button>
                </Link>
                <Link className="pagPag" aria-current="page" to="../Pagamento">
                    <button className="button-confirm">confirmar</button>
                </Link>
            </div>
            

        </body>

        <footer>
            <Footer />
        </footer>
        </>);
}