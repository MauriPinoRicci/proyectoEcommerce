import { Link } from "react-router-dom";
import styles from "./navbarLinks.module.css";

const NavLinks = () => {
  return (
    <div className={styles.navbarContainer}>
      <ul className={styles.navbarLinks}>
        <li>
          <Link className={styles.LinkSingUp} to="/">Sing up</Link>
        </li>
        <li>
          <Link className={styles.LinkLogin} to="/">Log in</Link>
        </li>
        <li>
          <Link className={styles.Links} to="/appoiments">Mis Turnos</Link>
        </li>
        <li>
          <Link className={styles.Links} to="/contact">Contacto</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
