import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool(
  {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
);

const db = connection.getConnection();

export default db;
