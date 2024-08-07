import PropTypes from "prop-types";
import styles from "./appointment.module.css";

const Appointment = ({ time, date, status, userId }) => {
  return (
    <div className={styles.appointment}>
      <h4 className={styles.appointment}>
        <span className="material-icons">access_time</span> {time}
      </h4>
      <h4 className={styles.appointment}>
        <span className="material-icons">calendar_month</span> {date}
      </h4>
      <h4 className={`${styles.appointment}`}>
        <span className={styles.estado}>Estado: </span>
        <span className={`${styles[status]}`}>{status}</span>
      </h4>
      <h4 className={styles.appointment}>
        <span className="material-icons">person</span> ID: {userId}
      </h4>
    </div>
  );
};

Appointment.propTypes = {
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default Appointment;
