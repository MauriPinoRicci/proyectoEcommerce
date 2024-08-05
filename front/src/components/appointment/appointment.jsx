import PropTypes from 'prop-types';

const Appointment = ({ time, date, status, userId }) => {
  return (
    <div>
      <h4>Hora: {time}</h4>
      <h4>Fecha: {date}</h4>
      <h4>Estado: {status}</h4>
      <h4>ID de Usuario: {userId}</h4>
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