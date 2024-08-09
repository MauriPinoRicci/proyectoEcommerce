import { appointmentModel, UserModel } from "../configs/data-source";
import { IAppointmentDto } from "../dtos/appointmentDto";
import { format, isValid, parse } from 'date-fns';

export const getAllAppointmentsService = async () => {
  try {
    const appointments = await appointmentModel.find({ relations: ['user'] });

    if (appointments.length === 0) {
      throw new Error('No appointments found');
    }

    appointments.forEach(appointment => {
      const parsedDate = new Date(appointment.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date format for appointment ID ${appointment.id}`);
      }
    });

    const result = appointments.map(appointment => ({
      id: appointment.id,
      date: format(appointment.date, 'dd/MM/yyyy'),
      time: appointment.time,
      description: appointment.description, // Agregado description
      status: appointment.status,
      userId: appointment.user.id,
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
      description: appointment.description, // Agregado description
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
  const { date, time, description, userId } = appointmentData; // Agregado description
  const status = "created";

  const parseDate = (dateStr: string): Date => {
    return parse(dateStr, 'dd/MM/yyyy', new Date());
  };

  const parsedDate = parseDate(date);

  if (!isValid(parsedDate)) {
    return {
      errorCode: 400, 
      message: 'Invalid date format'
    };
  }

  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) {
    return {
      errorCode: 400, 
      message: 'User not found'
    };
  }

  try {
    const newAppointment = await appointmentModel.create({ 
      date: parsedDate, 
      time, 
      description, // Agregado description
      user, 
      status 
    });
    const savedAppointment = await appointmentModel.save(newAppointment);

    const formattedDate = format(savedAppointment.date, 'dd/MM/yyyy');
    const formattedBirthdate = user.birthdate ? format(user.birthdate, 'dd/MM/yyyy') : null;

    return {
      date: formattedDate,
      time: savedAppointment.time,
      description: savedAppointment.description, // Agregado description
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
