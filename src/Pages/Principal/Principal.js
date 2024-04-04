import React from "react";
import HeaderMain from "../../Components/Header";
import Pesquisa from "../../Components/FerramentaPesquisa/pesquisa";


export default function Principal(props){
    return(
        
        <>
        <HeaderMain/>
        <div>
            Principal
        </div>

        <Pesquisa/>
        </>);
}