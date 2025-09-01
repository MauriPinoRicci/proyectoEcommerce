import { Request, Response } from "express";
import { validateEmail } from "../helpers/validationHelpers";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUsersByIdService,
  loginUserService,
} from "../services/userService";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'No users found') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An error occurred while fetching users', details: error.message });
      }
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getUsersByIdController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await getUsersByIdService(userId);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, username, email, birthdate, nDni, password } = req.body;

    if (!name || !username || !email || !birthdate || !nDni || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const result = await createUserService({
      name,
      username,
      email,
      birthdate,
      nDni,
      password,
    });

    if (result) {
      res.status(201).json(result);
    } else {
      res.status(400).json({ message: "User could not be created" });
    }
  } catch (error) {
    console.error("Error in createUserController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await loginUserService(username, password);

    if (user) {
      res.status(200).json({
        login: true,
        message: "Login successful",
        user, 
      });
    } else {
      res.status(401).json({
        login: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      login: false,
      message: "An unexpected error occurred",
    });
  }
};
export const deleteUserController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await deleteUserService(userId);

    if (result) {
      res.status(200).json({ message: "User successfully deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in deleteUserController:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
