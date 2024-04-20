import Input from '../../Components/Form/Input'
import Botaocriarcarro from '../../Components/Form/Botaocriarcarro';

import './Formcriarcarro.css';

function Formcriarcarro({botaotxt}) {
    return(
        <form className="form">
            <Input type="text" text="Seu nome" name="name" placeholder="Insira o seu nome"/>
            <Input type="text" text="Modelo do carro" name="modelo" placeholder="Insira o modelo do carro"/>
            <Input type="text" text="Ano de fabricação" name="ano" placeholder="Insira o ano de fabricação"/>
            <Input type="text" text="Preço por dia" name="preço" placeholder="Insira o custo por dia de aluguel"/>
            <Input type="text" text="Tipo de câmbio" name="cambio" placeholder="Insira o tipo de câmbio"/>

            <Botaocriarcarro text={botaotxt}/>
        </form>
    )
}

export default Formcriarcarro