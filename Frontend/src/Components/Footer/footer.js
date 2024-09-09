import { FaInstagram } from 'react-icons/fa';
import styles from './footer.module.css'

/**
 * Componente de rodapé que exibe links para redes sociais e direitos autorais do site.
 * @component
 * @returns {JSX.Element} Retorna o layout do rodapé com ícone de Instagram e direitos autorais.
 */
function Footer(){
    return (
    <footer className={styles.footer}>
        <ul className={styles.social_list }>
            <p>
                <FaInstagram />
                   DriveZoom
            </p>
        </ul>
        <p className={styles.copy_right}>
            <span>DriveZoom</span> &copy; 2024
        </p>
    </footer>
    )
}

export default Footer