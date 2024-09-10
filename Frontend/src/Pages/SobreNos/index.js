import React from "react";
import HeaderMain from "../../Components/Header";

/**
 * Componente funcional que representa a página "Sobre Nós".
 * @component
 * @param {object} props - Propriedades passadas para o componente.
 * @returns {JSX.Element} O JSX que renderiza a página "Sobre Nós" com o cabeçalho e o título.
 */
export default function sobrenos(props){
    return(
    <>
        <HeaderMain></HeaderMain>
        <h1>Sobre nós</h1>
    </>
    );
}