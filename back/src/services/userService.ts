import { UserModel } from "../configs/data-source";
import { IUserDto } from "../dtos/userDto";
import { Credential } from "../entities/Crendential";
import { IUser } from "../interfaces/IUser";
import { usersMock } from "../mocks/mock";
import { createCredentialService } from "./credentialsService";

export const getAllUsersService = async () => {
  const users = await UserModel.find();
  return users;
};

export const getAllUsersByIdService = async (id: number) => {
  let result = await UserModel.findOneBy({ id });

  return result;
};

export const createUserService = async (userData: IUserDto) => {
  const { username, email, birthdate, nDni, password } = userData;

  const newUser = await UserModel.create({ username, email, birthdate, nDni });
  const newCredential = await createCredentialService(email, password);
  newUser.credential = newCredential;

  const result = await UserModel.save(newUser);
  return result;
};
