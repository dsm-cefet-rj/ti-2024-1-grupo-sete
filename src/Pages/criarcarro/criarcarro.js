import FormCriarCarro from '../../Components/FormCriarCarro/formcriarcarro';
import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import './criarcarro.css'

function criarcarro() {
    return(
        <>
        <HeaderMain/>
        <div className="criarcarro-container">
            <h1>Cadastrar Carro</h1>
            <p>Cadastre aqui seu carro para ser alugado</p>
            <FormCriarCarro/>
        </div>

        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default criarcarro