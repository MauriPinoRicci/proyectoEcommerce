import styles from "./header.module.css";
import Login from "../../views/login/Login";
import Register from "../../views/register/Register";

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <h1 className={styles.headerTitle}>¡Welcome Students!</h1>
            <Login/>
            <Register/>
        </header>
    );
};

export default Header;
