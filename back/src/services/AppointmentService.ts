import { error } from "console";
import { appointmentModel, UserModel } from "../configs/data-source";
import { IAppointmentDto } from "../dtos/appointmentDto";
import { format, isValid, parse, parseISO } from 'date-fns';

export const getAllAppointmentsService = async () => {
  try {
    // Recupera todas las citas de la base de datos
    const appointments = await appointmentModel.find({ relations: ['user'] });


    if (appointments.length === 0) {
      // No se encontraron citas
      throw new Error('No appointments found');
    }
    
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

export const getAppointmentByIdService = async (id: number) => {
  try {

    const appointment = await appointmentModel.findOne({
      where: { id },
      relations: ['user'], 
    });

    if (!appointment) {
      return {
        errorCode: 404, 
        message: `Appointment with ID ${id} not found`
      };
    }

    if (!appointment.user) {
      return {
        errorCode: 404, 
        message: `User for appointment ID ${id} not found`
      };
    }

    // Parsear la fecha y verificar que sea válida
    const parsedDate = new Date(appointment.date);
    if (isNaN(parsedDate.getTime())) {
      return {
        errorCode: 400, 
        message: `Invalid date format for appointment ID ${id}`
      };
    }

    console.log('Appointment found:', appointment);

    return {
      id: appointment.id,
      date: format(parsedDate, 'dd/MM/yyyy'),
      time: appointment.time,
      status: appointment.status,
      user: {
        id: appointment.user.id,
        username: appointment.user.username,
        email: appointment.user.email,
        birthdate: appointment.user.birthdate ? format(new Date(appointment.user.birthdate), 'dd/MM/yyyy') : null,
        nDni: appointment.user.nDni
      }
    };
  } catch (error: unknown) {
    console.error('An error occurred while fetching the appointment:', error);
    return {
      errorCode: 500, 
      message: 'An unexpected error occurred while fetching the appointment'
    };
  }
};

export const createAppointmentService = async (
  appointmentData: IAppointmentDto
) => {
  const { date, time, userId } = appointmentData;
  const status = "created";

  const parseDate = (dateStr: string): Date => {
    return parse(dateStr, 'dd/MM/yyyy', new Date());
  };

  const parsedDate = parseDate(date);

  // Verificar si la fecha es válida
  if (!isValid(parsedDate)) {
    return {
      errorCode: 400, 
      message: 'Invalid date format'
    };
  }

  // Buscar el usuario por ID
  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) {
    return {
      errorCode: 400, 
      message: 'User not found'
    };
  }

  // Crear y guardar el nuevo turno
  try {
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
  } catch (error) {
    // Manejo de errores inesperados
    console.error('Error creating appointment:', error);
    return {
      errorCode: 500, 
      message: 'An unexpected error occurred'
    };
  }
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