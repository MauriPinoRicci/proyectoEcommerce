import { CrendentialModel, UserModel } from "../configs/data-source";
import { IUserDto } from "../dtos/userDto";
import { createCredentialService } from "./credentialsService";

import { format } from "date-fns";

export const getAllUsersService = async () => {
  const users = await UserModel.find();

  const formattedUsers = users.map((user) => {
    return {
      _id: user.id,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate
        ? format(new Date(user.birthdate), "dd/MM/yyyy")
        : null,
    };
  });

  return formattedUsers;
};

export const getAllUsersByIdService = async (id: number) => {
  const user = await UserModel.findOneBy({ id });

  if (!user) {
    throw new Error('User not found');
  }

  const formattedUser = {
    _id: user.id,
    username: user.username,
    email: user.email,
    birthdate: user.birthdate ? format(new Date(user.birthdate), 'dd/MM/yyyy') : null,
  };

  return formattedUser;
};


export const createUserService = async (userData: IUserDto) => {
  const { username, email, birthdate, nDni, password } = userData;

  const newUser = await UserModel.create({ username, email, birthdate, nDni });
  const newCredential = await createCredentialService(email, password);
  newUser.credential = newCredential;

  const result = await UserModel.save(newUser);
  return result;
};

export const loginUserService = async (username: string, password: string) => {
  // Buscar las credenciales por nombre de usuario
  const credential = await CrendentialModel.findOne({ where: { username, password } });

  if (credential) {
    // Buscar el usuario usando el ID de las credenciales
    const user = await UserModel.findOne({ where: { id: credential.id } });

    if (user) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        birthdate: user.birthdate ? format(user.birthdate, 'yyyy-MM-dd') : null,
        nDni: user.nDni
      };
    }
  }
  
  // Si no se encuentran credenciales o usuario
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
    console.error('Error in deleteUserService:', error);
    throw error;
  }
};