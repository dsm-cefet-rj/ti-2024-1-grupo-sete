import React from "react";
import './Detalhes.css'
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";


export default function Detalhes(props){
    return(      
        <>
        <HeaderMain />
        <div>
            <h1>Teste</h1>
        </div>
        <div className="butAlu"> 
            <button><Link className="aluPag" aria-current="page" to="/Aluguel">Alugar</Link></button>
        </div>
        <footer>
            <Footer />
        </footer>
        </>
);
}