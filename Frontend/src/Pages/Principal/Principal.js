import React from "react";
import HeaderMain from "../../Components/Header";
import Pesquisa from "../../Components/FerramentaPesquisa/pesquisa";
import Footer from "../../Components/Footer/footer"
import CarrosselCarro from "../../Components/Carrosseis/CarrosselCarro";
import Mensagem from "../../Components/Message/Message";
import { useLocation } from 'react-router-dom'


export default function Principal(props){

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    return(
        
        <>
        <HeaderMain/>
        {message && <Mensagem type="success" msg={message}/>}
        <CarrosselCarro/>
        <Pesquisa/>
        

        <Footer/>
        </>);
}