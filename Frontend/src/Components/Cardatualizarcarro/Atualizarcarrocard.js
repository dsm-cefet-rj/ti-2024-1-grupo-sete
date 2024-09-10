import './Atualizarcarrocard.css'
import { Link } from 'react-router-dom';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

/**
 * Componente de card para exibir informações de um carro e permitir ações de edição e remoção.
 * @component
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {string} props.id - ID do carro.
 * @param {string} props.modelo - Modelo do carro.
 * @param {number} props.ano - Ano do carro.
 * @param {string} props.cidade - Cidade onde o carro está localizado.
 * @param {number} props.precoPorDia - Preço do aluguel do carro por dia.
 * @param {function} props.handleRemove - Função para remover o carro.
 * @returns {JSX.Element} Retorna um elemento JSX que representa o cartão de informações do carro.
 */
function Atualizarcarrocard({id, modelo, ano, cidade, precoPorDia, handleRemove}) {

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
            <h4>Modelo:<br></br>{modelo}</h4>
            <p>
                <span>Ano:</span> {ano}
            </p>
            <p>
                <span>Cidade:</span> {cidade}
            </p>
            <p>
                <span>R$:</span> {precoPorDia}/dia
            </p>
            <div className="carro-card-action">
                <Link className="carro-card-action-link" to={`/atualizardadoscarro/${id}`}>
                    <button>
                    <BsPencil/> Editar
                    </button>
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Remover
                </button>
                
            </div>
        </div>
    )
}

export default Atualizarcarrocard