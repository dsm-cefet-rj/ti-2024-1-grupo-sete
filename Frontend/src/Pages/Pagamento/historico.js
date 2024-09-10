import React, { useState, useEffect } from "react";
import { getAllRegistroByUser } from "../Services/registroServices";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import Message from "../../Components/Message/Message";
import { Table, Button } from "react-bootstrap";

/**
 * Componente para exibir o histórico de pagamentos do usuário.
 * @returns {React.ReactElement} O componente de histórico, que inclui uma tabela com informações de alugueis e uma mensagem de sucesso.
 * @description
 * O componente 'Historico' exibe o histórico de pagamentos realizados pelo usuário. Ele faz uma chamada à API para buscar
 * todos os registros de aluguel associados ao usuário e os exibe em uma tabela. Inclui funcionalidades para:
 * - Carregar e exibir dados de registros de aluguel.
 * - Mostrar uma mensagem de sucesso quando um carro é removido (ainda não implementada para remover efetivamente um carro).
 * @component
 */
export default function Historico() {
  const [registro, setRegistro] = useState([]);
  const [messageRemove, setMessageRemove] = useState('');  
  //const [editingCarro, setEditingCarro] = useState(null);
  

  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const data = await getAllRegistroByUser();
        console.log("\n\nAlugueis encontrados by user:", data);
        setRegistro(data.data.results);
      } catch (error) {
        console.error("Erro ao buscar Aluguel:", error.response.data.message);
        //setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
        setRegistro([]); 
      }
    };
  
    fetchRegistro();
  }, []);

  function RemoveCarro(id){
    setMessageRemove('Carro foi removido com sucesso!');
  }
  return (
    <div>
        <HeaderMain/>
        {messageRemove && <Message type="success" msg={messageRemove}/>}
        <h1 className = 'titulo'> Histórico de Pagamentos</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID carro</th>
              <th>Valor total</th>
              <th>Dias alugados</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {registro.map((registro) => (
              <tr key={registro.carro}>
                <td>{registro.carro}</td>
                <td>{registro.valorTotal}</td>
                <td>{registro.quantidadeDias.length}</td>
                <td>
                  <Button
                    variant="primary"
                    //onClick={() => setEditingCarro(registro)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <footer>
            <Footer/>
        </footer>
    </div>
  );
}