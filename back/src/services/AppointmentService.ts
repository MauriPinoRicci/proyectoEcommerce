import { appointmentModel } from "../configs/data-source";
import { IAppointmentDto } from "../dtos/appointmentDto";
import { IAppointment } from "../interfaces/IAppointment";
import { appointmentMock } from "../mocks/mock";

export const getAllAppointmentsService = async () => {
  let result = await appointmentModel.find();
  return result;
};

export const getAllAppointmentByIdService = async (id: number) => {
  let result = await appointmentModel.findOneBy({ id });

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

export const CancelledAppointmentService = async (id: number) => {
  let result = undefined;

  const appointment = await appointmentModel.findOneBy({ id });

  if (appointment !== null) {
    appointment.status = "cancelled";
    appointmentModel.save(appointment);
  }

  return result ;
};
