import { useEffect, useState } from "react";
import Appointment from "../../components/appointment/appointment";
import axios from "axios";

const MyAppointments = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/appoiments")
      .then((res) => setTurnos(res.data));
  }, []);

  return (
    <>
      {/* <h1>Mis Turnos</h1>
      <h3>Estos son los turnos del Usuario</h3> */}

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
    </>
  );
};

export default MyAppointments;
