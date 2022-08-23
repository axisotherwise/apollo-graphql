import { gql } from "apollo-server";
import bcrypt from "bcrypt";

import * as userService from "../services/user-service.js";
import * as t from "../services/transaction-service.js";

import * as jwt from "../modules/jwt.js";

const resolverTypeDefs = gql`
  type User {
    id: ID
    email: String!
  }

  type Users {
    id: ID
    email: String!
    name: String!
    gender: String!
    address: String!
  }

  type LoginResult {
    success: Boolean!
    message: String!
    data: Data!
  }

  type Data {
    token: String!
  }

  input UserInputData {
    email: String
    name: String
    password: String
    gender: String
    address: String
  }

  input UserLoginData {
    email: String
    password: String
  }
`;

const resolver =  {
  Query: {
    getUsers: async (parent, input, context) => {

      return [
        {
          id: 1,
        },
      ];
    },
  },
  Mutation: {
    createUser: async (_, { userInput }, context) => {
      try {
        const exist = await userService.findUser(userInput.email);
        if (exist.length === 1) {
          const error = new Error("이미 가입된 회원입니다.");
          error.status = 418;
          throw error;
        }
        const hash = await bcrypt.hash(userInput.password, 12);
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
        return [
          {
            id: userId,
            email: userInput.email,
          }
        ];
      } catch (err) {
        await t.rollback();
        console.error(err);
        throw err;
      }
    },
    userLogin: async (_, { userInput }, context) => {
      console.log(`context ${context}`);
      try {
        const [ exist ] = await userService.findUser(userInput.email);
        if (exist.length <= 0) {
          const error = new Error("존재하지 않는 회원입니다.");
          error.status = 418;
          throw error;
        }
        const compare = await bcrypt.compare(userInput.password, exist.password);
        if (!compare) {
          const error = new Error("비밀번호 불일치");
          error.status = 401;
        }
        const token = await jwt.issueToken(exist);
        return {
          success: true,
          message: "로그인 성공",
          data: {
            token,
          }
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

export {
  resolverTypeDefs,
  resolver,
};