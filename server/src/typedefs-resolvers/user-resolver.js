import { gql } from "apollo-server";
import bcrypt from "bcrypt";

import * as userService from "../services/user-service.js";
import * as t from "../services/transaction-service.js";

const resolverTypeDefs = gql`
  type User {
    id: Int!
    email: String!
    address: String!
  }
  type LoginResult {
    token: String
  }
  input UserInputData {
    email: String
    name: String
    password: String
  }
  input UserLoginData {
    email: String
    password: String
  }
`;

const resolver =  {
  Query: {
    getUsers: async (parent, input, context, info) => {
      console.log(context.user);
      return [
        {
          id: 1,
        },
      ];
    },
  },
  Mutation: {
    createUser: async (parent, { userInput }, context, info) => {
      try {
        const exist = await userService.findUser(userInput.email);
        if (exist.length === 1) {
          const error = new Error("이미 가입된 회원입니다.");
          error.status = 418;
          throw error;
        }
        const hash = await bcrypt.hash(userInput.password, 12);
        // transaction
        await t.transaction();
        const user = await userService.createUser(
          userInput.email,
          userInput.name,
          hash,
        );
        const userId = user.insertId;
        const detail = await userService.createUserDetail(
          userInput.gender,
          userInput.address,
          userId,
        );
        await t.commit();
        // transaction end
        return [
          {
            userId,
          }
        ];
      } catch (err) {
        await t.rollback();
        console.log(err);
        throw err;
      }
    },
    userLogin: async(parent, { userInput }, context, info) => {
      console.log(context.token);
      try {
        const exist = await userService.findUser(userInput.email);
        if (!exist) {
          const error = new Error("존재하지 않는 회원입니다.");
          error.status = 418;
          throw error;
        }
        console.log(exist);
        const compare = await bcrypt.compare(userInput.password, exist.password);
        console.log(compare);
      } catch (err) {
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