import React, { useEffect, useState } from "react";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import { Link, useParams} from "react-router-dom/cjs/react-router-dom";
import carros from "../../Components/Carros/carros";
//import Detalhes from "../Detalhes/Detalhes";
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
            
            <section className="flex-container-1">
                <img src={carro?.Image} className="img-carro"/>
            </section>


            <section className="flex-container-2">
                <ul>
                    <li className="flex-item">
                        <p>Proprietário: {carro?.dono}</p>
                    </li>
                    <li className="flex-item">
                        <p>Modelo: {carro?.modelo} {carro?.ano}</p>
                    </li>
                    <li className="flex-item">
                        <p>Cidade: {carro?.cidade}</p>
                    </li>
                    <li className="flex-item">
                        <p>Preço/dia: R$ {carro?.preco}</p>
                    </li>
                    <li className="flex-item">
                        <p>Câmbio: {carro?.cambio}</p>
                    </li>
                    <li className="flex-item">
                        <p>Motor: {carro?.motor} </p>
                    </li>
                    <li className="flex-item">
                        <p>total a pagar: R$ {total} </p>
                    </li>
                </ul>
            </section>
            
            <div className="button-container">
                <button className="button-voltar">
                    <Link className="pagPag" aria-current="page" to={`/detalhes/${id}`}>Voltar</Link>
                </button>
                <button className="button-confirm">
                    <Link className="pagPag" aria-current="page" to="../Pagamento">Confirmar</Link>
                </button>
                
            </div>

        </body>

        <footer>
            <Footer />
        </footer>
        </>);
}