import React, { useState, useEffect } from "react";
import { getAllAluguelByUser } from "../Services/aluguelServices.js";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Atualizarcarro.css";
import Message from "../../Components/Message/Message";
import { Table, Button, Form } from "react-bootstrap";

export default function AluguelAtivo() {
  const [aluguel, setAluguel] = useState([]);
  const [messageRemove, setMessageRemove] = useState('');  
  //const [editingCarro, setEditingCarro] = useState(null);
  

  useEffect(() => {
    const fetchAluguel = async () => {
      try {
        const data = await getAllAluguelByUser();
        console.log("\n\nAlugueis encontrados by user:", data);
        setAluguel(data.data.results);
      } catch (error) {
        console.error("Erro ao buscar Aluguel:", error.response.data.message);
        //setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
        setAluguel([]); 
      }
    };
  
    fetchAluguel();
  }, []);

  function RemoveCarro(id){
    setMessageRemove('Carro foi removido com sucesso!');
  }
  return (
    <div>
        <HeaderMain/>
        {messageRemove && <Message type="success" msg={messageRemove}/>}
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
            {aluguel.map((aluguel) => (
              <tr key={aluguel.carro}>
                <td>{aluguel.carroId}</td>
                <td>{aluguel.valorTotal}</td>
                <td>{aluguel.quantidadeDias.length}</td>
                <td>
                  <Button
                    variant="primary"
                    //onClick={() => setEditingCarro(aluguel)}
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
