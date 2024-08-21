import {Router} from "express";
import appoimentRouter from "./AppointmentRouter"
import userRouter from "./userRouter";

const indexRouter: Router = Router();

indexRouter.use("/users",userRouter)
indexRouter.use("/appointments",appoimentRouter)

export default indexRouter;