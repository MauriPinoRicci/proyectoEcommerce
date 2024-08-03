import Mlogo from '../../assets/Mlogo.jpg';
import styles from '../navbarLogo/navbarLogo.module.css';

const NavLogo = () => {
  return (
    <div className={styles.logo}>
      <img src={Mlogo} alt="Logo" />
    </div>
  );
};

export default NavLogo;
