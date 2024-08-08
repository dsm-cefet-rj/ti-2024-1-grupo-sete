import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeaderMain from "../../Components/Header"
import Footer from "../../Components/Footer/footer"
import Formcriarcarro from '../../Pages/Formcriarcarro/Formcriarcarro';
import Message from "../../Components/Message/Message"
import styles from "./Atualizardadoscarro.module.css"

function Atualizardadoscarro() {

    const { id } = useParams()

    const [carro, setCarro] = useState([])
    const [showCarroForm, setShowCarroForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:4000/carros/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then((data) => {
            setCarro(data)
        })
        .catch(err => console.log(err))
    }, [id])

    function editPost(carro) {
        fetch(`http://localhost:4000/carros/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carro),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCarro(data)
            setShowCarroForm(false)
            setMessage('Seu carro foi atualizado com sucesso!')
            setType('success')
            
        })
        .catch(err => console.log(err))
    }

    function toggleCarroForm() {
        setShowCarroForm(!showCarroForm)
    }

    return (
        <>
        <HeaderMain></HeaderMain>
        {message && <Message type={type} msg={message}/>}
        <div className={styles.carro_details}>
        <div className={styles.details_container}>
            <h1>Dono: {carro.dono}</h1>
            <button className={styles.btn} onClick={toggleCarroForm}>{!showCarroForm ? 'Editar carro' : 'Fechar'}</button>
            {!showCarroForm ? (
                <div className={styles.carro_info}>
                    <p>
                        <span>Modelo:</span> {carro.modelo}
                    </p>
                    <p>
                        <span>Ano de fabricação:</span> {carro.ano}
                    </p>
                    <p>
                        <span>Cidade:</span> {carro.cidade}
                    </p>
                    <p>
                        <span>Preço:</span> {carro.preco}
                    </p>
                    <p>
                        <span>Mais detalhes:</span> {carro.detalhe}
                    </p>
                </div>
            ) : (
                <div className={styles.carro_info}>
                    <p><Formcriarcarro handleSubmit={editPost} botaotxt={"Concluir edição"} carroData={carro}/></p>
                </div>
            )}
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default Atualizardadoscarro