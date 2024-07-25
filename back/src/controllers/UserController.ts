import { Request, Response } from "express";
import {
  getAllUsersService,
  getAllUsersByIdService,
  createUserService,
} from "../services/userService";
import { IUserDto } from "../dtos/userDto";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const result = getAllUsersService();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUsersByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = getAllUsersByIdService(Number(id));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, birthdate, nDni, password }: IUserDto = req.body;
    const newUser = await createUserService({
      username,
      email,
      birthdate,
      nDni,
      password,
    });
    res.status(200).send(newUser);
  } catch (error) {}
};

export const loginUserController = async (req: Request, res: Response) => {
  await res.send("usuario logueado");
};

export const deleteUserController = async (req: Request, res: Response) => {
  await res.send("usuario elimado");
};
