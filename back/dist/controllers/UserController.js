"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const credentialsService_1 = require("../services/credentialsService");
class UserController {
    constructor() {
        // Obtener todos los usuarios
        this.getAllUsers = (req, res) => {
            const users = this.userService.getAllUsers();
            res.json(users);
        };
        // Obtener un usuario por ID
        this.getUserById = (req, res) => {
            const { id } = req.params;
            const user = this.userService.getUserById(Number(id)); // Convertir id a number
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).send("User not found");
            }
        };
        // Crear un nuevo usuario
        this.createUser = (req, res) => {
            const { username, email, birthdate, nDni, credentialsId } = req.body;
            try {
                const userId = this.userService.createUser(username, email, birthdate, nDni, credentialsId);
                res.status(201).json({ userId });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        };
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield res.send("usuario logueado");
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield res.send("usuario elimado");
        });
        const credentialService = new credentialsService_1.CredentialService(); // Crear una instancia de CredentialService
        this.userService = new userService_1.UserService(credentialService); // Pasar la instancia al constructor
    }
}
const userController = new UserController();
exports.getAllUsers = userController.getAllUsers;
exports.getUserById = userController.getUserById;
exports.createUser = userController.createUser;
exports.loginUser = userController.loginUser;
exports.deleteUser = userController.deleteUser;
