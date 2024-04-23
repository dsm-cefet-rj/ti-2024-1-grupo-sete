import Formcriarcarro from '../../Pages/Formcriarcarro/Formcriarcarro';
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import './Criarcarro.css';

function Criarcarro() {
    return(
        <>
        <HeaderMain/>
        <div className="all">
        <div className="criarcarro-container">
            <h2>Cadastrar carro</h2>
            <p>Cadastre aqui seu carro para ser alugado</p>
                <Formcriarcarro botaotxt="Cadastrar carro"/>
        </div>
        </div>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default Criarcarro