"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialService = void 0;
class CredentialService {
    constructor() {
        this.credentials = [];
        this.nextId = 1;
    }
    createCredential(idC, username, password) {
        const newCredential = {
            idC: this.nextId,
            username,
            password,
        };
        this.credentials.push(newCredential);
        this.nextId++;
        return newCredential.idC;
    }
    validateCredential(username, password) {
        const credential = this.credentials.find((cred) => cred.username === username && cred.password === password);
        return credential ? credential.idC : null;
    }
}
exports.CredentialService = CredentialService;
