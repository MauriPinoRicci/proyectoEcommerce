import PropTypes from "prop-types";
import styles from "./appointment.module.css";

const Appointment = ({ time, date, description, status }) => {
  // Mapear el estado a su emoji correspondiente
  const statusEmoji = status === 'created' ? '✅' : status === 'cancelled' ? '❌' : '';

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
    </div>
  );
  
};

Appointment.propTypes = {
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, 
  status: PropTypes.string.isRequired,
};

export default Appointment;
