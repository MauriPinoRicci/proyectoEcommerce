import { DataSource } from "typeorm";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Crendential";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,//5433
    username: "postgres",
    password: "admin",
    database: "postgresdb",
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
