import Mlogo from "../../../assets/Mlogo.jpg";
import styles from '../navbarLogo/navbarLogo.module.css';

const NavLogo = () => {
  return (
    <div className={styles.navLogoContainer}>
      <div>
        <img src={Mlogo} alt="Logo" />
      </div>
      <a href="https://www.instagram.com/isabel.ricci.64/" target="_blank"className={styles.navLogoTitle}>Ricci`s Institute</a>
    </div>

  );
};

export default NavLogo;