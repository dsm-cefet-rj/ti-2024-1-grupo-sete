import React from 'react';
import { Table } from 'react-bootstrap';
import "./styles.css";
import HeaderMain from '../../Components/Header';
import Footer from '../../Components/Footer/footer';
import useAluguelStore from '../../Components/Zustand/storeAluguel';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom';

export default function HistoricoDetalhes() {
    const dados = useAluguelStore((state => state.registros));
    const {index} = useParams();

    return (
        <>
        <HeaderMain/>
            <div className="pagamentos">
                <h2>Detalhes do pagamento</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Carro Alugado</th>
                            <th>Valor diário</th>
                            <th>Dias Alugado</th>
                            <th>Total</th>
                            <th>Forma de pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{dados[index].nome}</td>
                            <td>{dados[index].carro}</td>
                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados[index].valorDiario)}</td>
                            <td>{dados[index].quantDias}</td>
                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados[index].valorDiario * dados[index].quantDias)}</td>
                            <td>{dados[index].formPagamento}</td>
                        </tr>
                    </tbody>
                </Table>

            </div>
            <div className="button-container">
                <Link className="pagPag" aria-current="page" to={'/historico'}>
                    <button className="button-voltar">Voltar</button>
                </Link>
            </div>
            <Footer></Footer>
        </>
    );
}