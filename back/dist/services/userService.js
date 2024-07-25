"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    // Modificar el constructor para aceptar una instancia de CredentialService
    constructor(credentialService) {
        this.users = [];
        this.credentialService = credentialService;
    }
    // Obtener todos los usuarios
    getAllUsers() {
        return this.users;
    }
    // Obtener un usuario por ID
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    // Crear un nuevo usuario
    createUser(username, email, birthdate, nDni, credentialsId) {
        const newUser = {
            id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1, // Asignar ID único
            username,
            email,
            birthdate,
            nDni,
            credentialsId
        };
        this.users.push(newUser);
        return newUser.id;
    }
}
exports.UserService = UserService;
