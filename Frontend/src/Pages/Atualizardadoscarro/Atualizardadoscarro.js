import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeaderMain from "../../Components/Header"
import Footer from "../../Components/Footer/footer"
import Formcriarcarro from '../../Pages/Formcriarcarro/Formcriarcarro';
import Message from "../../Components/Message/Message"
import styles from "./Atualizardadoscarro.module.css"
import { updateCarroByUser, findCarroById } from '../Services/carrosServices.js';

function Atualizardadoscarro() {
    const { id } = useParams()
    const [carro, setCarro] = useState([])
    const [showCarroForm, setShowCarroForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        const getCarroById = async () => {
            try {
              const data = await findCarroById(id);
              setCarro(data.data.carros);
            } catch (error) {
              console.error("Erro ao buscar carros:", error.response.data.message);
              setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
              setCarro([]); 
            }
          };
        
          getCarroById();
    }, [showCarroForm])

    

    async function editPost(carro) {
        try{
            let body = {
                modelo: carro.modelo,
                ano: carro.ano,
                cidade: carro.cidade,
                precoPorDia: carro.precoPorDia,
                detalhes: carro.detalhes,
                fotoLink1: carro.fotoLink1
            }
            console.log("\n\nBody:", body);
            const response = await updateCarroByUser(carro.id, body);
            //setEditingCarro(response)
            console.log("\n\nUPDATE CARRO", response)
            setShowCarroForm(false)
            setMessage('Seu carro foi atualizado com sucesso!')
            setType('success')
                
            }catch(error){
              console.error("Erro ao editar carro:", error.response.data.message);
          }
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
            <Link to={"/atualizarcarro"}>
                <button className={styles.btn}> Voltar </button>
            </Link>
            <h1>Dono: {carro.userName}</h1>
            
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
                        <span>Preço diário:</span> {carro.precoPorDia}
                    </p>
                    <p>
                        <span>Detalhes:</span> {carro.detalhes}
                    </p>
                    <p>
                        <span>Foto:</span> {carro.fotoLink1}
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