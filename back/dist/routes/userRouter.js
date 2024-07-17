"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// GET /users = obterner todos los usuarios
// GET /users/:id = obtener un usuario por id
// POST /users/register = crear un nuevo usuario
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserController_2 = require("../controllers/UserController");
const UserController_3 = require("../controllers/UserController");
const UserController_4 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.get("/users", UserController_1.getUsers);
router.get("/users/:id", UserController_2.getUsersById);
router.post("/users/register", UserController_3.createUser);
router.post("/users/login", UserController_4.loginUser);
exports.default = router;
