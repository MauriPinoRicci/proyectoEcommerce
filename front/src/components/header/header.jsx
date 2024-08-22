import { useState } from 'react';
import AppointmentForm from "../appointment/appointmetCreation/appointmentForm";
import styles from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment, fetchUserAppointments } from "../../redux/reducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState(""); 

  const handleCreateAppointment = async (values) => {
    if (!user || !user.id) {
      console.error("No user is logged in.");
      return;
    }

    const appointmentData = {
      ...values,
      userId: user.id,
    };

    const result = await dispatch(createAppointment(appointmentData));

    if (result.success) {
      dispatch(fetchUserAppointments(user.id));
      setMessage("¡Turno creado con éxito!");
    } else {
      setMessage("Hubo un problema al crear el turno."); 
    }
  };

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>¡Welcome, Time to Study!</h1>
      <p className={styles.headerContent}>
        Hello dear students! I hope you are studying hard and above all enjoying
        the learning process! To create an appointment, complete the form and to see in
        better detail, click on the -Mis Turnos- button. Keep going, greetings Isa!
      </p>
      <AppointmentForm onSubmit={handleCreateAppointment} />
      {message && (
        <p
          className={`${styles.message} ${
            message.includes("problema") ? styles.errorMessage : styles.successMessage
          }`}
        >
          {message}
        </p>
      )}
    </header>
  );
};

export default Header;
