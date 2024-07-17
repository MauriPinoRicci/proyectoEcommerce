// GET /shift = obtener todos los turnos
// GET /shift/:id = obtener un turno por id
// POST /shift/schedule = crear un nuevo turno
// PUT /shift/cancel = cancelar un turno

import { Router } from "express";
import {getAllShift} from "../controllers/AppoimentController"
import {getShift} from "../controllers/AppoimentController"
import {postShift} from "../controllers/AppoimentController"
import {cancelShift} from "../controllers/AppoimentController"

const router: Router = Router();

router.get("/",getAllShift)
router.get("/appoiment",getShift)
router.post("/schedule",postShift)
router.put("/cancel",cancelShift)

export default router;