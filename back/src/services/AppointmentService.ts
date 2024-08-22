import { time } from "console";
import { appointmentModel, UserModel } from "../configs/data-source";
import { IAppointmentDto } from "../dtos/appointmentDto";
import { parse, format, isBefore, isWithinInterval,subDays , getDay, startOfDay as startOfDayFn, isEqual } from 'date-fns';

export const getAllAppointmentsService = async () => {
  try {
    const appointments = await appointmentModel.find({
      relations: ["user"],
      order: {
        date: "DESC",
        time: "DESC",
      },
    });

    if (appointments.length === 0) {
      throw new Error("No appointments found");
    }

    appointments.forEach((appointment) => {
      const parsedDate = new Date(appointment.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(
          `Invalid date format for appointment ID ${appointment.id}`
        );
      }
    });

    const result = appointments.map((appointment) => ({
      id: appointment.id,
      date: format(appointment.date, "dd/MM/yyyy"),
      time: appointment.time,
      description: appointment.description,
      status: appointment.status,
      userId: appointment.user.id,
      user: {
        id: appointment.user.id,
        username: appointment.user.username,
        email: appointment.user.email,
        birthdate: appointment.user.birthdate
          ? format(appointment.user.birthdate, "dd/MM/yyyy")
          : null,
        nDni: appointment.user.nDni,
      },
    }));

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching appointments:", error.message);
    } else {
      console.error("An unknown error occurred while fetching appointments");
    }
    throw error;
  }
};

export const getAppointmentsByUserIdService = async (userId: number) => {
  try {
    const appointments = await appointmentModel.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });

    if (appointments.length === 0) {
      throw new Error("No appointments found for the specified user");
    }

    appointments.forEach((appointment) => {
      const parsedDate = new Date(appointment.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(
          `Invalid date format for appointment ID ${appointment.id}`
        );
      }
    });

    const result = appointments.map((appointment) => ({
      id: appointment.id,
      date: format(appointment.date, "dd/MM/yyyy"),
      time: appointment.time,
      description: appointment.description,
      status: appointment.status,
      userId: appointment.user.id,
      user: {
        id: appointment.user.id,
        username: appointment.user.username,
        email: appointment.user.email,
        birthdate: appointment.user.birthdate
          ? format(appointment.user.birthdate, "dd/MM/yyyy")
          : null,
        nDni: appointment.user.nDni,
      },
    }));

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching appointments by user ID:", error.message);
    } else {
      console.error(
        "An unknown error occurred while fetching appointments by user ID"
      );
    }
    throw error;
  }
};

export const createAppointmentService = async (
  appointmentData: IAppointmentDto
) => {
  const { date, time, description, userId } = appointmentData;
  const status = "created";

  const parseDate = (dateStr: string): Date => {
    return parse(dateStr, "dd/MM/yyyy", new Date());
  };

  const parsedDate = parseDate(date);
  const [hours, minutes] = time.split(":").map(Number);
  const appointmentTime = new Date(parsedDate);
  appointmentTime.setHours(hours, minutes);

  const currentDate = startOfDayFn(new Date());
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);

  if (isBefore(parsedDate, currentDate) || (isEqual(parsedDate, currentDate) && isBefore(appointmentTime, currentTime))) {
    return {
      errorCode: 400,
      message: "Appointment date and time cannot be in the past",
    };
  }

  const dayOfWeek = getDay(parsedDate);
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    // 0 = Domingo, 6 = Sábado
    return {
      errorCode: 400,
      message: "Appointments cannot be scheduled on weekends",
    };
  }

  const startOfDay = new Date(parsedDate);
  startOfDay.setHours(8, 0, 0);

  const endOfDay = new Date(parsedDate);
  endOfDay.setHours(19, 0, 0);

  if (
    !isWithinInterval(appointmentTime, { start: startOfDay, end: endOfDay })
  ) {
    return {
      errorCode: 400,
      message: "Appointment time must be between 08:00 and 19:00",
    };
  }

  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) {
    return {
      errorCode: 400,
      message: "User not found",
    };
  }

  try {
    const newAppointment = await appointmentModel.create({
      date: parsedDate,
      time,
      description,
      user,
      status,
    });
    const savedAppointment = await appointmentModel.save(newAppointment);

    const formattedDate = format(savedAppointment.date, "dd/MM/yyyy");
    const formattedBirthdate = user.birthdate
      ? format(user.birthdate, "dd/MM/yyyy")
      : null;

    return {
      date: formattedDate,
      time: savedAppointment.time,
      description: savedAppointment.description,
      status: savedAppointment.status,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        birthdate: formattedBirthdate,
        nDni: user.nDni,
      },
      id: savedAppointment.id,
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return {
      errorCode: 500,
      message: "An unexpected error occurred",
    };
  }
};

export const CancelledAppointmentService = async (id: number) => {
  const appointment = await appointmentModel.findOne({ where: { id } });

  if (appointment) {
    if (appointment.status === "cancelled") {
      return {
        success: false,
        message: "The appointment has already been cancelled.",
      };
    }

    const today = new Date();
    const appointmentDate = new Date(appointment.date);

    const dayBeforeAppointment = subDays(appointmentDate, 1);

    if (isBefore(dayBeforeAppointment, today)) {
      return {
        success: false,
        message: "Appointments can only be cancelled up to the day before the scheduled date.",
      };
    }

    appointment.status = "cancelled";
    await appointmentModel.save(appointment);

    return { success: true, message: "Appointment cancelled successfully." };
  }

  return { success: false, message: "Appointment not found." };
};