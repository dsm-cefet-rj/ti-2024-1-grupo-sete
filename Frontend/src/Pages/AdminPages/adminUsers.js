import React from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";
import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { getAllUser } from "../Services/userServices.js";

/**
 * Componente de administração de usuários.
 * @returns {React.ReactElement} Layout da página de administração de usuários cadastrados.
 * @description
 * O componente 'AdminUsers' exibe uma tabela de usuários cadastrados no sistema. A página inclui uma tabela com as 
 * informações de nome, e-mail, telefone e endereço dos usuários, além de um botão para editar as informações de cada 
 * usuário. 
 */
export default function AdminUsers() {
  const [user, setUser] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');

  // Efeito para buscar todos os usuários ao montar o componente
  useEffect(() => {
    const pegaUser = async () => {
      try {
        const response = await getAllUser();
        console.log("\n\nUsuários encontrados:", response);
        setUser(response.data); // Define o estado 'user' com a resposta da API
      } catch (error) {
        console.error("Erro ao buscar usuários:", error.response.data.message);
        setMessage("Erro ao buscar usuários. Tente novamente mais tarde.");
        setUser([]); // Define 'user' como uma lista vazia em caso de erro
      }
    };
  
    pegaUser();
  }, []);

  return (
    <div>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Usuários Cadastrados</h1>
    <div className="container mt-4">
        {message && <div className="alert alert-danger">{message}</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {user.map((carro) => (
              <tr key={carro.id}>
                <td>{carro.name}</td>
                <td>{carro.email}</td>
                <td>{carro.telefone}</td>
                <td>{carro.endereco}</td>
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
