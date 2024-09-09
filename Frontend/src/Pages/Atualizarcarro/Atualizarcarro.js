import React, { useState, useEffect } from "react";
import { getAllCarrosByUser } from "../Services/carrosServices";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Atualizarcarro.css";
import Message from "../../Components/Message/Message";
import Atualizarcarrocard from "../../Components/Cardatualizarcarro/Atualizarcarrocard.js";

export default function AtualizarCarros() {
  const [carros, setCarros] = useState([]);
  const [messageRemove, setMessageRemove] = useState('');  
  //const [editingCarro, setEditingCarro] = useState(null);
  

  useEffect(() => {
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
  
    fetchCarros();
  }, []);

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
