import { Request, Response } from "express";
import {
  CancelledAppointmentService,
  createAppointmentService,
  getAllAppointmentByIdService,
  getAllAppointmentsService,
} from "../services/AppointmentService";

export const getAppointmentsController = async (req: Request, res: Response) => {
  try {
    const result = await getAllAppointmentsService();
    res.status(200).json(result); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while fetching appointments' });
    }
  }
};


export const getAppointmentsByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = await getAllAppointmentByIdService(Number(id));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const appointmentData = req.body; 
    const result = await createAppointmentService(appointmentData);
    res.status(201).send(result); 
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'An unexpected error occurred' });
    }
  }
};

export const CancelledAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = await CancelledAppointmentService(Number(id));

    if (result.success) {
      res.status(200).send({ message: result.message });
    } else {
      res.status(404).send({ message: result.message });
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while cancelling the appointment.' });
  }
};