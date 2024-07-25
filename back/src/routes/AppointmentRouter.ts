import { Router } from "express";
import { CancelledAppointmentService, createAppointmentService, getAllAppointmentByIdService, getAllAppointmentsService } from "../services/AppointmentService";

const appoimentRouter: Router = Router();

appoimentRouter.get("/",getAllAppointmentsService)
appoimentRouter.get("/:id",getAllAppointmentByIdService)
appoimentRouter.post("/schedule",createAppointmentService)
appoimentRouter.put("/cancel",CancelledAppointmentService)

export default appoimentRouter;