import './Atualizarcarrocard.css'
import { Link } from 'react-router-dom';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function Atualizarcarrocard({id, userName, modelo, ano, cidade, precoPorDia, handleRemove}) {

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