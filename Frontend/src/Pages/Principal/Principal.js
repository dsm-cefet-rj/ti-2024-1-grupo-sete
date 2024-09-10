import React from "react";
import HeaderMain from "../../Components/Header";
import Pesquisa from "../../Components/FerramentaPesquisa/pesquisa";
import Footer from "../../Components/Footer/footer"
import CarrosselCarro from "../../Components/Carrosseis/CarrosselCarro";
import Mensagem from "../../Components/Message/Message";
import { useLocation } from 'react-router-dom'

/**
 * Componente da página principal que exibe o cabeçalho, um carrossel de carros, uma ferramenta de pesquisa, e o rodapé.
 * Também exibe uma mensagem de sucesso se fornecida através do estado da localização.
 * @param {object} props - Propriedades passadas para o componente.
 * @returns {React.ReactElement} O componente da página principal, incluindo o cabeçalho, o carrossel de carros, a ferramenta de pesquisa e o 
 * rodapé. Se houver uma mensagem no estado da localização, ela será exibida acima do carrossel.
 * @description
 * O componente 'Principal' utiliza o hook 'useLocation' do 'react-router-dom' para acessar o estado da localização atual.
 * Se o estado da localização contém uma mensagem ('message'), essa mensagem é exibida utilizando o componente 'Mensagem'.
 * O componente renderiza:
 * - 'HeaderMain': O cabeçalho da página.
 * - 'Mensagem': Componente que exibe uma mensagem de sucesso, se presente no estado da localização.
 * - 'CarrosselCarro': Componente que exibe um carrossel de carros.
 * - 'Pesquisa': Componente para pesquisa de carros.
 * - 'Footer': O rodapé da página.
 */
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