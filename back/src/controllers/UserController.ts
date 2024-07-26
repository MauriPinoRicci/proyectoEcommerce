import { Request, Response } from "express";
import {
  getAllUsersService,
  getAllUsersByIdService,
  createUserService,
} from "../services/userService";
import { IUserDto } from "../dtos/userDto";
import { IUser } from "../interfaces/IUser";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersService();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUsersByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getAllUsersByIdService(Number(id));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, birthdate, nDni, password } = req.body;
    const result = await createUserService({
      username,
      email,
      birthdate,
      nDni,
      password,
    });
    if (result) {
      res.status(201).json(result);
    } else {
      res.status(400).send("User is already created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  await res.send("usuario logueado");
};

export const deleteUserController = async (req: Request, res: Response) => {
  await res.send("usuario elimado");
};
