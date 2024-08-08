import { useHistory } from 'react-router-dom';
import Formcriarcarro from '../../Pages/Formcriarcarro/Formcriarcarro';
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import './Criarcarro.css';

function Criarcarro() {

    const history = useHistory()

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
                history.push('/carros', { message: 'Seu carro foi cadastrado com sucesso!'})
            })
            .catch((err) => console.log(err))
    }

    return(
        <>
        <HeaderMain/>
        <div className="all">
            <div className="criarcarro-container">
                <h2>Cadastrar carro</h2>
                <p>Cadastre aqui seu carro para ser alugado</p>
                <Formcriarcarro handleSubmit={createCarro} botaotxt="Cadastrar carro"/>
            </div>
        </div>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default Criarcarro