import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Buttons from '../Buttons/buttons';

export function Forms(params) {

    const [dados, setDados] = useState({
        carro: '',
        nome: '',
        valorDiario: '',
        quantDias: '',
        formPagamento: '',
    });
    const [registros, setRegistros] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setFormData(prevRegistros => [...prevRegistros, dados]);
        setDados({
            carro: '',
            nome: '',
            valorDiario: '',
            quantDias: '',
            formPagamento: '',
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
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Carro</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        type=""
                        placeholder=""
                        name="cardNumber"
                        value={formData.cardCar}
                        onChange={handleChange}
                    >
                        <option>Escolha o carro</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formExpirationDate">
                    <Form.Label>Valor da diária</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0,00"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCVV">
                    <Form.Label>quantidade de dias</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="5 dias"
                        name="dias"
                        value={formData.quant}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Forma de pagamento</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        type=""
                        placeholder=""
                        name="cardNumber"
                        value={formData.formPayment}
                        onChange={handleChange}
                    >
                        <option>Selecione a forma de Pagamento</option>
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
