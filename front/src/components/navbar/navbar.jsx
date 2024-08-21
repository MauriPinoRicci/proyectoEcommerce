import { useLocation } from 'react-router-dom';
import NavLogo from './navbarLogo/navbarLogo';
import NavLinks from './navbarLinks/navbarLinks';
import styles from './navbar.module.css';

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isHomeSubPage = location.pathname === "/home";
  const isTurnosPage = location.pathname === "/appoiments";
  const isContactPage = location.pathname === "/contact";

  return (
    <nav className={styles.navbar}>
      <NavLogo />
      <NavLinks
        showHomeLink={!isHomeSubPage && !isHomePage}
        showAppointmentsLink={!isTurnosPage}
        showContactLink={!isContactPage}
      />
    </nav>
  );
};

export default NavBar;
