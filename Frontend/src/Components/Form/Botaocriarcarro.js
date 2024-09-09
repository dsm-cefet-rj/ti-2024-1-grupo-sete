import styles from './Botaocriarcarro.module.css'

/**
 * Componente de botão utilizado para criar um carro.
 * @component
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.text - Texto a ser exibido no botão.
 * @returns {JSX.Element} Retorna um botão estilizado com o texto fornecido.
 */
function Botaocriarcarro({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default Botaocriarcarro