import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeaderMain from "../../Components/Header"
import Footer from "../../Components/Footer/footer"
import Formcriarcarro from '../../Pages/Formcriarcarro/Formcriarcarro';
import Message from "../../Components/Message/Message"
import styles from "./Atualizardadoscarro.module.css"
import { updateCarroByUser, findCarroById } from '../Services/carrosServices.js';

/**
 * Componente para a página de atualização de dados do carro.
 * @returns {React.ReactElement} A página de atualização de dados do carro.
 * @description
 * O componente 'Atualizardadoscarro' permite ao usuário visualizar e atualizar os detalhes de um carro.
 * Utiliza o ID do carro, fornecido via parâmetros de URL, para buscar os dados do carro e exibir um formulário de edição.
 * Também exibe mensagens de sucesso ou erro baseadas nas operações realizadas.
 */
function Atualizardadoscarro() {
    const { id } = useParams()
    const [carro, setCarro] = useState([])
    const [showCarroForm, setShowCarroForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    /**
     * Função para buscar os dados do carro pelo ID.
     */
    useEffect(() => {
        const getCarroById = async () => {
            try {
              const data = await findCarroById(id);
              setCarro(data.data.carros); // Atualiza o estado com os dados do carro
            } catch (error) {
              console.error("Erro ao buscar carros:", error.response.data.message);
              setMessage("Erro ao buscar carros. Tente novamente mais tarde.");
              setCarro([]); // Reseta o estado do carro em caso de erro
            }
          };
        
          getCarroById(); // Chama a função para buscar os dados do carro
    }, [showCarroForm]) // Dependência para re-fetch quando o formulário de edição é mostrado

    /**
     * Função para atualizar os dados do carro.
     * @param {Object} carro - Dados do carro a serem atualizados.
     */
    async function editPost(carro) {
        try{
            let body = {
                modelo: carro.modelo,
                ano: carro.ano,
                cidade: carro.cidade,
                precoPorDia: carro.precoPorDia,
                detalhes: carro.detalhes,
                fotoLink1: carro.fotoLink1,
                enderecoRetirada: carro.enderecoRetirada,
            }
            console.log("\n\nBody:", body);
            const response = await updateCarroByUser(carro.id, body);
            //setEditingCarro(response)
            console.log("\n\nUPDATE CARRO", response)
            setShowCarroForm(false) // Fecha o formulário de edição
            setMessage('Seu carro foi atualizado com sucesso!') // Mensagem de sucesso
            setType('success')// Tipo de mensagem
                
            }catch(error){
              console.error("Erro ao editar carro:", error.response.data.message);
          }
    }

    /**
     * Função para alternar a visibilidade do formulário de edição.
     */
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
                    <p>
                        <span>Endereço retirada:</span> {carro.enderecoRetirada}
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