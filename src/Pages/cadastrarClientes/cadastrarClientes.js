import React from 'react'
import '../style.css';
import { useNavigate } from 'react-router-dom';
import FormClientes from '../Pages/formClientes/formClientes';

export default function CadastrarClientes() {
    const history = useNavigate()

    function createCliente(cliente) {
        fetch("http://localhost:4000/clientes", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cliente)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                history('/listarcliente', { message: 'Seu carro foi cadastrado com sucesso!' })
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="all">
            <div className="criarcarro-container">
                <h2>Cadastrar clientes</h2>
                <FormClientes handleSubmit={createCliente} botaotxt="Cadastrar" />
            </div>
        </div>
    );
}
