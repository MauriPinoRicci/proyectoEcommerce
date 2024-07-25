import { Request, Response } from 'express';
import { AppointmentService } from '../services/AppointmentService';

class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  // Obtener todos los turnos
  getAllAppointments = (req: Request, res: Response): void => {
    const appointments = this.appointmentService.getAllAppointments();
    res.json(appointments);
  }

  // Obtener un turno por ID
  getAppointmentById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const appointment = this.appointmentService.getAppointmentById(id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).send('Appointment not found');
    }
  }

  // Crear un nuevo turno
  createAppointment = (req: Request, res: Response): void => {
    const { date, time, userId, status } = req.body;
    try {
      const appointmentId = this.appointmentService.createAppointment(date, time, userId, status);
      res.status(201).json({ appointmentId });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  // Cancelar un turno por ID
  cancelAppointment = (req: Request, res: Response): void => {
    const { id } = req.params;
    const result = this.appointmentService.cancelAppointment(id);
    if (result) {
      res.status(200).send('Appointment cancelled');
    } else {
      res.status(404).send('Appointment not found');
    }
  }
}

const appointmentController = new AppointmentController();
export const getAllAppointments = appointmentController.getAllAppointments;
export const getAppointmentById = appointmentController.getAppointmentById;
export const createAppointment = appointmentController.createAppointment;
export const cancelAppointment = appointmentController.cancelAppointment;
