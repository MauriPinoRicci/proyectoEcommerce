import { Router } from "express";
import { CancelledAppointmentController, createAppointmentController, getAllAppointmentsController, getAppointmentsByIdController } from "../controllers/AppoimentController";

const appoimentRouter: Router = Router();

appoimentRouter.get("/", getAllAppointmentsController,)
appoimentRouter.get("/:id",getAppointmentsByIdController)
appoimentRouter.post("/schedule",createAppointmentController)
appoimentRouter.delete("/:id/cancel",CancelledAppointmentController)

export default appoimentRouter;