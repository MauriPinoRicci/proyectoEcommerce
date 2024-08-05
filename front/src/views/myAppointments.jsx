import MyAppointments from "../helpers/myAppointments";
import { useState } from "react";
import Appointment from "../components/appointment/appointment";

const MisTurnos = () => {
  //setTurnos esto va despues de la coma (,)
  const [turnos, ] = useState(MyAppointments);

  console.log(turnos);

  return (
    <>
      <h1>Mis Turnos</h1>
      <h3>Estos son los turnos del Usuario</h3>

      <div>
        {" "}
        {turnos.map((turno, index) => (
          <Appointment
            key={index}
            time={turno.time}
            date={turno.date}
            status={turno.status}
            userId={turno.userId}
          />
        ))}
      </div>
    </>
  );
};

export default MisTurnos;
