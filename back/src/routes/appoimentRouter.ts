import { Router } from "express";
import {getAllAppoimentController,getAppoimentController,postAppoimentsController,cancelAppoimentController} from "../controllers/AppoimentController"

const appoimentRouter: Router = Router();

appoimentRouter.get("/",getAllAppoimentController)
appoimentRouter.get("/:id",getAppoimentController)
appoimentRouter.post("/schedule",postAppoimentsController)
appoimentRouter.put("/cancel",cancelAppoimentController)

export default appoimentRouter;