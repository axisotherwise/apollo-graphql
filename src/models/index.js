import Sequelize from "sequelize";
import config from "../config/config.js";

const configEnv = config.development;

const db = {};
const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  configEnv
)

db.sequelize = sequelize;

export {
  sequelize,
  db,
}