import React, { useEffect, useState } from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";
import { getAllAluguel } from "../Services/aluguelServices.js";
import { Table, Button, Form } from "react-bootstrap";
import ReactPaginate from 'react-paginate'; // Importa o componente de paginação
import format from "date-fns/format";
import "./adminAluguel.css"; // Supondo que tenha um CSS similar
import Footer from "../../Components/Footer/footer.js";
import { Card } from "reactstrap";

/**
 * Componente para exibir e gerenciar aluguéis em andamento na página de administração.
 * @returns {React.ReactElement} O layout da página de administração de aluguéis, incluindo filtros, tabela com registros e paginação.
 * @description
 * O componente 'AdminAlugueis' é responsável por buscar, filtrar, ordenar e paginar a lista de aluguéis em andamento.
 * Inclui funcionalidades para filtragem por usuário, modelo e valor, além de ordenação e paginação dos registros.
 * Também permite a edição de registros de aluguel e exibe mensagens de erro se houver problemas ao buscar os dados.
 */
export default function AdminAlugueis() {
  const [aluguel, setAluguel] = useState([]);
  const [filteredAluguel, setFilteredAluguel] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');
  
  // Estados para os filtros
  const [userFilter, setUserFilter] = useState('');
  const [modeloFilter, setModeloFilter] = useState('');
  const [valorFilter, setValorFilter] = useState('');
  const [sortCriteria, setSortCriteria] = useState('user'); // Default to 'user'
  const [sortOrder, setSortOrder] = useState('asc'); // Default to 'asc'

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const pegaAluguel = async () => {
      try {
        const response = await getAllAluguel();
        setAluguel(response.data.results);
        setFilteredAluguel(response.data.results); // Inicialmente mostra todos os registros
        console.log("\n\nAluguéis encontrados:", response.data.results);
      } catch (error) {
        console.error("Erro ao buscar aluguéis:", error.response.data.message);
        setMessage("Erro ao buscar aluguéis. Tente novamente mais tarde.");
        setAluguel([]);
        setFilteredAluguel([]);
      }
    };

    pegaAluguel();
  }, []);

  /**
   * Filtra os registros com base nos critérios de filtro e ordena os registros filtrados.
   */
  const filterRecords = () => {
    let filtered = aluguel;

    if (userFilter) {
      filtered = filtered.filter((a) =>
        a.userName.toLowerCase().includes(userFilter.toLowerCase())
      );
    }

    if (modeloFilter) {
      filtered = filtered.filter((a) =>
        a.modelo.toLowerCase().includes(modeloFilter.toLowerCase())
      );
    }

    if (valorFilter) {
      filtered = filtered.filter((a) =>
        a.valorTotal.toString().includes(valorFilter)
      );
    }

    // Ordena os registros filtrados
    const sortedRecords = sortRecords(filtered, sortCriteria, sortOrder);
    setFilteredAluguel(sortedRecords);
  };

  /**
   * Ordena os registros com base no critério e na ordem fornecidos.
   * @param {Array} records - Registros a serem ordenados.
   * @param {string} criteria - Critério de ordenação (e.g., 'user', 'modelo', 'value', 'dias').
   * @param {string} order - Ordem de ordenação ('asc' para ascendente, 'desc' para descendente).
   * @returns {Array} Registros ordenados.
   */
  const sortRecords = (records, criteria, order) => {
    return records.slice().sort((a, b) => {
      let comparison = 0;
      switch (criteria) {
        case 'user':
          comparison = a.userName.localeCompare(b.userName); // Ordena alfabéticamente
          break;
        case 'modelo':
          comparison = a.modelo.localeCompare(b.modelo); // Ordena alfabéticamente
          break;
        case 'value':
          comparison = a.valorTotal - b.valorTotal; // Ordena de menor para maior
          break;
        case 'dias':
          comparison = a.quantidadeDias.length - b.quantidadeDias.length; // Ordena pelo número de dias
          break;
        default:
          return 0;
      }
      return order === 'asc' ? comparison : -comparison; // Inverte a ordem se necessário
    });
  };

  // Execute a filtragem e ordenação sempre que qualquer filtro ou critério de ordenação mudar
  useEffect(() => {
    filterRecords();
  }, [userFilter, modeloFilter, valorFilter, sortCriteria, sortOrder, aluguel]);

  // Atualiza o número total de páginas
  useEffect(() => {
    setPageCount(Math.ceil(filteredAluguel.length / itemsPerPage));
  }, [filteredAluguel, itemsPerPage]);

  /**
   * Trata a mudança no critério de ordenação.
   * @param {string} criteria - O critério de ordenação (e.g., 'user', 'modelo', 'value', 'dias').
   */
  const handleSortChange = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc')); // Alterna a ordem
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc'); // Default -> ordem ascendente para novos criteria
    }
  };

  /**
   * Renderiza o ícone de seta de ordenação com base no critério e na ordem.
   * @param {string} criteria - O critério de ordenação (e.g., 'user', 'modelo', 'value', 'dias').
   * @returns {string} O ícone de seta de ordenação.
   */
  const renderSortArrow = (criteria) => {
    if (sortCriteria === criteria) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  /**
   * Trata a mudança de página na paginação.
   * @param {Object} event - Evento de mudança de página.
   */
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Pagina os registros filtrados
  const paginatedRecords = filteredAluguel.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <HeaderMain />
      <AdminMenu />

      <h1 className="titulo">Aluguéis em andamento</h1>
      <div className="container mt-4">
        {message && <div className="alert alert-danger">{message}</div>}
        
        <Card>
          <Form className="mb-4">
            <Form.Group controlId="userFilter">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filtrar por usuário"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="modeloFilter">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filtrar por modelo"
                value={modeloFilter}
                onChange={(e) => setModeloFilter(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="valorFilter">
              <Form.Label>Valor total</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filtrar por valor"
                value={valorFilter}
                onChange={(e) => setValorFilter(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th
                onClick={() => handleSortChange('user')}
                className={`sortable ${sortCriteria === 'user' ? sortOrder : ''}`}
              >
                Usuário {renderSortArrow('user')}
              </th>
              <th
                onClick={() => handleSortChange('modelo')}
                className={`sortable ${sortCriteria === 'modelo' ? sortOrder : ''}`}
              >
                Modelo {renderSortArrow('modelo')}
              </th>
              <th
                onClick={() => handleSortChange('value')}
                className={`sortable ${sortCriteria === 'value' ? sortOrder : ''}`}
              >
                Valor total {renderSortArrow('value')}
              </th>
              <th
                onClick={() => handleSortChange('dias')}
                className={`sortable ${sortCriteria === 'dias' ? sortOrder : ''}`}
              >
                Dias alugados {renderSortArrow('dias')}
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((aluguel) => (
              <tr key={aluguel._id}>
                <td>{aluguel.userName}</td>
                <td>{aluguel.modelo}</td>
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

        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>

      <Footer />
    </div>
  );
}
