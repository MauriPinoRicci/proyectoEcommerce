import { IUserDto } from "../dtos/userDto";
import { ICredential } from "../interfaces/ICredential";
import { IUser } from "../interfaces/IUser";
import { creadentialMock, usersMock } from "../mocks/mock";
import { createCredentialService } from "../services/credentialsService";

export const getAllUsersService = () => {
  let result = usersMock;
  return result;
};

export const getAllUsersByIdService = (id: number): IUser | undefined => {
  let result = undefined;

  const user = usersMock.find((user) => user.id === id);

  if (user) {
    result = user;
  }

  return result;
};

export const createUserService = async (userData: IUserDto) => {
  const { username, email, birthdate, nDni, password } = userData;
  const newCredential = await createCredentialService(email, password);
  const newUser: IUser = {
    id: usersMock.length + 1,
    username,
    email,
    birthdate,
    nDni,
    credentialsId: newCredential,
  };
  usersMock.push(newUser);
  return newUser;
};
