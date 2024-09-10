import React, { useState, useEffect } from "react";
import { getAllCarrosByUser, deleteCarroByUser, findCarroById } from "../Services/carrosServices";
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
  const [messageRemoveFail, setMessageRemoveFail] = useState('');
  
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
  }, [messageRemove]);

  /**
     * Função para apaga um carro do usuário.
     */
  const apagarCarro = async (id) => {
    try {
      const certificaCarro = await findCarroById(id);
      const temDiasAlugado = certificaCarro.data.carros.diasAlugado;
      console.log("certificaCarro:", temDiasAlugado);
      if (temDiasAlugado.length == 0){
        console.log("Dentro do if:", temDiasAlugado);
        const data = await deleteCarroByUser(id);
        setMessageRemove(data.data.message);
      }
      else{
        setMessageRemoveFail('Não é possível deletar este carro, porque este carro possui aluguel ativo')       
      }
      
    } catch (error) {
      console.error("Erro ao buscar carros:", error.response.data.message);
      //setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
      setCarros([]); 
    }
  };

  /**
   * Função para lidar com a remoção de um carro.
   * @param {string} id - O ID do carro a ser removido.
   */
  function RemoveCarro(id){
    apagarCarro(id);
  }
  return (
    <div>
        <HeaderMain/>
        {messageRemove && <Message type="success" msg={messageRemove}/>}
        {messageRemoveFail && <Message type="error" msg={messageRemoveFail}/>}
            <div className="carro-container">
                <div className="carro-titulo">
                    <h1>Meus carros</h1>
                </div>
                <div className="carro">
                    {carros.length > 0 &&
                    carros.map((carro) => (
                        <Atualizarcarrocard id={carro.id}
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
