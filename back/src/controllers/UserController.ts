import { Request, Response } from "express";
import {
  getAllUsersService,
  getAllUsersByIdService,
  createUserService,
  loginUserService,
  deleteUserService,
} from "../services/userService";

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
//
    if (result) {
      res.status(201).json(result);
    } else {
      res.status(400).send("User data is incorrect");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


export const loginUserController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await loginUserService(username, password);

    if (user) {
      res.status(200).json({
        login: true,
        user
      });
    } else {
      res.status(400).json({ login: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};


export const deleteUserController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await deleteUserService(userId);

    if (result) {
      res.status(200).json({ message: 'User successfully deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in deleteUserController:', error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};