import { useEffect, useState } from "react";
import Appointment from "../../components/appointment/appointment";
import axios from "axios";
import styles from "./MyAppointments.module.css"

const MyAppointments = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/appoiments")
      .then((res) => setTurnos(res.data));
  }, []);

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>Mis Turnos</h1>

      <div>
        {turnos.map((turno, index) => (
          <Appointment
            key={index}
            time={turno.time}
            date={turno.date}
            description={turno.description}
            status={turno.status}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
