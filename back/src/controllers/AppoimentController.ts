import { Request, Response } from 'express';

export const getAllAppoiment = async (req: Request, res: Response) => {
  await res.send("obtener todos los turnos de todos los usuarios");
};

export const getAppoiment = async (req: Request, res: Response) => {
  await res.send("obtener el detalle de un turno especifico");
};

export const postAppoiments = async (req: Request, res: Response) => {
  await res.send("agenda un nuevo turno");
};

export const cancelAppoiment = async (req: Request, res: Response) => {
  await res.send("Cambiar el estatus de un turno a cancelled");
};
