import { FaInstagram } from 'react-icons/fa';
import styles from './footer.module.css'

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
            <span>Costs</span> &copy; 2024
        </p>
    </footer>
    )
}

export default Footer