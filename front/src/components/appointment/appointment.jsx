import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cancelAppointment, fetchUserAppointments } from "../../redux/reducer";
import styles from "./appointment.module.css";

const Appointment = ({ id, time, date, description, status, user }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  
  const [localStatus, setLocalStatus] = useState(status);

  const statusEmoji = localStatus === 'created' ? '✅' : localStatus === 'cancelled' ? '❌' : '';

  const handleCancel = async () => {
    try {
      const result = await dispatch(cancelAppointment(id));

      if (result.success) {
        setLocalStatus('cancelled'); 
        if (user && user.id) {
          await dispatch(fetchUserAppointments(user.id));
        }
        alert("Turno cancelado con éxito.");
      } else {
        console.error(result.error);
        alert(`Error al cancelar el turno: ${result.error}`);
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert(`Error al cancelar el turno: ${error.message}`);
    }
  };

  return (
    <div className={styles.appointmentContainer}>
      <h4 className={styles.appointment}>
        <span className={`material-symbols-outlined ${styles.iconSpacing}`}>
          access_time
        </span>
        {time}
      </h4>
      <h4 className={styles.appointment}>
        <span className={`material-symbols-outlined ${styles.iconSpacing}`}>
          calendar_month
        </span>
        {date}
      </h4>
      <h4 className={styles.appointment}>
        <span className={`material-symbols-outlined ${styles.iconSpacing}`}>
          description
        </span>
        {description}
      </h4>
      <h4 className={styles.appointment}>
        <span className={styles.estado}>Estado: </span>
        <span>{statusEmoji}</span>
      </h4>
      {localStatus !== 'cancelled' && (
        <button 
          onClick={handleCancel} 
          className={styles.appointmentCancel}
          disabled={loading} 
        >
          {loading ? "Cancelando..." : "Cancelar Turno"}
        </button>
      )}
    </div>
  );
};

Appointment.propTypes = {
  id: PropTypes.number.isRequired, 
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, 
  status: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Appointment;
