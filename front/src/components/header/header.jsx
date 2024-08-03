import styles from "./header.module.css";
import English from "../../assets/image.png";

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <h1 className={styles.headerTitle}>Bienvenidos a Clases</h1>
            <img className={styles.headerImg} src={English} alt="Logo" />
        </header>
    );
};

export default Header;
