import { Router } from "express";
import { 
  CancelledAppointmentController, 
  createAppointmentController, 
  getAllAppointmentsController, 
  getAppointmentsByUserIdController 
} from "../controllers/AppoimentController";

const appoimentRouter: Router = Router();

appoimentRouter.get("/", getAllAppointmentsController);

appoimentRouter.get("/user/:userId", getAppointmentsByUserIdController);

appoimentRouter.post("/schedule", createAppointmentController);

appoimentRouter.delete("/:id/cancel", CancelledAppointmentController);

export default appoimentRouter;
