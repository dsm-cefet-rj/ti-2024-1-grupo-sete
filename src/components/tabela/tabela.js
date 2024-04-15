import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Container, Form } from 'react-bootstrap';
import Buttons from '../buttons/buttons';


export default function Tabela(params) {
    const [dados, setDados] = useState({
        carro: 'Ford KA',
        nome: 'José Silva Ribeiro',
        valorDiario: '5,00',
        quantDias: '4',
        formPagamento: 'Pix',
    });

    const [registros, setRegistros] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prevDados => ({
            ...prevDados,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setRegistros(prevRegistros => [...prevRegistros, dados]);
        setDados({
            carro: '',
            nome: '',
            valorDiario: '',
            quantDias: '',
            formPagamento: '',
        });
    };

    return (
        <>
            <Container>
                <h1>Formulário de Pagamentos</h1>
                <Form.Group controlId="formCardHolder">
                    <Form.Label>Titular do Cartão</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome Completo"
                        name="cardHolder"
                        value={dados.nome}
                        onChange={handleChange} />
                </Form.Group>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCardNumber">
                        <Form.Label>Carro</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="5 dias"
                            name="dias"
                            value={dados.carro}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formExpirationDate">
                        <Form.Label>Valor da diária</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0,00"
                            name="expirationDate"
                            value={dados.valorDiario}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formCVV">
                        <Form.Label>quantidade de dias</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="5 dias"
                            name="dias"
                            value={dados.quantDias}
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCardNumber">
                        <Form.Label>Forma de pagamento</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="5 dias"
                            name="dias"
                            value={dados.formPagamento}
                            onChange={handleChange} />
                    </Form.Group>

                    <Buttons />
                </Form>
            </Container>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Carro Alugado</th>
                        <th>Histórico</th>
                    </tr>
                </thead>
                {registros.map((registro, index) => (
                    <tbody>
                        <tr key={index}>
                            <td>{registro.nome}</td>
                            <td>{registro.carro}</td>
                            <td><Button variant="primary">Visualizar</Button>{' '}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </>
    )
}