import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbarLinks.module.css";
import LogoutButton from "../../logoutComponent/logoutButton";

const NavLinks = ({ showHomeLink = true, showContactLink = true }) => {
  const location = useLocation();

  const isAppointmentsPage = location.pathname === "/appointments";

  return (
    <div className={styles.navbarContainer}>
      <ul className={styles.navbarLinks}>
        {/* <li>
          <Link className={styles.iconLink} to="/">
            <span className="material-icons">person</span>
          </Link>
        </li> */}
        {showHomeLink && (
          <li>
            <Link className={styles.Links} to="/home">
              Home
            </Link>
          </li>
        )}
        {!isAppointmentsPage && (
          <li>
            <Link className={styles.LinksAppointment} to="/appointments">
              Mis Turnos
            </Link>
          </li>
        )}
        {showContactLink && (
          <li>
            <Link className={styles.LinksContact} to="/contact">
              Contacto
            </Link>
          </li>
        )}
        <li >
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

NavLinks.propTypes = {
  showHomeLink: PropTypes.bool,
  showContactLink: PropTypes.bool,
};

export default NavLinks;
