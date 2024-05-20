import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Buttons from '../buttons/buttons';

export function Forms() {

    const [tipoPagamento, setTipoPagamento] = useState([
        { value: 'pix', label: 'pix' },
        { value: 'cartão', label: 'cartão' },
        { value: 'boleto', label: 'boleto' }
    ]);

    const [dados, setDados] = useState({
        carro: '',
        nome: '',
        valorDiario: '',
        quantDias: '',
        formPagamento: tipoPagamento,
    });

    const handleSelectChange = (e) => {
        setTipoPagamento(e.target.value);
    };

    // eslint-disable-next-line
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
            formPagamento: [],
        });
    };

    return (
        <Container>
            <h1>Formulário de Pagamentos</h1>
            <Form.Group controlId="formCardHolder">
                <Form.Label>Titular do Cartão</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nome Completo"
                    name="nome"
                    value={dados.nome}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Carro</Form.Label>
                    <Form.Control
                        aria-label="Default select example"
                        type="text"
                        placeholder="Carro alugado"
                        name="carro"
                        value={dados.carro}
                        onChange={handleChange}
                    />

                </Form.Group>

                <Form.Group controlId="formExpirationDate">
                    <Form.Label>Valor da diária</Form.Label>
                    <Form.Control
                        aria-label="Default select example"
                        type="text"
                        placeholder=""
                        name="valorDiario"
                        value={dados.valorDiario}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCVV">
                    <Form.Label>quantidade de dias</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="5 dias"
                        name="quantDias"
                        value={dados.quantDias}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Forma de pagamento</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        placeholder=""
                        name="cardNumber"
                        value={tipoPagamento}
                        onChange={handleSelectChange}
                    >
                        <option>Selecione a forma de pagamento</option>
                        <option value="1">Cartão</option>
                        <option value="2">Pix</option>
                        <option value="3">Boleto</option>
                    </Form.Select>
                </Form.Group>

                <Buttons />
            </Form>
        </Container>
    );
}

export default Forms;
