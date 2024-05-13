import React, { useEffect, useState } from "react"
import Message from "../../../../components/message/message"
import { useParams } from "react-router-dom"
import styles from "./style.module.css"
import FormClientes from "../../formClientes/formClientes"

export default function AtualizarDadosCliente() {
    const { id } = useParams()

    const [cliente, setCliente] = useState([])
    const [showClienteForm, setShowClienteForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:4000/clientes/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
            .then((data) => {
                setCliente(data)
            })
            .catch(err => console.log(err))
    }, [id])

    function editPost(clientes) {
        fetch(`http://localhost:4000/clientes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientes),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCliente(data)
                setShowClienteForm(false)
                setMessage('Dados foram atualizados com sucesso!')
                setType('success')

            })
            .catch(err => console.log(err))
    }

    function toggleClienteForm() {
        setShowClienteForm(!showClienteForm)
    }

    return (
        <>
            {message && <Message type={type} msg={message} />}
            <div className={styles.carro_details}>
                <div className={styles.details_container}>

                    <button className={styles.btn} onClick={toggleClienteForm}>{!showClienteForm ? 'Editar cliente' : 'Fechar'}</button>
                    {!showClienteForm ? (
                        <div className={styles.carro_info}>
                            <span>Nome:</span>  {cliente.nome}
                            <br />
                            <span>Telefone:</span> {cliente.telefone}
                            <br />
                            <span>CPF:</span> {cliente.cpf}
                            <br />
                            <span>Data de Nascimento:</span> {cliente.dataNasc}
                            <br />
                            <span>Endereço:</span> {cliente.endereco}
                            <br />
                            <span>CNH:</span> {cliente.cnh}
                        </div>
                    ) : (
                        <div className={styles.carro_info}>
                            <p><FormClientes handleSubmit={editPost} botaotxt={"Salvar"} clientesData={cliente} /></p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
