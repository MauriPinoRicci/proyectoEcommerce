import { Request, Response } from 'express';


export const getUsersController = async (req: Request, res: Response) => {
    await res.send("obtener todos los usuarios");
};

export const getUsersByIdController = async (req: Request, res: Response) => {
    await res.send("obtener los usuarios por id");
};
export const createUserController = async (req: Request, res: Response) => {
    await res.send("crear un nuevo usuario");
};
export const loginUserController = async (req: Request, res: Response) => {
    await res.send("usuario logueado");
};

export const deleteUserController = async (req: Request, res: Response) => {
    await res.send("usuario elimado");
 };
