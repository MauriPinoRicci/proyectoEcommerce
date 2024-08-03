import NavLogo from "./navbarLogo/navbarLogo";
import NavLinks from "./navbarLinks/navbarLinks";
import styles from './navbar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLogo />
      <NavLinks />
    </nav>
  );
};
export default NavBar;
