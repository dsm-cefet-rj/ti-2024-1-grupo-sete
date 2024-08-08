import styles from './Botaocriarcarro.module.css'

function Botaocriarcarro({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default Botaocriarcarro