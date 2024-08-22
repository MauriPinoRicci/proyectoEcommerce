import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducer'; // Ajusta la ruta según tu estructura de carpetas
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css'; // Ajusta la ruta según tu estructura de carpetas

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // Redirige a la página de inicio o a donde prefieras
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
