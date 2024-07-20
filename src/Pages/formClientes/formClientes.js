import React, { useState } from "react";
import Input from '../../Components/Form/Input';
import Botaocriarcarro from "../../Components/Form/Botaocriarcarro";
import styles from './style.module.css';

const initialClienteData = {
    nome: "",
    cpf: "",
    telefone: "",
    endereco: {
        rua: "",
        numero: "",
        estado: ""
    },
    dataNasc: "",
    cnh: ""
};

function FormClientes({
    handleSubmit,
    botaotxt = "Enviar"
}) {
    const [cliente, setCliente] = useState(initialClienteData);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (cliente.nome === '' || cliente.telefone === '' || cliente.cpf === '' ||
            cliente.endereco.rua === '' || cliente.endereco.numero === '' || cliente.endereco.estado === '' ||
            cliente.dataNasc === '' || cliente.cnh === '') {
            console.error('Por favor, preencha todos os campos.');
            return;
        }
        handleSubmit(cliente);
    };

    const handleInputChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setCliente(prevCliente => ({
            ...prevCliente,
            [name]: value
        }));
    };

    const handleEnderecoChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setCliente(prevCliente => ({
            ...prevCliente,
            endereco: {
                ...prevCliente.endereco,
                [name]: value
            }
        }));
    };

    return ( 
        <form onSubmit = {handleFormSubmit} className = {styles.form}>
        <h2>Cadastro de Clientes</h2> 
        <div className = {styles.formGroup}>
        <Input type = "text"
        text = "Nome"
        name = "nome"
        placeholder = "Insira o nome completo"
        handleOnChange = {
            handleInputChange
        }
        value = {
            cliente.nome
        }/> 
        </div> 
        <div className = {styles.formGroup}>
        <Input type = "text"
        text = "Telefone"
        name = "telefone"
        placeholder = "Insira o telefone"
        handleOnChange = {
            handleInputChange
        }
        value = {
            cliente.telefone
        }
        /> 
        </div> 
        <div className = {styles.formGroup}>
        <Input type = "text"
        text = "CPF"
        name = "cpf"
        placeholder = "Insira o CPF"
        handleOnChange = {
            handleInputChange
        }
        value = {
            cliente.cpf
        }
        /> 
        </div> 
        <div className = {styles.formGroup}>
        <Input type = "text"
        text = "Rua"
        name = "rua"
        placeholder = "Insira a rua"
        handleOnChange = {
            handleEnderecoChange
        }
        value = {
            cliente.endereco.rua
        }
        /> 
        </div> 
        <div className = {styles.formGroup}>
        <Input type = "text"
        text = "Número"
        name = "numero"
        placeholder = "Insira o número"
        handleOnChange = {
            handleEnderecoChange
        }
        value = {
            cliente.endereco.numero
        }
        /> 
        </div> 
        <div className = {
            styles.formGroup
        } >
        <Input type = "text"
        text = "Estado"
        name = "estado"
        placeholder = "Insira o estado"
        handleOnChange = {
            handleEnderecoChange
        }
        value = {
            cliente.endereco.estado
        }
        /> 
        </div> 
        <div className = {styles.formGroup}>
        <Input type = "text"
        text = "Data de Nascimento"
        name = "dataNasc"
        placeholder = "Insira a data de nascimento"
        handleOnChange = {
            handleInputChange
        }
        value = {
            cliente.dataNasc
        }
        /> 
        </div> 
        <div className = {styles.formGroup}>
        <Input type = "text"
        text = "CNH"
        name = "cnh"
        placeholder = "Insira número de CNH"
        handleOnChange = {
            handleInputChange
        }
        value = {
            cliente.cnh
        }
        /> 
        </div> 
        <div className = {styles.buttonContainer}>
        <Botaocriarcarro text = {botaotxt}/> 
        </div> 
        </form>
    );
}

export default FormClientes;
