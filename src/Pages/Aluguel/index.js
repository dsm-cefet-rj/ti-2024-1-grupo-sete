import React from "react";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import './aluguel.css'

export default function Alugar(props){
    return(
        <>
        <HeaderMain/>
        <div className="det">
            <h3>Detalhes do Pedido </h3>
            
        </div>
        <div className="butConfirm">  
            <button>Confirmar</button>
        </div>
        <Footer/>
        </>);
}