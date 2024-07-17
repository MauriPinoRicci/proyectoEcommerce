"use strict";
// GET /shift = obtener todos los turnos
// GET /shift/:id = obtener un turno por id
// POST /shift/schedule = crear un nuevo turno
// PUT /shift/cancel = cancelar un turno
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ShiftController_1 = require("../controllers/ShiftController");
const ShiftController_2 = require("../controllers/ShiftController");
const ShiftController_3 = require("../controllers/ShiftController");
const ShiftController_4 = require("../controllers/ShiftController");
const router = (0, express_1.Router)();
router.get("/appoiments", ShiftController_1.getAllShift);
router.get("/appoiment", ShiftController_2.getShift);
router.post("/appoiment/schedule", ShiftController_3.postShift);
router.put("/appoiment/cancel", ShiftController_4.cancelShift);
