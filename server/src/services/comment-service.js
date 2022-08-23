import db from "../db/index.js";

import * as commentQuery from "../queries/comment-query.js";

const conn = await db;

const createComment = async (...result) => {
  try { 
    const [ comment ] = await conn.query(
      commentQuery.createComment,
      result
    );
    return comment;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export {
  createComment,
};