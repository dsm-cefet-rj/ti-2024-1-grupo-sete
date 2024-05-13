import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../components/message/message";
import { useEffect, useState } from "react";
import "./style.css"

export default function Clientes(params) {
    const [clientes, setClientes] = useState([])
    const [messageRemove] = useState('');

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

    return (
        <>
            {messageRemove && <Message type="success" msg={messageRemove} />}
            <div className='historicoTabela'>
            <Link to={`/registar`}><button className="visu" >Adicionar</button></Link>
                <h1>Nossos Clientes</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>CPF</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes?.map((registro, index) => (
                            <tr key={index}>
                                <td>{registro?.nome}</td>
                                <td>{registro?.telefone}</td>
                                <td>{registro?.cpf}</td>
                                <td>{registro?.endereco}</td>
                                <td><Link to={`/atualizarcliente`}><button className='visu ml-2'>Visualizar</button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>

    );
}