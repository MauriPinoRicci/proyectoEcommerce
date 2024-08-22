import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Appointment from "../../components/appointment/appointment";
import axios from "axios";
import styles from "./MyAppointments.module.css";

const MyAppointments = () => {
  const [turnos, setTurnos] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:3000/appointments/user/${user.id}`)
        .then((res) => setTurnos(res.data))
        .catch((error) => console.error("Error fetching appointments:", error));
    }
  }, [user]);

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>Mis Turnos</h1>
      <h3 className={styles.headerSubtitle}>Tené en cuenta que los turnos no podrán ser cancelados en menos de 24hrs.</h3>
      {turnos.length === 0 ? (
        <h2 className={styles.errorTitle}>No hay turnos reservados.</h2>
      ) : (
        <div>
          {turnos.map((turno, index) => (
            <Appointment
              key={index}
              id={turno.id}
              time={turno.time}
              date={turno.date}
              description={turno.description}
              status={turno.status}
              user={user} 
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default MyAppointments;
