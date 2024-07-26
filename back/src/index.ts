import server from "./server";
import { PORT } from "./configs/envs";
import "reflect-metadata";
import { AppDataSource } from "./configs/data-source";

AppDataSource.initialize().then((res) => {
  console.log("Conexión a la base de datos realizada con éxito");
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
