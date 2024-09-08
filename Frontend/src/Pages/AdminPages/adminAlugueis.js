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
        console.log("\n\nAluguéis encontrados:", response.data.results);
        setAluguel(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar aluguéis:", error.response.data.message);
        setMessage("Erro ao buscar aluguéis. Tente novamente mais tarde.");
        setAluguel([]); 
      }
    };
  
    pegaAluguel();
  }, []);
  console.log(aluguel)

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
            {aluguel.map((aluguel) => (
              <tr key={aluguel.carro}>
                <td>{aluguel.carroId}</td>
                <td>{aluguel.valorTotal}</td>
                <td>{aluguel.quantidadeDias.length}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setEditingCarro(aluguel)}
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