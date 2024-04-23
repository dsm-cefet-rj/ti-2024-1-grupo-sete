import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAluguelStore from '../Zustand/storeAluguel';
import {Link} from 'react-router-dom';
import './tabela.css'
import HistoricoTabela from '../historico/historicoTabela';


export default function Tabela(params) {

    const carro = useAluguelStore((state=> state.carroId));
    const totalDias = useAluguelStore((state) => state.diasAluguel);
    const registros = useAluguelStore((state=> state.registros));
    const setRegistros = useAluguelStore((state=> state.adicionarRegistro));

    const [tipoPagamento, setTipoPagamento] = useState([
        { value: 'pix', label: 'pix' },
        { value: 'cartão', label: 'cartão' },
        { value: 'boleto', label: 'boleto' }
    ]);

    const [dados, setDados] = useState({
        carro: carro.modelo,
        nome: "João da Silva",
        valorDiario: carro?.preco,
        quantDias: totalDias.length,
        formPagamento: "default",
    });

    


    const handleSelectChange = (e) => {
        setTipoPagamento(e.target.value)
        const selectedValue = e.target.value;
        setTipoPagamento(selectedValue);
        setDados((prevDados) => ({
            ...prevDados,
            formPagamento: selectedValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setRegistros(dados);
        setDados((prevDados) => ({
            ...prevDados,
            formPagamento: tipoPagamento,
        }));

    };

    return (
        <>
            <Container>
                <div className='titulo'>
                    <h1>Formulário de Pagamentos</h1>
                </div>
                
                <Form.Group controlId="formCardHolder">
                    <Form.Label className='pag'>Titular: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome Completo"
                        name="nome"
                        value= "João da Silva"
                        disabled
                    />
                </Form.Group>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCardNumber">
                        <Form.Label className='pag'>Carro: </Form.Label>
                        <Form.Control
                            aria-label="Default select example"
                            type="text"
                            placeholder="Carro alugado"
                            name="carro"
                            value={carro?.modelo}
                            disabled
                        />

                    </Form.Group>

                    <Form.Group controlId="formExpirationDate">
                        <Form.Label className='pag'>Valor diário: </Form.Label>
                        <Form.Control
                            aria-label="Default select example"
                            type="text"
                            placeholder="Valor diario"
                            name="valorDiario"
                            value={carro?.preco}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId="formCVV">
                        <Form.Label className='pag'>Quantidade de dias: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="5 dias"
                            name="quantDias"
                            value={totalDias.length}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId="formExpirationDate">
                        <Form.Label className='pag'>Total a Pagar: </Form.Label>
                        <Form.Control
                            aria-label="Default select example"
                            type="text"
                            placeholder="Valor total"
                            name="valorDiario"
                            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro?.preco*totalDias.length,)}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId="formCardNumber">
                        <Form.Label className='pag'>Forma de pagamento: </Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            placeholder=""
                            name="cardNumber"
                            value={tipoPagamento}
                            onChange={handleSelectChange}
                        >
                            <option>Selecione a forma de pagamento</option>
                            <option value="Cartão">Cartão</option>
                            <option value="Pix">Pix</option>
                            <option value="Boleto">Boleto</option>
                        </Form.Select>
                    </Form.Group>
                    <div className='button-container'>
                        <Link className="PagPrin" aria-current="page" to='/'>
                            <button  className="button-cancel">cancelar</button>
                        </Link>
                        <button type="submit" className='butPagar'>
                            Pagar
                        </button>
                    </div>
                </Form>
            </Container>
            
            <HistoricoTabela />
        </>
    )
}