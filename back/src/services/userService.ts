import {
  CrendentialModel,
  UserModel,
} from "../configs/data-source";
import { IUserDto } from "../dtos/userDto";
import { createCredentialService } from "./credentialsService";
import { format } from "date-fns";

export const getAllUsersService = async () => {
  try {
    const users = await UserModel.find({
      relations: ['appointments'],
    });

    if (users.length === 0) {
      // No se encontraron usuarios
      throw new Error('No users found');
    }

    const formattedUsers = users.map((user) => {
      const formattedAppointments = user.appointments.map((appointment) => ({
        id: appointment.id,
        date: format(new Date(appointment.date), "dd/MM/yyyy"),
        time: appointment.time,
        status: appointment.status,
      }));

      return {
        _id: user.id,
        username: user.username,
        email: user.email,
        birthdate: user.birthdate ? format(new Date(user.birthdate), "dd/MM/yyyy") : null,
        appointments: formattedAppointments, 
      };
    });

    return formattedUsers;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'No users found') {
        throw new Error('No users found');
      }
    } else {
      console.error('An unknown error occurred while fetching users');
    }
    throw error;
  }
};

export const getUsersByIdService = async (id: number) => {
  const user = await UserModel.findOne({
    where: { id },
    relations: ["appointments"],
  });

  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }

  // Formatear las citas del usuario
  const formattedAppointments = user.appointments.map((appointment) => ({
    id: appointment.id,
    date: format(new Date(appointment.date), "dd/MM/yyyy"),
    time: appointment.time,
    status: appointment.status,
  }));

  // Formatear la respuesta del usuario
  const formattedUser = {
    _id: user.id,
    username: user.username,
    email: user.email,
    birthdate: user.birthdate
      ? format(new Date(user.birthdate), "dd/MM/yyyy")
      : null,
    nDni: user.nDni,
    appointments: formattedAppointments,
  };

  return formattedUser;
};

export const createUserService = async (userData: IUserDto) => {
  const { name, email, birthdate, nDni, username, password } = userData;

  const newUser = await UserModel.create({
    name,
    email,
    birthdate,
    nDni,
    username,
  });
  const newCredential = await createCredentialService(username, password);
  newUser.credential = newCredential;

  const result = await UserModel.save(newUser);
  return result;
};

export const loginUserService = async (username: string, password: string) => {
  const credential = await CrendentialModel.findOne({
    where: { username, password },
  });
  if (credential) {
    const user = await UserModel.findOne({
      where: { id: credential.id },
      relations: ["appointments"],
    });

    if (user) {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        birthdate: user.birthdate
          ? format(new Date(user.birthdate), "yyyy-MM-dd")
          : null,
        nDni: user.nDni,
      };
    }
  }

  return null;
};

export const deleteUserService = async (id: number) => {
  try {
    const user = await UserModel.findOneBy({ id });

    if (user) {
      await UserModel.remove(user);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in deleteUserService:", error);
    throw error;
  }
};
