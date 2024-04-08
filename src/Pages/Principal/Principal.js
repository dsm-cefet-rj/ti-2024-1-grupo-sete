import React from "react";
import HeaderMain from "../../Components/Header";
import Pesquisa from "../../Components/FerramentaPesquisa/pesquisa";
import Footer from "../../Components/Footer/footer"


export default function Principal(props){
    return(
        
        <>
        <HeaderMain/>
        <div>
            Principal 
        </div>

        <Pesquisa/>
        

        <Footer/>
        </>);
}