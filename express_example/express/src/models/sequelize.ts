import EnvVars from "@src/common/EnvVars";
import { Sequelize } from "sequelize";

console.log(EnvVars);
export const sequelize = new Sequelize(
  EnvVars.DbConnection.Database,
  EnvVars.DbConnection.DbUser,
  EnvVars.DbConnection.DbPassword,
  {
    host: EnvVars.DbConnection.DbHost,
    dialect: "mysql",
  },
);
