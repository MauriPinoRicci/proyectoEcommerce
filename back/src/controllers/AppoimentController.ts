import { Request, Response } from "express";
import {
  CancelledAppointmentService,
  createAppointmentService,
  getAllAppointmentByIdService,
  getAllAppointmentsService,
} from "../services/AppointmentService";
import { IAppointmentDto } from "../dtos/appointmentDto";

export const getAppointmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllAppointmentsService();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAppointmentsByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = getAllAppointmentByIdService(Number(id));
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
    const { date, time, userId }: IAppointmentDto = req.body;
    const newUser = await createAppointmentService({
      date,
      time,
      userId,
    });
    res.status(200).send(newUser);
  } catch (error) {}
};

export const CancelledAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = CancelledAppointmentService(Number(id));

    if (await result) {
      res.status(200).send({ message: "Appointment cancelled successfully" });
    } else {
      res.status(404).send({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
