import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copy_right}>
                <span>DriveZoom</span> &copy; 2024
            </p>
        </footer>
    );
}