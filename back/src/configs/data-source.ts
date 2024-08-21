import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import {Credential} from "../entities/Crendential"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,//5433
    username: "postgres",
    password: "v8aYEwjA87HQK6",
    database: "henrydb",
    synchronize: true, //en true crea las tablas
    logging: false,
    //dropSchema: true,
    entities: [User,Credential,Appointment],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User);
export const CrendentialModel = AppDataSource.getRepository(Credential);
export const appointmentModel = AppDataSource.getRepository(Appointment);
