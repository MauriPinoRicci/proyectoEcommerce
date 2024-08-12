import styles from "./header.module.css";

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <h1 className={styles.headerTitle}>¡Welcome Students!</h1>
        </header>
    );
};

export default Header;
