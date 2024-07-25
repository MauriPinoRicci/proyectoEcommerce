import {Router} from "express";
import userRouter from "./userRouter"
import appoimentRouter from "./AppointmentRouter"

const indexRouter: Router = Router();

indexRouter.use("/users",userRouter)
indexRouter.use("/appoiments",appoimentRouter)

export default indexRouter;