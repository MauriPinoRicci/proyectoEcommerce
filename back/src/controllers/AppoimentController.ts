import { Request, Response } from 'express';

export const getAllAppoimentController = async (req: Request, res: Response) => {
  await res.send("obtener todos los turnos de todos los usuarios");
};

export const getAppoimentController = async (req: Request, res: Response) => {
  await res.send("obtener el detalle de un turno especifico");
};

export const postAppoimentsController = async (req: Request, res: Response) => {
  await res.send("agenda un nuevo turno");
};

export const cancelAppoimentController = async (req: Request, res: Response) => {
  await res.send("Cambiar el estatus de un turno a cancelled");
};
