import './style.css'
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

export default function AtualizarClienteCard({ id, nome, telefone, cpf, endereco, dataNasc, cnh, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className="carro-card">

            <div style={{ textAlign: 'center', fontSize: '16px' }}>
                <div>
                    <h4>Nome:<br></br>{nome}</h4>
                    <span>Telefone:</span> {telefone}
                </div>
                <div style={{ marginBottom: '5px' }}>
                    <span>Nascido:</span> {dataNasc}
                </div><div>
                    <span>Endereço:</span> {endereco}
                </div><div>
                    <span>CPF:</span> {cpf}
                </div><div>
                    <span>CNH:</span> {cnh}
                </div>
            </div>

            <div className="carro-card-action">
                <Link className="carro-card-action-link" to={`/atualizardadoscliente/${id}`}>
                    <button>
                        <BsPencil /> Editar
                    </button>
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>

            </div>
        </div>
    )
}
