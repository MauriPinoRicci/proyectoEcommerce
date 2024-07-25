"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
class AppointmentService {
    constructor() {
        this.appointments = [];
        this.nextId = 1;
    }
    // Función para retornar el arreglo completo de turnos
    getAllAppointments() {
        return this.appointments;
    }
    getAppointmentById(id) {
        const appointment = this.appointments.find(app => app.id === id);
        return appointment || null;
    }
    createAppointment(date, time, userId, status) {
        if (!userId) {
            throw new Error('User ID is required to create an appointment.');
        }
        const newAppointment = {
            id: this.nextId.toString(),
            date,
            time,
            userId,
            status
        };
        this.appointments.push(newAppointment);
        this.nextId++;
        return newAppointment.id;
    }
    cancelAppointment(id) {
        const appointment = this.appointments.find(app => app.id === id);
        if (appointment) {
            appointment.status = 'cancelled';
            return true;
        }
        return false;
    }
}
exports.AppointmentService = AppointmentService;
