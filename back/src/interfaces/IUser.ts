import { ICredential } from "./ICredential";

export interface IUser {
    id: number;
    username: string;
    email: string;
    birthdate: string;
    nDni: number;
    credentialsId: number;
}