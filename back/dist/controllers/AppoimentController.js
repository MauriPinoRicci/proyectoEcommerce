"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const AppointmentService_1 = require("../services/AppointmentService");
class AppointmentController {
    constructor() {
        // Obtener todos los turnos
        this.getAllAppointments = (req, res) => {
            const appointments = this.appointmentService.getAllAppointments();
            res.json(appointments);
        };
        // Obtener un turno por ID
        this.getAppointmentById = (req, res) => {
            const { id } = req.params;
            const appointment = this.appointmentService.getAppointmentById(id);
            if (appointment) {
                res.json(appointment);
            }
            else {
                res.status(404).send('Appointment not found');
            }
        };
        // Crear un nuevo turno
        this.createAppointment = (req, res) => {
            const { date, time, userId, status } = req.body;
            try {
                const appointmentId = this.appointmentService.createAppointment(date, time, userId, status);
                res.status(201).json({ appointmentId });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        };
        // Cancelar un turno por ID
        this.cancelAppointment = (req, res) => {
            const { id } = req.params;
            const result = this.appointmentService.cancelAppointment(id);
            if (result) {
                res.status(200).send('Appointment cancelled');
            }
            else {
                res.status(404).send('Appointment not found');
            }
        };
        this.appointmentService = new AppointmentService_1.AppointmentService();
    }
}
const appointmentController = new AppointmentController();
exports.getAllAppointments = appointmentController.getAllAppointments;
exports.getAppointmentById = appointmentController.getAppointmentById;
exports.createAppointment = appointmentController.createAppointment;
exports.cancelAppointment = appointmentController.cancelAppointment;
