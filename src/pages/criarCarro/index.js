import { useNavigate } from 'react-router-dom';
import './style.css';
import FormCriarCarro from './formCriarCarro/index';

function Criarcarro() {

    const history = useNavigate()

    function createCarro(carro) {

        carro.diasAlugado = []
        //carro.detalhe = " "
        //carro.ano = " "

        fetch("http://localhost:4000/carros", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(carro)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                history.push('/', { message: 'Seu carro foi cadastrado com sucesso!' })
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="all">
                <div className="criarcarro-container">
                    <h2>Cadastrar carro</h2>
                    <p>Cadastre aqui seu carro para ser alugado</p>
                    <FormCriarCarro handleSubmit={createCarro} botaotxt="Cadastrar carro" />
                </div>
            </div>
        </>
    )
}

export default Criarcarro