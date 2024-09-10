import React, { useState, useEffect } from "react";
import { getAllCarrosByUser } from "../Services/carrosServices";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Atualizarcarro.css";
import Message from "../../Components/Message/Message";
import Atualizarcarrocard from "../../Components/Cardatualizarcarro/Atualizarcarrocard.js";

/**
 * Componente para a página de atualização de carros.
 * @returns {React.ReactElement} A página de atualização de carros.
 * @description
 * O componente 'AtualizarCarros' busca a lista de carros do usuário e exibe cada carro em um card.
 * Permite ao usuário ver uma mensagem de sucesso ao remover um carro.
 * Inclui um cabeçalho e um rodapé.
 */
export default function AtualizarCarros() {
  const [carros, setCarros] = useState([]); // Estado para armazenar a lista de carros
  const [messageRemove, setMessageRemove] = useState('');  // Estado para armazenar mensagens de feedback ao remover carro
  //const [editingCarro, setEditingCarro] = useState(null);
  
  useEffect(() => {
    /**
     * Função para buscar a lista de carros do usuário.
     */
    const fetchCarros = async () => {
      try {
        const data = await getAllCarrosByUser();
        console.log("\n\nCarros encontrados by user:", data);
        setCarros(data.data.results);
      } catch (error) {
        console.error("Erro ao buscar carros:", error.response.data.message);
        //setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
        setCarros([]); 
      }
    };
  
    fetchCarros(); // Chama a função para buscar os carros
  }, []);

  /**
   * Função para lidar com a remoção de um carro.
   * @param {string} id - O ID do carro a ser removido.
   */
  function RemoveCarro(id){
    setMessageRemove('Carro foi removido com sucesso!');
  }
  return (
    <div>
        <HeaderMain/>
        {messageRemove && <Message type="success" msg={messageRemove}/>}
            <div className="carro-container">
                <div className="carro-titulo">
                    <h1>Meus carros</h1>
                </div>
                <div className="carro">
                    {carros.length > 0 &&
                    carros.map((carro) => (
                        <Atualizarcarrocard id={carro.id}
                            userName={carro.userName}
                            modelo={carro.modelo}
                            ano={carro.ano}
                            cidade={carro.cidade}
                            precoPorDia={carro.precoPorDia}
                            key={carro.id}
                            handleRemove={RemoveCarro}
                            />
                    ))}
                </div>
            </div>
        <footer>
            <Footer/>
        </footer>
    </div>
  );
}
