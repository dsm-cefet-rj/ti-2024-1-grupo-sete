import React from "react";
import HeaderMain from "../../Components/Header";

/**
 * Componente para a página de contatos.
 * @param {Object} props - Propriedades passadas para o componente.
 * @returns {React.ReactElement} A página de contatos.
 * @description
 * O componente 'contatos' renderiza uma página com um cabeçalho e um título de "Contatos". 
 * É utilizado para exibir informações de contato ou um formulário de contato para os usuários.
 */
export default function contatos(props){
    return(
    <>
        <HeaderMain></HeaderMain>
        <h1>Contatos</h1>
    </>
    );
}