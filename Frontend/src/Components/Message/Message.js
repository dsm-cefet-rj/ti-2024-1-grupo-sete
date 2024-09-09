import { useState, useEffect } from 'react'
import styles from './Message.module.css'

/**
 * Componente de mensagem para exibir notificações temporárias na tela.
 * Este componente exibe uma mensagem com base no tipo fornecido e a oculta automaticamente após um período de tempo.
 * O componente utiliza um estado para controlar a visibilidade da mensagem e um efeito para gerenciar o tempo de exibição.
 * @component
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {string} props.type - Tipo da mensagem, que determina a classe de estilo aplicada (ex: 'success', 'error').
 * @param {string} props.msg - Texto da mensagem a ser exibida.
 * @returns {JSX.Element|null} Retorna um elemento JSX com a mensagem, ou `null` se a mensagem não estiver visível.
 */
function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 4000)

        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Message