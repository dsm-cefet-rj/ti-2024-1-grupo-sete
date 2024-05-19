import React, { useState } from "react";
import Input from '../../../Components/Form/Input';
import Botaocriarcarro from "../../../Components/Form/Botaocriarcarro";
import './style.module.css';

function FormClientes({ handleSubmit, botaotxt, clientesData }) {
    const [cliente, setClientes] = useState(clientesData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(cliente)
        if (cliente.nome === '' || cliente.telefone === '' || cliente.email === '' || cliente.cpf === ''
            || cliente.endereco === '' || cliente.dataNasc === '' || cliente.cnh === ''
        ) {
            console.error('Por favor, preencha todos os campos.');
            return;
        }
    }

    function eventChange(e) {
        setClientes({ ...cliente, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={submit} className="form">
                <Input type="text" text="Nome" name="nome" placeholder="Insira o nome completo" handleOnChange={e => eventChange(e)} value={cliente.nome} />

                <Input type="text" text="Telefone" name="telefone" placeholder="Insira o telefone" handleOnChange={e => eventChange(e)} value={cliente.telefone} />

                <Input type="text" text="CPF" name="cpf" placeholder="Insira o cpf" handleOnChange={e => eventChange(e)} value={cliente.cpf} />

                <Input type="text" text="Endereço" name="endereco" placeholder="Insira o endereço" handleOnChange={e => eventChange(e)} value={cliente.endereco} />

                <Input type="text" text="Data de Nascimento" name="dataNasc" placeholder="Insira a data de nascimento" handleOnChange={e => eventChange(e)} value={cliente.dataNasc} />

                <Input type="text" text="CNH" name="cnh" placeholder="Insira número de cnh" handleOnChange={e => eventChange(e)} value={cliente.cnh} />

                {/*<div className="input-file">
                        <Input type="file" text="Foto do carro" name="Image" placeholder="Insira uma foto do carro" handleOnChange={handleChange} value={carro.Image}/>
                    </div>*/}


                <Botaocriarcarro text={botaotxt} />
            </form>
        </>
    );
}

export default FormClientes
