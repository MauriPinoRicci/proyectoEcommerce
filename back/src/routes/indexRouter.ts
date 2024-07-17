import {Router} from "express";
import userRouter from "./userRouter"
import appoimentRouter from "./appoimentRouter"

const router: Router = Router();

router.use("/users",userRouter)
router.use("/appoiments",appoimentRouter)

export default router;