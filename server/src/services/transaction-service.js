import db from "../db/index.js";

import { connect } from "../db/index.js";

const transaction = async () => connect.beginTransaction();
const commit = async () => connect.commit();
const rollback = async () => connect.rollback();

export {
  transaction,
  commit,
  rollback,
};