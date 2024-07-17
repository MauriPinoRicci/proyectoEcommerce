// GET /shift = obtener todos los turnos
// GET /shift/:id = obtener un turno por id
// POST /shift/schedule = crear un nuevo turno
// PUT /shift/cancel = cancelar un turno

import { Router } from "express";
import {getAllAppoiment,getAppoiment,postAppoiments,cancelAppoiment} from "../controllers/AppoimentController"

const router: Router = Router();

router.get("/",getAllAppoiment)
router.get("/appoiment",getAppoiment)
router.post("/schedule",postAppoiments)
router.put("/cancel",cancelAppoiment)

export default router;