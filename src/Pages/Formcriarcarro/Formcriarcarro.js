import {useState} from 'react'

import Input from '../../Components/Form/Input'
import Botaocriarcarro from '../../Components/Form/Botaocriarcarro';

import './Formcriarcarro.css';

function Formcriarcarro({handleSubmit, botaotxt, carroData}) {
    const [carro, setCarro] = useState(carroData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(carro)
        if (carro.dono==='' || carro.preco==='' || carro.cidade==='' || carro.modelo==='') {
            console.error('Por favor, preencha todos os campos.');
            return;
        }
    }

    function handleChange(e) {
        setCarro({ ...carro, [e.target.name]: e.target.value })
    }

    return(
        <form onSubmit={submit} className="form">
            <Input type="text" text="Seu nome" name="dono" placeholder="Insira o seu nome" handleOnChange={handleChange} value={carro.dono}/>
            
            <Input type="text" text="Modelo do carro" name="modelo" placeholder="Insira o modelo do carro" handleOnChange={handleChange} value={carro.modelo}/>

            <Input type="text" text="Ano de fabricação" name="ano" placeholder="Insira o ano de fabricação" handleOnChange={handleChange} value={carro.ano}/>

            <Input type="text" text="Cidade" name="cidade" placeholder="Insira a cidade" handleOnChange={handleChange} value={carro.cidade}/>

            <Input type="text" text="Preço por dia" name="preco" placeholder="Insira o custo por dia de aluguel" handleOnChange={handleChange} value={carro.preco}/>

            <Input type="text" text="Mais detalhes sobre o carro" name="detalhe" placeholder="Insira detalhes sobre o carro" handleOnChange={handleChange} value={carro.detalhe}/>


            {/*<div className="input-file">
            <Input type="file" text="Foto do carro" name="Image" placeholder="Insira uma foto do carro" handleOnChange={handleChange} value={carro.Image}/>
             </div>*/}


            <Botaocriarcarro text={botaotxt}/>
        </form>
    )
}

export default Formcriarcarro