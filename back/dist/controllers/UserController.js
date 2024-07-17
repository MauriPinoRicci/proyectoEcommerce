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
exports.deleteUser = exports.loginUser = exports.createUser = exports.getUsersById = exports.getUsers = void 0;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send("obtener todos los usuarios");
});
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send("obtener los usuarios por id");
});
exports.getUsersById = getUsersById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send("crear un nuevo usuario");
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send("usuario logueado");
});
exports.loginUser = loginUser;
const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteUser = deleteUser;
