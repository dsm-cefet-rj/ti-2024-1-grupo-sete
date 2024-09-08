import React from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";
import { getAllAluguel } from "../Services/aluguelServices.js";
import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

export default function AdminAlugueis() {
  const [aluguel, setAluguel] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const pegaAluguel = async () => {
      try {
        const response = await getAllAluguel();
        console.log("\n\nAluguéis encontrados:", response);
        setAluguel(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar aluguéis:", error.response.data.message);
        setMessage("Erro ao buscar aluguéis. Tente novamente mais tarde.");
        setAluguel([]); 
      }
    };
  
    pegaAluguel();
  }, []);

  return (
    <div>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Aluguéis em andamento</h1>
    <div className="container mt-4">
        {message && <div className="alert alert-danger">{message}</div>}
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
            {aluguel.map((carro) => (
              <tr key={carro.id}>
                <td>{carro.carro}</td>
                <td>{carro.valorTotal}</td>
                <td>{carro.quantidadeDias.length}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setEditingCarro(carro)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
    </div>
  );
}