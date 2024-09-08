import React from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";
import { getAllRegistro } from "../Services/registroServices.js";
import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import format from "date-fns/format";


export default function AdminRegistros() {
  const [registro, setRegistro] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const pegaRegistro = async () => {
      try {
        const response = await getAllRegistro();
        console.log("\n\nRegistros encontrados:", response.data.results);
        setRegistro(response.data.results);
      } catch (error) {
        console.error(error.response.data.message);
        setMessage("Erro ao buscar registros. Tente novamente mais tarde.");
        setRegistro([]); 
      }
    };
  
    pegaRegistro();
  }, []);
  console.log("\n\nRegistros:", registro)

  return (
    <div>
    <HeaderMain/>
    <AdminMenu/>

    <h1 className="titulo">Registros em andamento</h1>
    <div className="container mt-4">
        {message && <div className="alert alert-danger">{message}</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Locatário (cliente)</th>
              <th>Valor total</th>
              <th>Forma de pagamento</th>
              <th>Data pagamento</th>
              <th>Dias alugados</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {registro.map((registro) => (
              <tr key={registro._id}>
                <td>{registro.userId}</td>
                <td>{registro.valorTotal}</td>
                <td>{registro.formaPagamento}</td>
                <td>{format(registro.dataDoPagamento, "dd/MM/yyyy")}</td>
                <td>{registro.quantidadeDias.length}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setEditingCarro(registro)}
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