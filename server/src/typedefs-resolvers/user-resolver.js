import { gql } from "apollo-server";
import bcrypt from "bcrypt";

// import {
//   transaction,
//   commit,
//   rollback,
// } from "../services/transaction-service.js";

import { connect } from "../db/index.js";

import * as userService from "../services/user-service.js";

import db from "../db/index.js";

const resolverTypeDefs = gql`
  type User {
    userId: Int!
    email: String!
  }

  type UserDetail {
    userId: Int!
    email: String!
    name: String!
    gender: String!
    address: String!
  }

  input UserInputData {
    email: String!
    name: String!
    password: String!
    gender: String!
    address: String!
  }
`;

const resolver =  {
  Query: {
    
  },
  Mutation: {
    createUser: async (parent, { userInput }) => {
      try {
        const exist = await userService.findUser(userInput.email);
        if (exist.length >= 1) {
          const error = new Error("이미 가입된 회원입니다.");
          error.status = 418;
          throw error;
        }
        const hash = await bcrypt.hash(userInput.password, 12);
        await db.query("START TRANSACTION");
        const [ user ] = await db.query(`
          INSERT INTO user (email, name, password) VALUES (?, ?, ?)
        `, [ userInput.email, userInput.name, hash ]);
        const userId = user.insertId;
        const [ detail ] = await db.query(`
          INSERT INTO detail (gender, address, fk_user_id) VALUES (?, ?, ?)
        `, [ userInput.gender, userInput.address, userId ]);
        // const user = await userService.createUser(
        //   userInput.email,
        //   userInput.name,
        //   hash,
        // );
        // const userId = null;
        // const userDetail = await userService.createUserDetail(
        //   userInput.gender,
        //   userInput.address,
        //   userId,
        // );
        await db.query("COMMIT");
        console.log("COMMIT 실행됩니다.");
      } catch (err) {
        await db.query("ROLLBACK");
        console.log("rollback 실행됩니다.");
        console.error(err);
        throw err;
      }
    }
  },
};

export {
  resolverTypeDefs,
  resolver,
};