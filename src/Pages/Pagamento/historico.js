import { Table } from 'react-bootstrap';
import { useState } from 'react';
import "./styles.css";

export default function Historico(params) {
    const [dados] = useState(
        {
            carro: 'Ford KA',
            nome: 'José Silva Ribeiro',
            valorDiario: '5,00',
            quantDias: '4',
            formPagamento: 'Pix',
        },
        {
            carro: 'Ford Fiesta',
            nome: 'Afonso Silva Ribeiro',
            valorDiario: '5,00',
            quantDias: '2',
            formPagamento: 'Cartão',
        },
    );

    return (
        <>
            <div className="pagamento">
                <h2>Histórico de pagamento</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Carro Alugado</th>
                            <th>Valor diário</th>
                            <th>Dias Alugado</th>
                            <th>Forma de pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={dados.nome}>
                            <td>{dados.nome}</td>
                            <td>{dados.carro}</td>
                            <td>{dados.valorDiario}</td>
                            <td>{dados.quantDias}</td>
                            <td>{dados.formPagamento}</td>
                        </tr>
                    </tbody>
                </Table>

            </div>

        </>
    );
}
