import { Request, Response } from 'express';


export const getUsers = async (req: Request, res: Response) => {
    await res.send("obtener todos los usuarios");
};

export const getUsersById = async (req: Request, res: Response) => {
    await res.send("obtener los usuarios por id");
};
export const createUser = async (req: Request, res: Response) => {
    await res.send("crear un nuevo usuario");
};
export const loginUser = async (req: Request, res: Response) => {
    await res.send("usuario logueado");
};

export const deleteUser = async () => { };
