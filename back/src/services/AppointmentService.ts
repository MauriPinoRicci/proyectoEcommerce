import { appointmentModel, UserModel } from "../configs/data-source";
import { IAppointmentDto } from "../dtos/appointmentDto";
import { format, isValid, parse, parseISO } from 'date-fns';



export const getAllAppointmentsService = async () => {
  try {
    // Recupera todas las citas de la base de datos
    const appointments = await appointmentModel.find({ relations: ['user'] });

    // Verifica que todas las fechas sean válidas
    appointments.forEach(appointment => {
      const parsedDate = new Date(appointment.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date format for appointment ID ${appointment.id}`);
      }
    });

    // Formatear las fechas para la respuesta en formato 'DD/MM/YYYY'
    const result = appointments.map(appointment => ({
      id: appointment.id,
      date: format(appointment.date, 'dd/MM/yyyy'),
      time: appointment.time,
      status: appointment.status,
      userId: appointment.user.id, // Agregar userId a la respuesta
      user: {
        id: appointment.user.id,
        username: appointment.user.username,
        email: appointment.user.email,
        birthdate: appointment.user.birthdate ? format(appointment.user.birthdate, 'dd/MM/yyyy') : null,
        nDni: appointment.user.nDni
      }
    }));

    return result;
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error fetching appointments:', error.message);
    } else {
      console.error('An unknown error occurred while fetching appointments');
    }
    throw error;
  }
};



//AGREGAR USER ID Y VERIFICAR QUE NO HAYAN TURNOS POR UN ID QUE NO EXISTA

export const getAllAppointmentByIdService = async (id: number) => {
  try {
    const appointment = await appointmentModel.findOneBy({ id });

    // Verifica que la cita existe y formatea la fecha
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }

    // Parsear la fecha y verificar que sea válida
    const parsedDate = new Date(appointment.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date format for appointment ID ${id}`);
    }

    // Formatear la fecha en el formato 'DD/MM/YYYY'
    return {
      id: appointment.id,
      date: format(parsedDate, 'dd/MM/yyyy'), // Cambia el formato aquí
      time: appointment.time,
      status: appointment.status
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching appointment:', error.message);
    } else {
      console.error('An unknown error occurred while fetching the appointment');
    }
    throw error;
  }
};


export const createAppointmentService = async (
  appointmentData: IAppointmentDto
) => {
  const { date, time, userId } = appointmentData;
  const status = "created"; // Inicializa el valor de status

  // Función para parsear la fecha desde el formato 'DD/MM/YYYY'
  const parseDate = (dateStr: string): Date => {
    return parse(dateStr, 'dd/MM/yyyy', new Date());
  };

  // Convertir la fecha desde el formato 'DD/MM/YYYY' a un objeto Date
  const parsedDate = parseDate(date);

  // Verificar si la fecha es válida
  if (!isValid(parsedDate)) {
    throw new Error('Invalid date format');
  }

  // Buscar el usuario por ID
  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }

  // Crear y guardar el nuevo turno
  const newAppointment = await appointmentModel.create({ 
    date: parsedDate, 
    time, 
    user, 
    status 
  });
  const savedAppointment = await appointmentModel.save(newAppointment);

  // Formatear las fechas para la respuesta en formato 'DD/MM/YYYY'
  const formattedDate = format(savedAppointment.date, 'dd/MM/yyyy');
  const formattedBirthdate = user.birthdate ? format(user.birthdate, 'dd/MM/yyyy') : null;

  return {
    date: formattedDate,
    time: savedAppointment.time,
    status: savedAppointment.status,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      birthdate: formattedBirthdate,
      nDni: user.nDni
    },
    id: savedAppointment.id
  };
};

export const CancelledAppointmentService = async (id: number) => {

  const appointment = await appointmentModel.findOne({ where: { id } });

  if (appointment) {
    if (appointment.status === 'cancelled') {
      return { success: false, message: 'The appointment has already been cancelled.' };
    }

    appointment.status = 'cancelled';
    await appointmentModel.save(appointment);
    return { success: true, message: 'Appointment cancelled successfully.' };
  }

  return { success: false, message: 'Appointment not found.' };
};