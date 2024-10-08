import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./style.css"; 
export default function AtualizarClientes() {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    async function fetchClientes() {
      try {
        const response = await axios.get('http://localhost:5000/api/clientes', {
          headers: {
            'x-auth-token': token 
          }
        });
        const data = response.data;
        console.log("Dados", data);
        
        
        setClientes(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error.response ? error.response.data : error.message);
        setClientes([]);
      }
    }

    fetchClientes();
  }, []);

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
  };

  const handleSave = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();

    if (!editingCliente || !editingCliente.id) {
      console.error('ID do cliente é necessário para atualizar');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/clientes/${editingCliente.id}`, editingCliente, {
        headers: {
          'x-auth-token': token
        }
      });
      const updatedCliente = response.data;

      setClientes(clientes.map(cliente => cliente.id === updatedCliente.id ? updatedCliente : cliente));
      setMessage('Cliente atualizado com sucesso!');
      setEditingCliente(null);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error.response ? error.response.data : error.message);
      setMessage('Erro ao atualizar cliente');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEditingCliente(prev => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value }
    }));
  };

  const handleCancel = () => {
    setEditingCliente(null);
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
                <th>Nome</th>
                <th>Telefone</th>
                <th>CPF</th>
                <th>Endereço</th>
                <th>CNH</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(clientes) && clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.cpf}</td>
                  <td>{`${cliente.endereco.rua}, ${cliente.endereco.numero} - ${cliente.endereco.estado}`}</td>
                  <td>{cliente.cnh}</td>
                  <td>{cliente.dataNasc}</td>
                  <td>
                    <Button onClick={() => handleEdit(cliente)}>Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {editingCliente && (
          <div className="form-container">
            <Form onSubmit={handleSave}>
              <h2>Editar Cliente</h2>
              <Form.Group controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="id"
                  value={editingCliente.id}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={editingCliente.nome}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="telefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={editingCliente.telefone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={editingCliente.cpf}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="enderecoRua">
                <Form.Label>Rua</Form.Label>
                <Form.Control
                  type="text"
                  name="rua"
                  value={editingCliente.endereco?.rua || ''}
                  onChange={handleEnderecoChange}
                />
              </Form.Group>
              <Form.Group controlId="enderecoNumero">
                <Form.Label>Número</Form.Label>
                <Form.Control
                  type="text"
                  name="numero"
                  value={editingCliente.endereco?.numero || ''}
                  onChange={handleEnderecoChange}
                />
              </Form.Group>
              <Form.Group controlId="enderecoEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="estado"
                  value={editingCliente.endereco?.estado || ''}
                  onChange={handleEnderecoChange}
                />
              </Form.Group>
              <Form.Group controlId="cnh">
                <Form.Label>CNH</Form.Label>
                <Form.Control
                  type="text"
                  name="cnh"
                  value={editingCliente.cnh}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="dataNasc">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="text"
                  name="dataNasc"
                  value={editingCliente.dataNasc}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Salvar</Button>
              <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
            </Form>
          </div>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
