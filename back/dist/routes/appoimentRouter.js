"use strict";
// GET /shift = obtener todos los turnos
// GET /shift/:id = obtener un turno por id
// POST /shift/schedule = crear un nuevo turno
// PUT /shift/cancel = cancelar un turno
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppoimentController_1 = require("../controllers/AppoimentController");
const router = (0, express_1.Router)();
router.get("/", AppoimentController_1.getAllAppoiment);
router.get("/appoiment", AppoimentController_1.getAppoiment);
router.post("/schedule", AppoimentController_1.postAppoiments);
router.put("/cancel", AppoimentController_1.cancelAppoiment);
exports.default = router;
