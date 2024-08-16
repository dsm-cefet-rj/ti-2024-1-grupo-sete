import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./Atualizarcarro.css";

export default function AtualizarCarros() {
  const [carros, setCarros] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    const fetchCarros = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clientesCars', {
          headers: {
            'x-auth-token': token,
          },
        });
        
        const data = response.data;
        console.log("Carros encontrados:", data);
        setCarros(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
        setCarros([]); 
      }
    };
  
    fetchCarros();
  }, []);
  
  

  const handleEdit = (carro) => {
    setEditingCarro(carro);
  };

  const handleSave = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();

    if (!editingCarro || !editingCarro.id) {
      console.error('ID do carro é necessário para atualizar');
      return;
    }

    const carroAtualizado = { ...editingCarro }; 
    try {
      const response = await axios.put(`http://localhost:5000/api/cars/${editingCarro.id}`, carroAtualizado, {
        headers: {
          'x-auth-token': token, 
        },
      });
      const updatedCarro = response.data;

      setCarros(carros.map(carro => carro.id === updatedCarro.id ? updatedCarro : carro));
      setMessage('Carro atualizado com sucesso!');
      setEditingCarro(null);
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      setMessage('Erro ao atualizar carro');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCarro(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditingCarro(null);
  };

  return (
    <div className="page-container">
      <HeaderMain />
      <div className="content-wrap">
        {message && <div className="alert alert-success">{message}</div>}
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Dono</th>
                <th>Cidade</th>
                <th>Preço</th>
                <th>Detalhe</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {carros.length === 0 ? (
                <tr>
                  <td colSpan="8">Nenhum carro encontrado.</td>
                </tr>
              ) : (
                carros.map(carro => (
                  <tr key={carro.id}>
                    <td>{carro.id}</td>
                    <td>{carro.modelo}</td>
                    <td>{carro.ano}</td>
                    <td>{carro.dono}</td>
                    <td>{carro.cidade}</td>
                    <td>{carro.preco}</td>
                    <td>{carro.detalhe}</td>
                    <td>
                      <Button onClick={() => handleEdit(carro)}>Editar</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {editingCarro && (
          <div className="form-container">
            <Form onSubmit={handleSave}>
              <h2>Editar Carro</h2>
              <Form.Group controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  name="id"
                  value={editingCarro.id}
                />
              </Form.Group>
              <Form.Group controlId="modelo">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  name="modelo"
                  value={editingCarro.modelo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="ano">
                <Form.Label>Ano</Form.Label>
                <Form.Control
                  type="text"
                  name="ano"
                  value={editingCarro.ano}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="dono">
                <Form.Label>Dono</Form.Label>
                <Form.Control
                  type="text"
                  name="dono"
                  value={editingCarro.dono}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="cidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={editingCarro.cidade}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="preco">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  name="preco"
                  value={editingCarro.preco}
                  onChange={handleChange}
                  step="0.01"
                />
              </Form.Group>
              <Form.Group controlId="detalhe">
                <Form.Label>Detalhe</Form.Label>
                <Form.Control
                  type="text"
                  name="detalhe"
                  value={editingCarro.detalhe}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Salvar</Button>
              <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
            </Form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
