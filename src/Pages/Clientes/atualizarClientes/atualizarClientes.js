import React, { useEffect, useState } from "react";
import AtualizarClienteCard from "../../../Components/CardAtualizarCliente"
import Message from "../../../Components/Message/message";

export default function AtualizarClientes() {
    const [clientes, setClientes] = useState([])

    const [messageRemove, setMessageRemove] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/clientes', {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
            }
        }).then(resp => resp.json())
            .then((data) => {
                setClientes(data)
            })
            .catch((err) => console.log(err))
    }, [])

    function RemoveCarro(id) {
        fetch(`http://localhost:4000/clientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'aplication/json'
            },
        }).then(resp => resp.json)
            .then(data => {
                setClientes(clientes.filter((clientes) => clientes.id !== id))
                //message
                setMessageRemove('Carro foi removido com sucesso!')
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            {messageRemove && <Message type="success" msg={messageRemove} />}
            <div className="carro-container">
                <div className="carro-titulo">
                    <h1>Ações do clientes</h1>
                </div>
                <div className="carro">
                    {clientes.length > 0 &&
                        clientes.map((cliente) => (
                            <AtualizarClienteCard id={cliente.id}
                                nome={cliente.nome}
                                telefone={cliente.telefone}
                                cpf={cliente.cpf}
                                endereco={cliente.endereco}
                                cnh={cliente.cnh}
                                dataNasc={cliente.dataNasc}
                                key={cliente.id}
                                handleRemove={RemoveCarro}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}
