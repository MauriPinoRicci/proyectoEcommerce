import { appointmentModel, UserModel } from "../configs/data-source";
import { IAppointmentDto } from "../dtos/appointmentDto";
import { parseISO } from 'date-fns';

export const getAllAppointmentsService = async () => {
  try {
    // Recupera todas las citas de la base de datos
    const appointments = await appointmentModel.find();

    // Verifica que todas las fechas sean válidas
    appointments.forEach(appointment => {
      const parsedDate = new Date(appointment.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date format for appointment ID ${appointment.id}`);
      }
    });

    return appointments;
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      // Si el error es una instancia de Error, imprime el mensaje
      console.error('Error fetching appointments:', error.message);
    } else {
      // Para otros tipos de errores, proporciona un mensaje genérico
      console.error('An unknown error occurred while fetching appointments');
    }
    // Lanza el error para que pueda ser manejado por el controlador de rutas o middleware
    throw error;
  }
};


export const getAllAppointmentByIdService = async (id: number) => {
  let result = await appointmentModel.findOneBy({ id });

  return result;
};

export const createAppointmentService = async (
  appointmentData: IAppointmentDto
) => {
  const { date, time, userId } = appointmentData;
  const status = "created"; // Inicializa el valor de status
  
  const parsedDate = parseISO(date); // Convierte la fecha desde el formato ISO
  const user = await UserModel.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  const newAppointment = await appointmentModel.create({ date: parsedDate, time, user, status });
  const result = await appointmentModel.save(newAppointment);
  return result;
};

export const CancelledAppointmentService = async (id: number) => {

  // Buscar el turno por ID usando un objeto de opciones
  const appointment = await appointmentModel.findOne({ where: { id } });

  if (appointment) {
    if (appointment.status === 'cancelled') {
      // El turno ya está cancelado
      return { success: false, message: 'The appointment has already been cancelled.' };
    }

    // Actualizar el estado del turno a "cancelled"
    appointment.status = 'cancelled';
    await appointmentModel.save(appointment);
    return { success: true, message: 'Appointment cancelled successfully.' };
  }

  return { success: false, message: 'Appointment not found.' };
};