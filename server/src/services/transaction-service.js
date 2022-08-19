import db from "../db/index.js";

const conn = await db;

const transaction = async () => await conn.beginTransaction();
const commit = async () => await conn.commit();
const rollback = async () => await conn.rollback();

export {
  transaction,
  commit,
  rollback,
};