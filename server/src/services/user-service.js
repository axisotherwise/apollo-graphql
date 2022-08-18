import db from "../db/index.js";

import * as userQuery from "../queries/user-query.js";

const findUser = async (email) => {
  try {
    const [ findUser ] = await db.query(
      userQuery.findUserQuery,
      [ email ],
    );
    return findUser;
  } catch (err) {
    console.error(err);
  }
};

const createUser = async (email, name, password) => {
  try {
    const [ user ] = await db.query(
      userQuery.createUserQuery, 
      [ email, name, password ]
    );
    return user;
  } catch (err) {
    console.error(err);
  }
};

const createUserDetail = async (gender, address, userId) => {
  try {
    const [ userDetail ] = await db.query(
      userQuery.createUserDetailQuery,
      [ gender, address, userId ],
    );
    return userDetail;
  } catch (err) {
    console.error(err);
  }
};


export {
  findUser,
  createUser,
  createUserDetail,
};