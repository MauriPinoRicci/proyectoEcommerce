import { Request, Response } from "express";
import {
  CancelledAppointmentService,
  createAppointmentService,
  getAllAppointmentByIdService,
  getAllAppointmentsService,
} from "../services/AppointmentService";
import { IAppointmentDto } from "../dtos/appointmentDto";

export const getAppointmentsController = async (req: Request, res: Response) => {
  try {
    const result = await getAllAppointmentsService();
    res.status(200).json(result); // Usa json en lugar de send para respuestas JSON
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Si el error es una instancia de Error, responde con un mensaje de error
      res.status(500).json({ message: error.message });
    } else {
      // Para otros tipos de errores, responde con un mensaje genérico
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
    const appointmentData = req.body; // Suponiendo que el cuerpo de la solicitud contiene los datos del turno
    const result = await createAppointmentService(appointmentData);
    res.status(201).send(result); // Enviar respuesta con código de estado 201 para la creación exitosa
  } catch (error) {
    if (error instanceof Error) {
      // Si el error es una instancia de Error, envíalo al cliente
      res.status(500).send({ message: error.message });
    } else {
      // Si el error no es una instancia de Error, envía un mensaje genérico
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