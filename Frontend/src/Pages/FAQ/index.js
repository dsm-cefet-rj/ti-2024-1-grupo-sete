import React, {useState} from "react";
import HeaderMain from "../../Components/Header";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import './index.css';
import Footer from "../../Components/Footer/footer";

/**
 * Componente para a página de Perguntas Frequentes (FAQ).
 * @returns {React.ReactElement} A página de FAQ com perguntas e respostas.
 * @description
 * O componente 'Faq' exibe uma página de perguntas frequentes utilizando um acordeão para mostrar e ocultar as respostas.
 * Ele inclui perguntas e respostas sobre o serviço da empresa, como o que é o DriveZoom, requisitos para alugar um carro, e o processo para 
 * colocar um carro à disposição para aluguel.
 */
export default function Faq(props){
    const [open, setOpen] = useState('0');

    /**
     * Função para alternar a exibição do toggle.
     * @param {string} id - O ID do item do toggle que deve ser aberto ou fechado.
     */
    const toggle = (id) => {
        if (open === id) {
        setOpen(); // fecha o item se estiver aberto
    } else {
        setOpen(id); // abre o item selecionado
    }
};
    return(
    <>
        <HeaderMain></HeaderMain>
    
    <div  className="faq">
        <h1 className="titulo">FAQ</h1>




    <div>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1"><h2>O que é o DriveZoom</h2></AccordionHeader>
          <AccordionBody accordionId="1">
            <h4>Somos uma empresa que tem o objetivo de facilitar a mediação entre um locador e um locatário de carros. No nosso site você pode encontrar
              a melhor oportunidade de economizar alugando carros direto de seus proprietários. Da mesma forma, você poderá colocar o seu carro para lugar
              e trazer uma renda extra para a sua casa!
            </h4>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2"><h2>O que é preciso para alugar um carro?</h2></AccordionHeader>
          <AccordionBody accordionId="2">
            <h4>Será necessário criar uma conta e no cadastro pediremos seus dados (RG, CPF, Carteira de motorista e pontuação). Após uma breve análise dos 
                seus dados, você já poderá aproveitar dos nossos serviços.
            </h4>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3"><h2>Eu quero colocar o meu carro para alugar, do que eu preciso? </h2></AccordionHeader>
          <AccordionBody accordionId="3">
            <h4>Depois de criar sua conta neste site, no seu perfil você poderá acionar a função "Alugar meu Carro". Você terá que preencher um formulário e submeter fotos em boa qualidade do seu carro, documentos seus e do carro e 
                todos as características e acessórios que seu carro possui. Depois de submetido, passará por uma análise, e caso seja aprovado, imediatamente aparecerá em nosso catálogo.</h4>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>

    </div>
    <Footer/>
    </>
    );
}