import Sequelize from "sequelize";
import config from "../config/config.js";

import User from "./user.js";

const configEnv = config.development;

const db = {};
const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  configEnv
)

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

export {
  sequelize,
  db,
}