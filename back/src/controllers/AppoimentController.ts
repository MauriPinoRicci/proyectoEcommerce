import { Request, Response } from "express";
import {
  CancelledAppointmentService,
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
} from "../services/AppointmentService";

export const getAllAppointmentsController = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointmentsService();
    res.status(200).json(appointments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'No appointments found') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An error occurred while fetching appointments' });
      }
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getAppointmentsByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await getAppointmentByIdService(Number(id));
  if (result.errorCode) {
    res.status(result.errorCode).json({ message: result.message });
  } else {
    res.status(200).json(result);
  }
};

export const createAppointmentController = async (req: Request, res: Response) => {
  const appointmentData = req.body;

  const result = await createAppointmentService(appointmentData);

  if (result.errorCode) {
    res.status(result.errorCode).json({ message: result.message });
  } else {
    res.status(201).json(result);
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