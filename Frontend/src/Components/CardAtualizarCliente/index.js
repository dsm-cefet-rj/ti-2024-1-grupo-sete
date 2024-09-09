import './style.css'
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

/**
 * Componente de card para exibir informações de um cliente e permitir ações de edição e remoção.
 * @component
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {string} props.id - ID do cliente.
 * @param {string} props.nome - Nome do cliente.
 * @param {string} props.telefone - Telefone do cliente.
 * @param {string} props.cpf - CPF do cliente.
 * @param {string} props.endereco - Endereço do cliente.
 * @param {string} props.dataNasc - Data de nascimento do cliente.
 * @param {string} props.cnh - CNH (Carteira Nacional de Habilitação) do cliente.
 * @param {function} props.handleRemove - Função para remover o cliente.
 * @returns {JSX.Element} Retorna um elemento JSX que representa o cartão de informações do cliente.
 */
export default function AtualizarClienteCard({ id, nome, telefone, cpf, endereco, dataNasc, cnh, handleRemove }) {

    /**
     * Função chamada quando o botão "Remover" é clicado.
     * @param {Event} e - Evento de clique do botão.
     */
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
