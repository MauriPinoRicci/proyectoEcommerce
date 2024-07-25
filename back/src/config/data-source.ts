import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "v8aYEwjA87HQK6",
    database: "henrydb",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})