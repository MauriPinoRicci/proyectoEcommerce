import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducer'; 
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css'; 

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); 
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
