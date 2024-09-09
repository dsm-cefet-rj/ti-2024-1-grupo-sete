import { Table, Button } from 'react-bootstrap';
import useAluguelStore from '../Zustand/storeAluguel';
import {Link} from 'react-router-dom';
import './tabela.css'

/**
 * Componente para exibir o histórico de aluguéis em uma tabela.
 * Este componente utiliza o estado gerenciado pelo Zustand para acessar os registros de aluguéis e os exibe em uma tabela.
 * Cada linha da tabela representa um registro de aluguel com detalhes como nome, carro alugado, valor total, método de pagamento e um link 
 * para detalhes.
 * @component
 * @returns {JSX.Element} Retorna uma tabela com os registros de aluguel e um link para visualizar detalhes adicionais.
 */
export default function HistoricoTabela(params) {

    const registros = useAluguelStore((state=> state.registros));

    return (
        <>
                <div className='historicoTabela'>
                    <h1>Histórico de Aluguéis</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Carro Alugado</th>
                        <th>Valor total</th>
                        <th>Método</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                {registros?.map((registro, index) => (
                        <tr key={index}>
                            <td>{registro?.nome}</td>
                            <td>{registro?.carro}</td>
                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(registro?.valorDiario * registro?.quantDias)}</td>
                            <td>{registro?.formPagamento}</td>
                            <td><Link to={`/historico/${index}`}><button className='visu'>Visualizar</button></Link></td>
                        </tr>
                ))}
                </tbody>
            </Table>
            </div>
        </>
    )
}