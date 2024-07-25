import { IAppointmentDto } from "../dtos/appointmentDto";
import { IAppointment } from "../interfaces/IAppointment";
import { appointmentMock } from "../mocks/mock";

export const getAllAppointmentsService = () => {
  let result = appointmentMock;
  return result;
};

export const getAllAppointmentByIdService = (
  id: number
): IAppointment | undefined => {
  let result = undefined;

  const appointment = appointmentMock.find(
    (appointment) => appointment.id === id
  );

  if (appointment) {
    result = appointment;
  }

  return result;
};

export const createAppointmentService = async (
  appoimentData: IAppointmentDto
) => {
  const { date, time, userId } = appoimentData;
  const newAppointment: IAppointment = await {
    id: appointmentMock.length + 1,
    date,
    time,
    userId,
    status: "active",
  };
  appointmentMock.push(newAppointment);
  return newAppointment;
};

export const CancelledAppointmentService = (id: number) => {
  let result = false;

  const index = appointmentMock.findIndex(
    (appointment) => appointment.id === id
  );

  if (index !== -1) {
    appointmentMock[index].status = "cancelled";
    result = true;
  }
  return result;
};
