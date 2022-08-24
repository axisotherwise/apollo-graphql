import db from "../db/index.js";

import * as userQuery from "../queries/user-query.js";

const conn = await db;

const findUser = async (email) => {
  try {
    const [ user ] = await conn.query(
      userQuery.findUserQuery,
      [ email ]
    );
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const findUserDetail = async (email) => {
  try {
    const [ userDetail ] = await conn.query(
      userQuery.findUserDetailQuery,
      [ email ]
    );
    return userDetail;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUsers = async () => {
  try {
    const [ users ] = await conn.query(
      userQuery.getUsers
    );
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createUser = async (email, name, password) => {
  try {
    const [ user ] = await conn.query(
      userQuery.createUserQuery,
      [ email, name, password ]
    );
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createUserDetail = async (gender, address, userId) => {
  try {
    const [ detail ] = await conn.query(
      userQuery.createUserDetailQuery,
      [ gender, address, userId ]
    );
    return detail;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export {
  findUser,
  findUserDetail,
  getUsers,
  createUser,
  createUserDetail,
};