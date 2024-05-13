import { Table } from 'react-bootstrap';
import React from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';
import useAluguelStore from '../../components/Zustand/storeAluguel';

export default function Historico(params) {

    const registros = useAluguelStore((state => state.registros));

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

    );
}