import './Atualizarcarrocard.css'
import { Link } from 'react-router-dom';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function Atualizarcarrocard({id, dono, modelo, ano, cidade, preco, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className="carro-card">
            <h4>Proprietário:<br></br>{dono}</h4>
            <p>
                <span>Modelo:</span> {modelo}
            </p>
            <p>
                <span>R$:</span> {preco}/dia
            </p>
            <div className="carro-card-action">
                <Link className="carro-card-action-link" to="/">
                    <button>
                    <BsPencil/> Editar
                    </button>
                </Link>
                <Link className="carro-card-action-link" to="/">
                <button onClick={remove}>
                    <BsFillTrashFill/> Remover
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Atualizarcarrocard