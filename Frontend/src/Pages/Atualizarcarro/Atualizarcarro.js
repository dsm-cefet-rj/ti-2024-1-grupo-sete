import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { getAllCarrosByUser } from "../Services/carrosServices";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Atualizarcarro.css";

export default function AtualizarCarros() {
  const [carros, setCarros] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const data = await getAllCarrosByUser();
        console.log("Carros encontrados:", data);
        setCarros(data.data.results);
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
        setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
        setCarros([]); 
      }
    };
  
    fetchCarros();
  }, []);
  
  return (
    <div>
      <HeaderMain />
      <div className="container mt-4">
        <h2>Atualizar Carros</h2>
        {message && <div className="alert alert-danger">{message}</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {carros.map((carro) => (
              <tr key={carro.id}>
                <td>{carro.id}</td>
                <td>{carro.modelo}</td>
                <td>{carro.ano}</td>
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
        {editingCarro && (
          <Form>
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o modelo"
                value={editingCarro.modelo}
                onChange={(e) =>
                  setEditingCarro({ ...editingCarro, modelo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a marca"
                value={editingCarro.marca}
                onChange={(e) =>
                  setEditingCarro({ ...editingCarro, marca: e.target.value })
                }
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={() => {
                // Handle save logic here
              }}
            >
              Salvar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditingCarro(null)}
            >
              Cancelar
            </Button>
          </Form>
        )}
      </div>
      <Footer />
    </div>
  );
}
