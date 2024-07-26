import { Router } from "express";
import { CancelledAppointmentController, createAppointmentController, getAppointmentsByIdController, getAppointmentsController } from "../controllers/AppoimentController";

const appoimentRouter: Router = Router();

appoimentRouter.get("/", getAppointmentsController,)
appoimentRouter.get("/:id",getAppointmentsByIdController)
appoimentRouter.post("/schedule",createAppointmentController)
appoimentRouter.delete("/:id/cancel",CancelledAppointmentController)

export default appoimentRouter;