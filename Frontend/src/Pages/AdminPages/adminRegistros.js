import React, { useEffect, useState } from "react";
import HeaderMain from "../../Components/Header/index";
import AdminMenu from "../../Components/MenuAdmin/AdminMenu";
import { getAllRegistro } from "../Services/registroServices.js";
import { Table, Button, Form } from "react-bootstrap";
import format from "date-fns/format";
import { Card } from "reactstrap";
import ReactPaginate from 'react-paginate'; // Importa o componente de paginação
import "./adminRegistro.css";
import Footer from "../../Components/Footer/footer.js";

/**
 * Componente de administração de registros de aluguel.
 * @returns {React.ReactElement} Layout da página de administração dos registros de aluguéis com funcionalidades de filtro, ordenação e paginação.
 * @description
 * O componente 'AdminRegistros' permite que o administrador visualize, filtre e ordene os registros de aluguel de carros.
 * A página inclui uma tabela com os registros de locação, campos de filtro para locatário, valor total e data de pagamento, além de suporte à 
 * paginação para navegar entre grandes volumes de dados.
 */
export default function AdminRegistros() {
  const [registro, setRegistro] = useState([]);
  const [filteredRegistro, setFilteredRegistro] = useState([]);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');
  
  // Estados para os filtros
  const [locatarioFilter, setLocatarioFilter] = useState('');
  const [valorFilter, setValorFilter] = useState('');
  const [dataFilter, setDataFilter] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date'); // Critério de ordenação padrão
  const [sortOrder, setSortOrder] = useState('desc'); // Ordem de ordenação padrão

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const pegaRegistro = async () => {
      try {
        const response = await getAllRegistro();
        setRegistro(response.data.results);
        setFilteredRegistro(response.data.results); // Inicialmente mostra todos os registros
        console.log("VERIFICANDO REGISTRO", response.data.results)
      } catch (error) {
        console.error(error.response.data.message);
        setMessage("Erro ao buscar registros. Tente novamente mais tarde.");
        setRegistro([]);
        setFilteredRegistro([]);
      }
    };
  
    pegaRegistro();
  }, []);
  
  /**
   * Função para filtrar registros de acordo com os filtros de locatário, valor e data.
   */
  const filterRecords = () => {
    let filtered = registro;

    if (locatarioFilter) {
      filtered = filtered.filter((reg) =>
        reg.userId.toLowerCase().includes(locatarioFilter.toLowerCase())
      );
    }
    
    if (valorFilter) {
      filtered = filtered.filter((reg) =>
        reg.valorTotal.toString().includes(valorFilter)
      );
    }
    
    if (dataFilter) {
      filtered = filtered.filter((reg) =>
        format(new Date(reg.dataDoPagamento), "yyyy-MM-dd").includes(dataFilter)
      );
    }

    // Ordena os registros filtrados
    const sortedRecords = sortRecords(filtered, sortCriteria, sortOrder);
    setFilteredRegistro(sortedRecords);
  };

  /**
   * Função para ordenar registros com base no critério e ordem fornecidos.
   * @param {Array} records - Lista de registros.
   * @param {string} criteria - Critério de ordenação (ex: 'name', 'value', 'date').
   * @param {string} order - Ordem de ordenação ('asc' ou 'desc').
   * @returns {Array} Lista de registros ordenados.
   */

  const sortRecords = (records, criteria, order) => {
    return records.slice().sort((a, b) => {
      let comparison = 0;
      switch (criteria) {
        case 'name':
          comparison = a.userId.localeCompare(b.userId); // Ordena alfabéticamente
          break;
        case 'value':
          comparison = a.valorTotal - b.valorTotal; // Ordena de menor para maior
          break;
        case 'date':
          comparison = new Date(a.dataDoPagamento) - new Date(b.dataDoPagamento); // Ordena da mais antiga para a mais recente
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
  }, [locatarioFilter, valorFilter, dataFilter, sortCriteria, sortOrder, registro]);

  // Atualiza o número total de páginas baseado na quantidade de registros filtrados
  useEffect(() => {
    setPageCount(Math.ceil(filteredRegistro.length / itemsPerPage));
  }, [filteredRegistro, itemsPerPage]);

  /**
   * Alterna a ordem de ordenação ou define um novo critério de ordenação.
   * @param {string} criteria - Critério de ordenação.
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
   * Retorna a seta de ordenação correta com base no critério atual.
   * @param {string} criteria - Critério de ordenação.
   * @returns {string} Seta de ordenação ('▲' ou '▼').
   */
  const renderSortArrow = (criteria) => {
    if (sortCriteria === criteria) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  /**
   * Função que lida com a troca de páginas na paginação.
   * @param {object} event - Evento de troca de página.
   */
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Pagina os registros filtrados
  const paginatedRecords = filteredRegistro.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <HeaderMain />
      <AdminMenu />

      <h1 className="titulo">Registros em andamento</h1>
      <div className="container mt-4">
        {message && <div className="alert alert-danger">{message}</div>}
        
        <Card>
          <Form className="mb-4">
            <Form.Group controlId="locatarioFilter">
              <Form.Label>Locatário (cliente)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filtrar por locatário"
                value={locatarioFilter}
                onChange={(e) => setLocatarioFilter(e.target.value)}
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

            <Form.Group controlId="dataFilter">
              <Form.Label>Data pagamento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Filtrar por data"
                value={dataFilter}
                onChange={(e) => setDataFilter(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th
                onClick={() => handleSortChange('name')}
                className={`sortable ${sortCriteria === 'name' ? sortOrder : ''}`}
              >
                Locatário (cliente) {renderSortArrow('name')}
              </th>
              <th
                onClick={() => handleSortChange('value')}
                className={`sortable ${sortCriteria === 'value' ? sortOrder : ''}`}
              >
                Valor total {renderSortArrow('value')}
              </th>
              <th>Forma de pagamento</th>
              <th
                onClick={() => handleSortChange('date')}
                className={`sortable ${sortCriteria === 'date' ? sortOrder : ''}`}
              >
                Data pagamento {renderSortArrow('date')}
              </th>
              <th>Dias alugados</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((registro) => (
              <tr key={registro._id}>
                <td>{registro.userName}</td>
                <td>{registro.valorTotal}</td>
                <td>{registro.formaPagamento}</td>
                <td>{format(registro.dataDoPagamento, "dd/MM/yyyy")}</td>
                <td>{registro.quantidadeDias.length}</td>
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
